export type SheetRow = Record<string, string>;

const GOOGLE_SHEETS_ID = process.env.GOOGLE_SHEETS_ID ?? "10xqsKKL21u0WkFRqjUBjW2Gw_Tk24owzNTEZsFQnJTI";
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;

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

async function fetchWithTimeout(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  try {
    return await fetch(url, { signal: controller.signal, next: { revalidate: 300 } });
  } finally {
    clearTimeout(timeout);
  }
}

export async function fetchSheetRows(sheetName: string): Promise<SheetRow[]> {
  if (API_KEY) {
    try {
      const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${encodeURIComponent(sheetName)}?key=${API_KEY}`;
      const res = await fetchWithTimeout(apiUrl);
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
    const res = await fetchWithTimeout(csvUrl);
    if (res.ok) return parseCsv(await res.text());
  } catch {
    // Seed data is used by data adapters when CSV access is unavailable.
  }

  return [];
}
