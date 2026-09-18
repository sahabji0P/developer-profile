"use client";

import {
  useDesignVariant,
  type DesignVariant,
} from "@/components/design-variant-provider";

const OPTIONS: { value: DesignVariant; label: string }[] = [
  { value: "studio", label: "Studio" },
  { value: "essay", label: "Essay" },
];

export function DesignVariantToggle() {
  const { variant, setVariant } = useDesignVariant();

  return (
    <div className="variant-toggle" role="group" aria-label="Design variant">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          className="variant-toggle-option"
          aria-pressed={variant === option.value}
          onClick={() => setVariant(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
