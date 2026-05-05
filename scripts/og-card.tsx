// og-card.tsx — Satori-safe TerminalCard tailored to koenvdborght.nl.
// Returns a React tree with only Satori-supported CSS:
// - no box-shadow
// - no textWrap balance
// - dot grid via background-image radial-gradient (Satori supports this)
// - explicit display: flex on every multi-child container

import React from "react";

export const SITE_FONT =
  "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace";

export type SeriesKey =
  | "engineering"
  | "notes"
  | "essays"
  | "dispatches"
  | "field";

export const SITE_SERIES: Record<
  SeriesKey,
  { label: string; accent: string }
> = {
  engineering: { label: "engineering", accent: "#2D6CDF" }, // --accent
  notes:       { label: "notes",       accent: "#1EAF12" }, // --pulse
  essays:      { label: "essays",      accent: "#E5484D" }, // --error
  dispatches:  { label: "dispatches",  accent: "#E58912" }, // --warn
  field:       { label: "field guides",accent: "#7C3AED" },
};

function siteFitTitle(title: string, base = 64, floor = 40) {
  const len = title.length;
  if (len <= 32) return base;
  if (len >= 96) return floor;
  const t = (len - 32) / (96 - 32);
  return Math.round(base - (base - floor) * t);
}

function tagBgFromAccent(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export interface OGCardProps {
  title: string;
  series?: SeriesKey;
  date?: string;
  tags?: string[];
  dark?: boolean;
  /** Path widget shown top-right of the title bar, e.g. "~/blog" or "~/series/borgdock". */
  path?: string;
}

export function SiteTerminalCard({
  title,
  series = "engineering",
  date,
  tags = [],
  dark = false,
  path,
}: OGCardProps): React.ReactElement {
  const pathLabel = path ?? "~/blog";
  const s = SITE_SERIES[series] || SITE_SERIES.engineering;

  const P = dark
    ? {
        bg: "#0A0E1A",
        bgElev: "#11172A",
        ink: "#E6EAF2",
        inkSoft: "#9AA5B8",
        inkMute: "#5C6680",
        rule: "rgba(230, 234, 242, 0.08)",
        ruleHard: "rgba(230, 234, 242, 0.16)",
        accent: "#5B8DEF",
        pulse: "#1EAF12",
      }
    : {
        bg: "#FAFBFC",
        bgElev: "#F2F4F7",
        ink: "#0D1117",
        inkSoft: "#4B5563",
        inkMute: "#8B95A1",
        rule: "rgba(13, 17, 23, 0.08)",
        ruleHard: "rgba(13, 17, 23, 0.16)",
        accent: "#2D6CDF",
        pulse: "#1EAF12",
      };

  const seriesAccent =
    dark && series === "engineering" ? "#5B8DEF" : s.accent;

  const tagBg = tagBgFromAccent(seriesAccent, dark ? 0.16 : 0.08);
  const titleSize = siteFitTitle(title);

  // Outer card: dot-grid bg.
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: P.bg,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${P.rule} 1px, transparent 0)`,
        backgroundSize: "24px 24px",
        color: P.ink,
        fontFamily: SITE_FONT,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Inner terminal window */}
      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          top: 56,
          bottom: 56,
          background: P.bg,
          border: `1px solid ${P.ruleHard}`,
          borderRadius: 12,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Title bar */}
        <div
          style={{
            height: 44,
            paddingLeft: 18,
            paddingRight: 18,
            display: "flex",
            alignItems: "center",
            background: P.bgElev,
            borderBottom: `1px solid ${P.rule}`,
          }}
        >
          {/* pulse-dot with outer ring */}
          <div
            style={{
              position: "relative",
              display: "flex",
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 20,
                height: 20,
                borderRadius: 10,
                border: `1px solid ${P.pulse}`,
                opacity: 0.35,
              }}
            />
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                background: P.pulse,
              }}
            />
          </div>

          {/* prompt: koen@vanderborght:~$ */}
          <div
            style={{
              fontSize: 14,
              display: "flex",
              alignItems: "baseline",
              color: P.ink,
            }}
          >
            <span style={{ fontWeight: 500 }}>koen</span>
            <span style={{ color: P.inkMute }}>@</span>
            <span style={{ fontWeight: 500 }}>vanderborght</span>
            <span style={{ color: P.inkMute }}>:~$</span>
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* path widget */}
          <div
            style={{
              fontSize: 13,
              color: P.inkMute,
              marginRight: 12,
            }}
          >
            {pathLabel}
          </div>

          {date ? (
            <div
              style={{
                fontSize: 12,
                color: P.inkMute,
                paddingLeft: 8,
                paddingRight: 8,
                paddingTop: 2,
                paddingBottom: 2,
                border: `1px solid ${P.rule}`,
                borderRadius: 4,
                display: "flex",
                alignItems: "center",
              }}
            >
              {date}
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            padding: 44,
            paddingTop: 32,
            paddingBottom: 32,
          }}
        >
          {/* Section prompt */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              fontSize: 18,
              marginBottom: 22,
            }}
          >
            <span
              style={{ color: P.pulse, fontWeight: 700, fontSize: 20, marginRight: 12 }}
            >
              $
            </span>
            <span style={{ color: P.inkSoft, marginRight: 10 }}>cat</span>
            <span
              style={{
                color: seriesAccent,
                fontWeight: 600,
                marginRight: 10,
              }}
            >
              --{s.label.replace(" ", "_")}
            </span>
            <span style={{ color: P.inkMute, marginRight: 10 }}>|</span>
            <span style={{ color: P.inkSoft }}>head -1</span>
          </div>

          {/* Big title */}
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.06,
              fontWeight: 700,
              letterSpacing: "-0.035em",
              color: P.ink,
              display: "flex",
            }}
          >
            {title}
          </div>

          <div style={{ flexGrow: 1 }} />

          {/* Tag line */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 14,
              marginTop: 22,
            }}
          >
            <span style={{ color: P.inkMute, marginRight: 10 }}># tags:</span>
            {tags.map((t, i) => (
              <span
                key={i}
                style={{
                  color: seriesAccent,
                  background: tagBg,
                  paddingLeft: 10,
                  paddingRight: 10,
                  paddingTop: 4,
                  paddingBottom: 4,
                  borderRadius: 6,
                  fontWeight: 500,
                  marginRight: 8,
                }}
              >
                {t}
              </span>
            ))}
            <div style={{ flexGrow: 1 }} />
            <div
              style={{
                width: 10,
                height: 18,
                background: seriesAccent,
              }}
            />
          </div>
        </div>

        {/* Footer band */}
        <div
          style={{
            height: 48,
            paddingLeft: 18,
            paddingRight: 18,
            display: "flex",
            alignItems: "center",
            background: P.bgElev,
            borderTop: `1px solid ${P.rule}`,
            fontSize: 13,
            color: P.inkSoft,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              background: P.pulse,
              marginRight: 10,
            }}
          />
          <span style={{ color: P.ink, fontWeight: 600, marginRight: 10 }}>
            Koen van der Borght
          </span>
          <span style={{ color: P.inkMute, marginRight: 10 }}>·</span>
          <span style={{ color: P.inkMute }}>senior dev &amp; tech lead</span>

          <div style={{ flexGrow: 1 }} />

          <span
            style={{
              color: P.ink,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            koenvdborght.nl
          </span>
        </div>
      </div>
    </div>
  );
}
