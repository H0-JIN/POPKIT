export type SheetRow = Record<string, string>;

const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID ?? "10xqsKKL21u0WkFRqjUBjW2Gw_Tk24owzNTEZsFQnJTI";
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

function parseCsv(text: string): SheetRow[] {
  const rows: string[][] = [];
  let field = "";
  let row: string[] = [];
  let quoted = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"' && quoted && next === '"') {
      field += '"';
      i += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows.shift()?.map((h) => h.trim()) ?? [];
  return rows.filter((r) => r.some(Boolean)).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

async function fetchWithTimeout(url: string, init?: RequestInit) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function base64Url(input: string | Buffer) {
  return Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getServiceAccountAccessToken() {
  if (!SERVICE_ACCOUNT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Google Sheets 쓰기 권한에 필요한 GOOGLE_SERVICE_ACCOUNT_EMAIL 또는 GOOGLE_PRIVATE_KEY가 없습니다.");
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64Url(JSON.stringify({
    iss: SERVICE_ACCOUNT_EMAIL,
    scope: SHEETS_SCOPE,
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  }));
  const unsignedJwt = `${header}.${claim}`;
  const { createSign } = await import("crypto");
  const signature = createSign("RSA-SHA256").update(unsignedJwt).sign(PRIVATE_KEY);
  const jwt = `${unsignedJwt}.${base64Url(signature)}`;

  const res = await fetchWithTimeout("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt })
  });
  if (!res.ok) throw new Error("Google 서비스 계정 인증에 실패했습니다.");
  const data = (await res.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google 서비스 계정 access token을 받지 못했습니다.");
  return data.access_token;
}

async function fetchSheetsApi(path: string, init?: RequestInit) {
  const token = await getServiceAccountAccessToken();
  const res = await fetchWithTimeout(`https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${path}`, {
    ...init,
    headers: { "content-type": "application/json", authorization: `Bearer ${token}`, ...(init?.headers ?? {}) }
  });
  if (!res.ok) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "Google Sheets API 요청에 실패했습니다.");
  }
  return res;
}

export async function fetchSheetRows(sheetName: string, options: { cache?: RequestCache; revalidate?: number | false } = {}): Promise<SheetRow[]> {
  const cache = options.cache ?? (sheetName === "Reviews" ? "no-store" : undefined);
  const next = options.revalidate === false ? undefined : { revalidate: options.revalidate ?? 300 };

  if (API_KEY) {
    try {
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
      const res = await fetchWithTimeout(apiUrl, { cache, next });
      if (res.ok) {
        const data = (await res.json()) as { values?: string[][] };
        const [headers = [], ...rows] = data.values ?? [];
        return rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
      }
    } catch {
      // Public CSV and seed data are the intended fallbacks for MVP availability.
    }
  }

  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEETS_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    const res = await fetchWithTimeout(csvUrl, { cache, next });
    if (res.ok) return parseCsv(await res.text());
  } catch {
    // Seed data is used by data adapters when CSV access is unavailable.
  }

  return [];
}

export async function appendSheetRow(sheetName: string, values: Array<string | number | boolean>) {
  const res = await fetchSheetsApi(`${encodeURIComponent(`${sheetName}!A:Z`)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`, {
    method: "POST",
    body: JSON.stringify({ values: [values] })
  });
  return res.json() as Promise<{ updates?: { updatedRange?: string } }>;
}

export async function updateSheetCell(range: string, value: string | number | boolean) {
  const res = await fetchSheetsApi(`${encodeURIComponent(range)}?valueInputOption=USER_ENTERED`, {
    method: "PUT",
    body: JSON.stringify({ values: [[value]] })
  });
  return res.json() as Promise<{ updatedRange?: string }>;
}
