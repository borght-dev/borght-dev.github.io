// og-cards-site.jsx — TerminalCard tailored to koenvdborght.nl's terminal-dev theme.
// Single variant. 1200×630. Same prop API as og-cards.jsx for drop-in compatibility.
//
// Site palette source: themes/terminal-dev/assets/sass/main.scss

const SITE_FONT = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// Five accent slots, mapped from the site's CSS variables.
// All hues are native to the site (no warm purples, etc.).
const SITE_SERIES = {
  engineering: { label: 'engineering',         accent: '#2D6CDF', glyph: '$' }, // --accent
  notes:       { label: 'notes',               accent: '#1EAF12', glyph: '∴' }, // --pulse
  essays:      { label: 'essays',              accent: '#E5484D', glyph: '¶' }, // --error
  dispatches:  { label: 'dispatches',          accent: '#E58912', glyph: '↗' }, // --warn
  field:       { label: 'field guides',        accent: '#7C3AED', glyph: '◇' }, // tasteful indigo
};

// Auto-fit (matches the design's curve, slightly larger floor for crispness on Linkedin shrink).
function siteFitTitle(title, base = 64, floor = 40) {
  const len = (title || '').length;
  if (len <= 32) return base;
  if (len >= 96) return floor;
  const t = (len - 32) / (96 - 32);
  return Math.round(base - (base - floor) * t);
}

