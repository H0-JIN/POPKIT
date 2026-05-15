"use client";

import { FormEvent, useMemo, useState } from "react";
import { getReviewRoleLabel, REVIEW_ROLE_OPTIONS, type ReviewRole } from "@/lib/reviewRoles";
import { useLanguage } from "@/lib/i18n";

type FormState = {
  tool_name: string;
  official_url: string;
  suggested_use: string;
  reason: string;
  user_role: "" | ReviewRole;
  email: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  tool_name: "",
  official_url: "",
  suggested_use: "",
  reason: "",
  user_role: "",
  email: ""
};

function isValidUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function ToolSubmissionForm() {
  const { t, locale } = useLanguage();
  const copy = t.submitTool;
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const roleOptions = useMemo(
    () => REVIEW_ROLE_OPTIONS.map((role) => ({ value: role, label: getReviewRoleLabel(role, locale) })),
    [locale]
  );

  const validate = (nextForm: FormState) => {
    const nextErrors: FormErrors = {};
    if (!nextForm.tool_name.trim()) nextErrors.tool_name = copy.validation.toolNameRequired;
    if (!nextForm.official_url.trim() || !isValidUrl(nextForm.official_url.trim())) nextErrors.official_url = copy.validation.urlInvalid;
    if (!nextForm.suggested_use.trim()) nextErrors.suggested_use = copy.validation.suggestedUseRequired;
    if (!nextForm.reason.trim()) nextErrors.reason = copy.validation.reasonRequired;
    if (!nextForm.user_role) nextErrors.user_role = copy.validation.roleRequired;
    if (nextForm.email.trim() && !isValidEmail(nextForm.email.trim())) nextErrors.email = copy.validation.emailInvalid;
    return nextErrors;
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "submitting") setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const response = await fetch("/api/tool-submissions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          tool_name: form.tool_name.trim(),
          official_url: form.official_url.trim(),
          suggested_use: form.suggested_use.trim(),
          reason: form.reason.trim(),
          user_role: form.user_role,
          email: form.email.trim()
        })
      });

      if (!response.ok) throw new Error("Failed to submit tool");
      setForm(initialFormState);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-5 shadow-2xl shadow-black/20 sm:p-7">
      <div className="grid gap-5">
        <label className="block">
          <span className="text-sm font-bold text-zinc-100">{copy.fields.toolName.label}</span>
          <input
            value={form.tool_name}
            onChange={(event) => updateField("tool_name", event.target.value)}
            placeholder={copy.fields.toolName.placeholder}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
          />
          {errors.tool_name ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.tool_name}</p> : null}
        </label>

        <label className="block">
          <span className="text-sm font-bold text-zinc-100">{copy.fields.officialUrl.label}</span>
          <input
            value={form.official_url}
            onChange={(event) => updateField("official_url", event.target.value)}
            placeholder={copy.fields.officialUrl.placeholder}
            inputMode="url"
            className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
          />
          {errors.official_url ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.official_url}</p> : null}
        </label>

        <label className="block">
          <span className="text-sm font-bold text-zinc-100">{copy.fields.suggestedUse.label}</span>
          <textarea
            value={form.suggested_use}
            onChange={(event) => updateField("suggested_use", event.target.value)}
            placeholder={copy.fields.suggestedUse.placeholder}
            rows={3}
            className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
          />
          {errors.suggested_use ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.suggested_use}</p> : null}
        </label>

        <label className="block">
          <span className="text-sm font-bold text-zinc-100">{copy.fields.reason.label}</span>
          <textarea
            value={form.reason}
            onChange={(event) => updateField("reason", event.target.value)}
            placeholder={copy.fields.reason.placeholder}
            rows={4}
            className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
          />
          {errors.reason ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.reason}</p> : null}
        </label>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-sm font-bold text-zinc-100">{copy.fields.role.label}</span>
            <select
              value={form.user_role}
              onChange={(event) => updateField("user_role", event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
            >
              <option value="">{copy.fields.role.placeholder}</option>
              {roleOptions.map((role) => <option key={role.value} value={role.value}>{role.label}</option>)}
            </select>
            {errors.user_role ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.user_role}</p> : null}
          </label>

          <label className="block">
            <span className="text-sm font-bold text-zinc-100">{copy.fields.email.label}</span>
            <input
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              placeholder={copy.fields.email.placeholder}
              inputMode="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-zinc-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-200/60 focus:ring-2 focus:ring-cyan-200/10"
            />
            {errors.email ? <p className="mt-2 text-xs font-semibold text-rose-300">{errors.email}</p> : null}
          </label>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-zinc-500">{copy.emailHint}</p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex justify-center rounded-2xl bg-cyan-300 px-5 py-3 text-sm font-black text-zinc-950 transition hover:bg-cyan-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? copy.saving : copy.submit}
        </button>
      </div>

      {status === "success" ? <p className="mt-5 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm font-semibold text-emerald-100">{copy.success}</p> : null}
      {status === "error" ? <p className="mt-5 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-100">{copy.failed}</p> : null}
    </form>
  );
}
