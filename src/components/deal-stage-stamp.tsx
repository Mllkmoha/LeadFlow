"use client";

import { cn } from "@/lib/utils";

interface DealStageStampProps {
  stage: "NEW" | "CONTACTED" | "INTERESTED" | "CONVERTED";
  contactId?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const stageConfig = {
  NEW: { text: "New", color: "var(--stage-new)", tint: "var(--stage-new-tint)" },
  CONTACTED: { text: "Contacted", color: "var(--stage-contacted)", tint: "var(--stage-contacted-tint)" },
  INTERESTED: { text: "Interested", color: "var(--stage-interested)", tint: "var(--stage-interested-tint)" },
  CONVERTED: { text: "Converted", color: "var(--stage-converted)", tint: "var(--stage-converted-tint)" },
} as const;

const sizeStyles = {
  sm: "text-[10px] px-[7px] py-[3px]",
  md: "text-[11px] px-[8px] py-[4px]",
  lg: "text-[12px] px-[12px] py-[6px]",
} as const;

function getRotation(contactId: string): number {
  let hash = 0;
  for (let i = 0; i < contactId.length; i++) {
    hash = ((hash << 5) - hash) + contactId.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 3001) / 1000 - 1.5; // -1.5 to +1.5
}

export function DealStageStamp({ stage, contactId, size = "md", className }: DealStageStampProps) {
  const { text, color, tint } = stageConfig[stage];

  const rotation = contactId ? getRotation(contactId) : 0.5;

  const containerStyle: React.CSSProperties = {
    transform: `rotate(${rotation}deg)`,
  };

  const outerFrameStyle: React.CSSProperties = {
    borderColor: color,
    opacity: 0.55,
  };

  const innerFrameStyle: React.CSSProperties = {
    borderColor: color,
    opacity: 0.35,
  };

  const fillStyle: React.CSSProperties = {
    backgroundColor: tint,
    opacity: 0.94,
  };

  const textStyle: React.CSSProperties = {
    color,
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-mono font-semibold uppercase tracking-[0.08em]",
        "rounded-[2px]",
        "relative isolate",
        sizeStyles[size],
        className
      )}
      style={containerStyle}
      aria-label={`Stage: ${text}`}
    >
      {/* Outer frame - 1px at 55% opacity */}
      <span
        className="absolute inset-0 border rounded-[2px] pointer-events-none"
        style={outerFrameStyle}
        aria-hidden="true"
      />
      {/* Inner frame - 1px at 35% opacity */}
      <span
        className="absolute inset-px border rounded-[2px] pointer-events-none"
        style={innerFrameStyle}
        aria-hidden="true"
      />
      {/* Fill with tint at 0.94 opacity */}
      <span
        className="absolute inset-0 rounded-[2px] pointer-events-none"
        style={fillStyle}
        aria-hidden="true"
      />
      {/* Text content on top */}
      <span className="relative z-10" style={textStyle}>
        {text}
      </span>
    </span>
  );
}