function SiteTerminalCard({ title, series = 'engineering', date, tags = [], dark = false }) {
  const s = SITE_SERIES[series] || SITE_SERIES.engineering;

  // Site palette — light + dark mode, lifted directly from main.scss.
  const P = dark ? {
    bg:        '#0A0E1A',  // --bg
    bgElev:    '#11172A',  // --bg-elev
    bgDeep:    '#161D33',  // --bg-deep
    ink:       '#E6EAF2',  // --ink
    inkSoft:   '#9AA5B8',  // --ink-soft
    inkMute:   '#5C6680',  // --ink-mute
    rule:      'rgba(230, 234, 242, 0.08)',  // --rule
    ruleHard:  'rgba(230, 234, 242, 0.16)',  // --rule-hard
    accent:    '#5B8DEF',  // --accent (dark)
    pulse:     '#1EAF12',  // --pulse
  } : {
    bg:        '#FAFBFC',
    bgElev:    '#F2F4F7',
    bgDeep:    '#ECEFF3',
    ink:       '#0D1117',
    inkSoft:   '#4B5563',
    inkMute:   '#8B95A1',
    rule:      'rgba(13, 17, 23, 0.08)',
    ruleHard:  'rgba(13, 17, 23, 0.16)',
    accent:    '#2D6CDF',
    pulse:     '#1EAF12',
  };

  // Series accent tweaks for dark mode (lighten so it pops against #0A0E1A).
  const seriesAccent = dark
    ? (series === 'engineering' ? '#5B8DEF' : s.accent)
    : s.accent;

  // Tag chip background — site's --accent-soft idiom.
  const accentSoftBg = (hex, alpha) => {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  };
  const tagBg = accentSoftBg(seriesAccent, dark ? 0.16 : 0.08);

  const titleSize = siteFitTitle(title);

  // 24px radial dot grid — site's exact background pattern.
  const dotGrid = {
    backgroundImage: `radial-gradient(circle at 1px 1px, ${P.rule} 1px, transparent 0)`,
    backgroundSize: '24px 24px',
  };

  return (
    <div style={{
      width: 1200, height: 630, background: P.bg, color: P.ink,
      fontFamily: SITE_FONT, position: 'relative', overflow: 'hidden',
      ...dotGrid,
    }}>
      {/* Inner terminal window — lifted off the dot-grid bg with a 1px rule. */}
      <div style={{
        position: 'absolute', left: 56, right: 56, top: 56, bottom: 56,
        background: P.bg, border: `1px solid ${P.ruleHard}`,
        borderRadius: 12,
        boxShadow: dark
          ? '0 16px 40px rgba(0,0,0,0.4)'
          : '0 16px 40px rgba(13,17,23,0.06)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
      }}>
        {/* Title bar — mirrors the site's topbar prompt. */}
        <div style={{
          height: 44, padding: '0 18px',
          display: 'flex', alignItems: 'center', gap: 12,
          background: P.bgElev,
          borderBottom: `1px solid ${P.rule}`,
        }}>
          {/* pulse-dot (the site's signature live-status mark, with its outer ring) */}
          <span style={{ position: 'relative', display: 'inline-block', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute', left: -6, top: -6, width: 20, height: 20,
              borderRadius: '50%', border: `1px solid ${P.pulse}`, opacity: 0.35,
            }} />
            <span style={{
              position: 'absolute', left: 0, top: 0, width: 8, height: 8,
              borderRadius: '50%', background: P.pulse,
            }} />
          </span>

          {/* the site's exact prompt: koen@vanderborght:~$ */}
          <span style={{ fontSize: 14, color: P.ink, letterSpacing: '0.01em' }}>
            <span style={{ color: P.ink, fontWeight: 500 }}>koen</span>
            <span style={{ color: P.inkMute }}>@</span>
            <span style={{ color: P.ink, fontWeight: 500 }}>vanderborght</span>
            <span style={{ color: P.inkMute }}>:~$</span>
          </span>

          <span style={{ flex: 1 }} />

          {/* path widget on the right, like nav `~/blog` */}
          <span style={{ fontSize: 13, color: P.inkMute }}>
            ~/{series === 'engineering' ? 'blog' : `series/${series}`}
          </span>

          {date && (
            <span style={{
              fontSize: 12, color: P.inkMute, fontVariantNumeric: 'tabular-nums',
              padding: '2px 8px', border: `1px solid ${P.rule}`, borderRadius: 4,
            }}>
              {date}
            </span>
          )}
        </div>

        {/* Body */}
        <div style={{
          flex: 1, padding: '32px 44px',
          display: 'flex', flexDirection: 'column', gap: 22,
        }}>
          {/* Section prompt — `$ post.read()` styled like the site's section-title with `$` */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, fontSize: 18 }}>
            <span style={{ color: P.pulse, fontWeight: 700, fontSize: 20 }}>$</span>
            <span style={{ color: P.inkSoft }}>cat</span>
            <span style={{ color: seriesAccent, fontWeight: 600 }}>--{s.label.replace(' ', '_')}</span>
            <span style={{ color: P.inkMute }}>|</span>
            <span style={{ color: P.inkSoft }}>head -1</span>
          </div>

          {/* Big title */}
          <div style={{
            fontSize: titleSize, lineHeight: 1.06, fontWeight: 700,
            letterSpacing: '-0.035em', color: P.ink,
            textWrap: 'balance', maxWidth: '100%',
          }}>
            {title}
          </div>

          {/* Tag line + caret */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginTop: 'auto', fontSize: 14,
          }}>
            <span style={{ color: P.inkMute }}># tags:</span>
            {tags.map((t, i) => (
              <span key={i} style={{
                color: seriesAccent,
                background: tagBg,
                padding: '4px 10px',
                borderRadius: 6, // site's --radius
                fontWeight: 500, letterSpacing: '0.01em',
              }}>{t}</span>
            ))}
            <span style={{ flex: 1 }} />
            {/* solid caret block, accent color */}
            <span style={{
              display: 'inline-block', width: 10, height: 18,
              background: seriesAccent,
            }} />
          </div>
        </div>

        {/* Footer band inside the window — mirrors the site footer's "all systems operational" */}
        <div style={{
          height: 48, padding: '0 18px',
          display: 'flex', alignItems: 'center', gap: 10,
          background: P.bgElev,
          borderTop: `1px solid ${P.rule}`,
          fontSize: 13, color: P.inkSoft,
        }}>
          {/* small pulse + author */}
          <span style={{
            display: 'inline-block', width: 8, height: 8, borderRadius: 4,
            background: P.pulse,
          }} />
          <span style={{ color: P.ink, fontWeight: 600 }}>Koen van der Borght</span>
          <span style={{ color: P.inkMute }}>·</span>
          <span style={{ color: P.inkMute }}>senior dev &amp; tech lead</span>

          <span style={{ flex: 1 }} />

          {/* wordmark */}
          <span style={{
            color: P.ink, fontWeight: 700, letterSpacing: '-0.01em',
          }}>
            koenvdborght.nl
          </span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SiteTerminalCard, SITE_SERIES });
