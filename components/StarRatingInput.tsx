"use client";

import { KeyboardEvent, useState } from "react";

type StarRatingInputProps = {
  label: string;
  name: string;
  value: number | null;
  onChange: (value: number | null) => void;
  required?: boolean;
};

const ratingValues = Array.from({ length: 10 }, (_, index) => (index + 1) / 2);
const stars = Array.from({ length: 5 }, (_, index) => index + 1);

function clampRating(value: number) {
  return Math.min(5, Math.max(0.5, Math.round(value * 2) / 2));
}

function getStarFill(star: number, value: number) {
  return Math.min(1, Math.max(0, value - (star - 1))) * 100;
}

export function StarRatingInput({ label, name, value, onChange, required = false }: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const displayValue = hoverValue ?? value ?? 0;
  const selectedLabel = value ? `${value.toFixed(1)} / 5` : required ? "필수" : "선택 안 함";

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowDown", "ArrowRight", "ArrowUp", "Home", "End", "Backspace", "Delete"].includes(event.key)) return;
    event.preventDefault();

    if (event.key === "Backspace" || event.key === "Delete") {
      if (!required) onChange(null);
      return;
    }

    if (event.key === "Home") {
      onChange(0.5);
      return;
    }

    if (event.key === "End") {
      onChange(5);
      return;
    }

    const direction = event.key === "ArrowRight" || event.key === "ArrowUp" ? 0.5 : -0.5;
    onChange(clampRating((value ?? 0) + direction));
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
      <div className="mb-3 flex items-center justify-between gap-3">
        <span>{label}</span>
        <span className={value ? "font-bold text-amber-200" : "text-zinc-600"}>{selectedLabel}</span>
      </div>
      <div className="flex items-center gap-3">
        <div
          role="radiogroup"
          aria-label={`${label} 별점`}
          aria-required={required}
          className="relative inline-flex rounded-xl focus-within:outline focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-cyan-300"
          onMouseLeave={() => setHoverValue(null)}
          onKeyDown={handleKeyDown}
        >
          <div className="flex gap-1 text-3xl leading-none text-zinc-700" aria-hidden="true">
            {stars.map((star) => (
              <span key={star} className="relative inline-block">
                <span>★</span>
                <span className="absolute inset-0 overflow-hidden text-amber-300" style={{ width: `${getStarFill(star, displayValue)}%` }}>★</span>
              </span>
            ))}
          </div>
          <div className="absolute inset-0 grid grid-cols-10">
            {ratingValues.map((rating) => (
              <button
                key={rating}
                type="button"
                role="radio"
                aria-checked={value === rating}
                aria-label={`${label} ${rating.toFixed(1)}점 선택`}
                name={name}
                className="h-full min-h-8 cursor-pointer rounded-sm bg-transparent outline-none"
                onMouseEnter={() => setHoverValue(rating)}
                onFocus={() => setHoverValue(rating)}
                onBlur={() => setHoverValue(null)}
                onClick={() => onChange(rating)}
              />
            ))}
          </div>
        </div>
        {!required && value !== null && (
          <button type="button" onClick={() => onChange(null)} className="rounded-full border border-white/10 px-3 py-1 text-xs font-semibold text-zinc-400 hover:bg-white/5 hover:text-white">
            지우기
          </button>
        )}
      </div>
    </div>
  );
}
