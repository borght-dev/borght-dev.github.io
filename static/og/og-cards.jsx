// og-cards.jsx — OG card variants for koenvdborght.nl
// All variants render at exactly 1200×630. Each accepts the same props.

const SERIES = {
  engineering: { label: 'engineering',  accent: '#6655d4', glyph: '⌥' },
  notes:       { label: 'notes',        accent: '#3ba68e', glyph: '∴' },
  essays:      { label: 'essays',       accent: '#c7324f', glyph: '¶' },
  dispatches:  { label: 'dispatches',   accent: '#b07d09', glyph: '↗' },
  field:       { label: 'field guides', accent: '#7c6af6', glyph: '◇' },
};

const FONT = "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace";

// ─── Helpers ─────────────────────────────────────────────────

// Auto-fit title size: 30 chars → ~84px, 80 chars → ~52px.
function fitTitleSize(title, base = 84, floor = 52) {
  const len = (title || '').length;
  if (len <= 32) return base;
  if (len >= 80) return floor;
  const t = (len - 32) / (80 - 32);
  return Math.round(base - (base - floor) * t);
}

function Avatar({ size = 44, accent = '#6655d4', dark }) {
  // Monogram avatar: "k" mark on accent gradient
  const bg = dark ? '#1a1726' : '#ffffff';
  return (
    <div style={{
      width: size, height: size, borderRadius: size,
      background: `linear-gradient(135deg, ${accent} 0%, ${shade(accent, 18)} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontFamily: FONT, fontWeight: 700,
      fontSize: size * 0.46, letterSpacing: '-0.04em',
      boxShadow: `0 1px 0 rgba(255,255,255,.2) inset, 0 0 0 2px ${bg}, 0 0 0 3px ${accent}33`,
    }}>k</div>
  );
}

function shade(hex, pct) {
  // lighten/darken hex by pct (positive = lighter)
  const n = parseInt(hex.slice(1), 16);
  let r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const f = pct / 100;
  r = Math.max(0, Math.min(255, Math.round(r + (255 - r) * f)));
  g = Math.max(0, Math.min(255, Math.round(g + (255 - g) * f)));
  b = Math.max(0, Math.min(255, Math.round(b + (255 - b) * f)));
  return '#' + ((r << 16) | (g << 8) | b).toString(16).padStart(6, '0');
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 1 — TERMINAL
// Renders the post as a terminal session: prompt, command, output.
// ═══════════════════════════════════════════════════════════════
function TerminalCard({ title, series, date, tags, dark }) {
  const s = SERIES[series] || SERIES.engineering;
  const bg = dark ? '#0e0c17' : '#f7f5fb';
  const surface = dark ? '#16131f' : '#ffffff';
  const fg = dark ? '#edeaf4' : '#1a1726';
  const muted = dark ? '#8a85a0' : '#5a5670';
  const faint = dark ? '#3a3650' : '#b8b0c8';
  const border = dark ? 'rgba(138,133,160,0.14)' : 'rgba(90,86,112,0.12)';

  const titleSize = fitTitleSize(title, 64, 40);

  return (
    <div style={{
      width: 1200, height: 630, background: bg, color: fg,
      fontFamily: FONT, position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* ambient grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${border} 1px, transparent 1px), linear-gradient(90deg, ${border} 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
        opacity: 0.5, maskImage: 'radial-gradient(ellipse at 30% 40%, black 30%, transparent 75%)',
      }} />

      {/* terminal window */}
      <div style={{
        margin: 56, marginBottom: 0, flex: 1, background: surface,
        borderRadius: 12, border: `1px solid ${border}`,
        boxShadow: dark ? '0 24px 60px rgba(0,0,0,.6)' : '0 24px 60px rgba(102,85,212,.10), 0 4px 12px rgba(102,85,212,.06)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'relative', zIndex: 1,
      }}>
        {/* titlebar */}
        <div style={{
          height: 36, padding: '0 16px', display: 'flex', alignItems: 'center',
          gap: 8, borderBottom: `1px solid ${border}`,
          background: dark ? 'rgba(255,255,255,.02)' : 'rgba(0,0,0,.015)',
        }}>
          <div style={{ width: 11, height: 11, borderRadius: 11, background: '#e54065' }} />
          <div style={{ width: 11, height: 11, borderRadius: 11, background: '#f5b73b' }} />
          <div style={{ width: 11, height: 11, borderRadius: 11, background: '#7dd3c0' }} />
          <div style={{ flex: 1, textAlign: 'center', fontSize: 12, color: muted, letterSpacing: '0.02em' }}>
            ~/koenvdborght.nl/posts — zsh
          </div>
          <div style={{ fontSize: 11, color: faint, fontVariantNumeric: 'tabular-nums' }}>{date}</div>
        </div>

        {/* body */}
        <div style={{ padding: '32px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* command line */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, fontSize: 18 }}>
            <span style={{ color: s.accent, fontWeight: 700 }}>❯</span>
            <span style={{ color: muted }}>cat</span>
            <span style={{ color: s.accent }}>--series</span>
            <span style={{ color: fg }}>{s.label.replace(' ', '_')}</span>
          </div>

          {/* output: big title */}
          <div style={{
            fontSize: titleSize, lineHeight: 1.05, fontWeight: 700,
            letterSpacing: '-0.035em', color: fg,
            textWrap: 'balance', maxWidth: '100%',
          }}>
            {title}
          </div>

          {/* tag line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto', fontSize: 14 }}>
            <span style={{ color: faint }}># tags:</span>
            {tags.map((t, i) => (
              <span key={i} style={{
                color: s.accent,
                background: s.accent + (dark ? '22' : '12'),
                padding: '3px 10px', borderRadius: 4,
                fontWeight: 500,
              }}>{t}</span>
            ))}
            <span style={{
              marginLeft: 'auto', color: muted, display: 'inline-flex',
              alignItems: 'center', gap: 8,
            }}>
              <span style={{
                display: 'inline-block', width: 10, height: 18,
                background: s.accent, animation: 'none',
                verticalAlign: 'middle',
              }} />
            </span>
          </div>
        </div>
      </div>

      {/* footer: author + wordmark */}
      <div style={{
        padding: '24px 56px 28px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', position: 'relative', zIndex: 1,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar size={48} accent={s.accent} dark={dark} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: 16, fontWeight: 600, color: fg, letterSpacing: '-0.01em' }}>
              koen van der borght
            </div>
            <div style={{ fontSize: 13, color: muted }}>@koenvdb · the netherlands</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-block', width: 10, height: 10, borderRadius: 10,
            background: s.accent, boxShadow: `0 0 12px ${s.accent}`,
          }} />
          <span style={{ fontSize: 15, fontWeight: 600, color: fg, letterSpacing: '-0.01em' }}>
            koenvdborght.nl
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 2 — DIAGRAMMATIC
// Engineering schematic: annotated callouts pointing at the title.
// ═══════════════════════════════════════════════════════════════
function DiagrammaticCard({ title, series, date, tags, dark }) {
  const s = SERIES[series] || SERIES.engineering;
  const bg = dark ? '#110f1a' : '#f7f5fb';
  const fg = dark ? '#edeaf4' : '#1a1726';
  const muted = dark ? '#8a85a0' : '#5a5670';
  const faint = dark ? '#3a3650' : '#b8b0c8';
  const grid = dark ? 'rgba(138,133,160,0.08)' : 'rgba(90,86,112,0.07)';
  const stroke = dark ? '#5a5670' : '#8a85a0';

  const titleSize = fitTitleSize(title, 78, 46);

  // Position: centered vertically; we draw callouts around it.
  return (
    <div style={{
      width: 1200, height: 630, background: bg, color: fg,
      fontFamily: FONT, position: 'relative', overflow: 'hidden',
    }}>
      {/* dotted blueprint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `radial-gradient(${grid} 1.5px, transparent 1.5px)`,
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0',
      }} />
      {/* major grid lines */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: '120px 120px',
        opacity: 0.6,
      }} />

      {/* corner registration marks */}
      {[[40, 40], [1160, 40], [40, 590], [1160, 590]].map(([x, y], i) => (
        <svg key={i} width="20" height="20" style={{ position: 'absolute', left: x - 10, top: y - 10 }}>
          <line x1="0" y1="10" x2="20" y2="10" stroke={stroke} strokeWidth="1" />
          <line x1="10" y1="0" x2="10" y2="20" stroke={stroke} strokeWidth="1" />
          <circle cx="10" cy="10" r="3" fill="none" stroke={stroke} strokeWidth="1" />
        </svg>
      ))}

      {/* top bar: series + date */}
      <div style={{
        position: 'absolute', top: 56, left: 80, right: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{
            display: 'inline-block', width: 8, height: 8, background: s.accent,
            transform: 'rotate(45deg)',
          }} />
          <span style={{ color: s.accent, fontWeight: 600 }}>{`series.${series}`}</span>
          <span style={{ color: faint }}>/</span>
          <span style={{ color: muted }}>{`fig. ${String(Math.floor(Math.random() * 40) + 10).padStart(2, '0')}`}</span>
        </div>
        <div style={{ color: muted, fontVariantNumeric: 'tabular-nums' }}>
          {date}
        </div>
      </div>

      {/* title block (the "subject" of the diagram) */}
      <div style={{
        position: 'absolute', left: 130, right: 130, top: '50%',
        transform: 'translateY(-52%)',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {/* dimension line on top */}
        <svg width="100%" height="14" style={{ overflow: 'visible' }}>
          <line x1="0" y1="7" x2="100%" y2="7" stroke={stroke} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="0" y1="0" x2="0" y2="14" stroke={stroke} strokeWidth="1" />
          <line x1="100%" y1="0" x2="100%" y2="14" stroke={stroke} strokeWidth="1" />
        </svg>

        <div style={{
          fontSize: titleSize, lineHeight: 1.04, fontWeight: 700,
          letterSpacing: '-0.04em', color: fg, textWrap: 'balance',
        }}>
          {title}
        </div>

        {/* underline accent */}
        <div style={{
          height: 4, width: 120, background: s.accent, marginTop: 4,
        }} />
      </div>

      {/* CALLOUTS */}
      {/* Callout 1: top-left → title (subject) */}
      <CalloutLine
        from={[150, 200]} to={[145, 268]}
        labelPos={[80, 184]} stroke={stroke}
        text={['/* subject */', `${title.length} chars`]} muted={muted} accent={s.accent}
      />

      {/* Callout 2: top-right → series tag */}
      <CalloutLine
        from={[1050, 220]} to={[1100, 110]}
        labelPos={[920, 220]} stroke={stroke}
        text={['accent =', s.accent]} muted={muted} accent={s.accent} align="right"
      />

      {/* Callout 3: bottom-left → tags */}
      <CalloutLine
        from={[210, 510]} to={[170, 565]}
        labelPos={[110, 488]} stroke={stroke}
        text={['/* keywords */', `${tags.length} matched`]} muted={muted} accent={s.accent}
      />

      {/* bottom bar: author + tags + wordmark */}
      <div style={{
        position: 'absolute', bottom: 56, left: 80, right: 80,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar size={40} accent={s.accent} dark={dark} />
          <div style={{ fontSize: 14, color: fg, fontWeight: 600 }}>
            koen van der borght
          </div>
          <div style={{ display: 'flex', gap: 6, marginLeft: 8 }}>
            {tags.map((t, i) => (
              <span key={i} style={{
                fontSize: 11, padding: '3px 8px',
                border: `1px solid ${s.accent}55`,
                color: s.accent, borderRadius: 0,
              }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{
          fontSize: 14, fontWeight: 700, color: fg,
          letterSpacing: '-0.01em',
          padding: '6px 12px', border: `1px solid ${stroke}`,
        }}>
          koenvdborght.nl
        </div>
      </div>
    </div>
  );
}

function CalloutLine({ from, to, labelPos, stroke, text, muted, accent, align = 'left' }) {
  // L-shaped leader line
  const [fx, fy] = from;
  const [tx, ty] = to;
  const mid = (fx + tx) / 2;
  return (
    <>
      <svg style={{
        position: 'absolute', left: 0, top: 0, width: 1200, height: 630,
        pointerEvents: 'none',
      }}>
        <polyline
          points={`${fx},${fy} ${mid},${fy} ${mid},${ty} ${tx},${ty}`}
          fill="none" stroke={stroke} strokeWidth="1"
        />
        <circle cx={tx} cy={ty} r="3" fill={accent} />
        <circle cx={fx} cy={fy} r="2" fill="none" stroke={stroke} strokeWidth="1" />
      </svg>
      <div style={{
        position: 'absolute', left: labelPos[0], top: labelPos[1],
        fontFamily: FONT, fontSize: 11, lineHeight: 1.5,
        textAlign: align, color: muted,
      }}>
        <div style={{ color: accent, fontWeight: 600 }}>{text[0]}</div>
        <div>{text[1]}</div>
      </div>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════
// VARIANT 3 — SYNTAX (hybrid: terminal + diagrammatic)
// Renders the post as a code declaration with syntax highlighting.
// ═══════════════════════════════════════════════════════════════
function SyntaxCard({ title, series, date, tags, dark }) {
  const s = SERIES[series] || SERIES.engineering;
  const bg = dark ? '#0e0c17' : '#f7f5fb';
  const fg = dark ? '#edeaf4' : '#1a1726';
  const muted = dark ? '#8a85a0' : '#5a5670';
  const faint = dark ? '#3a3650' : '#b8b0c8';
  const keyword = s.accent;
  const string = dark ? '#7dd3c0' : '#3ba68e';
  const number = dark ? '#f5b73b' : '#b07d09';
  const comment = dark ? '#5a5670' : '#8a85a0';

  // Adjust title size for code container
  const titleSize = fitTitleSize(title, 56, 36);

  return (
    <div style={{
      width: 1200, height: 630, background: bg, color: fg,
      fontFamily: FONT, position: 'relative', overflow: 'hidden',
      padding: 80, display: 'flex', flexDirection: 'column', gap: 32,
    }}>
      {/* faint accent bar at left edge */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 6,
        background: s.accent,
      }} />
      {/* corner glow */}
      <div style={{
        position: 'absolute', right: -200, top: -200, width: 600, height: 600,
        background: `radial-gradient(circle, ${s.accent}20 0%, transparent 60%)`,
        pointerEvents: 'none',
      }} />

      {/* top: file header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 14 }}>
          <span style={{ color: muted }}>~/posts/</span>
          <span style={{ color: s.accent, fontWeight: 600 }}>{series}/</span>
          <span style={{ color: fg, fontWeight: 600 }}>
            {(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40))}.md
          </span>
        </div>
        <div style={{
          fontSize: 12, color: muted, fontVariantNumeric: 'tabular-nums',
          padding: '4px 10px', background: dark ? 'rgba(138,133,160,.06)' : 'rgba(90,86,112,.05)',
          borderRadius: 4,
        }}>
          {date}
        </div>
      </div>

      {/* code body with line gutter */}
      <div style={{
        flex: 1, display: 'flex', gap: 24, fontSize: 18, lineHeight: 1.7,
      }}>
        {/* line numbers */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 0,
          color: faint, fontVariantNumeric: 'tabular-nums', textAlign: 'right',
          fontSize: 14, paddingTop: 6,
        }}>
          {[1, 2, 3, 4, 5, 6].map(n => <div key={n} style={{ height: 30 }}>{n.toString().padStart(2, '0')}</div>)}
        </div>

        {/* code lines */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ height: 30 }}>
            <span style={{ color: comment }}>{`// series: ${s.label}`}</span>
          </div>
          <div style={{ height: 30 }}>
            <span style={{ color: keyword }}>export const</span>{' '}
            <span style={{ color: fg, fontWeight: 600 }}>post</span>{' '}
            <span style={{ color: muted }}>=</span>{' '}
            <span style={{ color: muted }}>{'{'}</span>
          </div>
          <div style={{ height: 30, paddingLeft: 28, fontSize: 16 }}>
            <span style={{ color: muted }}>title:</span>{' '}
            <span style={{ color: string }}>"</span>
          </div>
          {/* THE TITLE — big block */}
          <div style={{
            paddingLeft: 28, fontSize: titleSize, lineHeight: 1.05,
            color: string, fontWeight: 700, letterSpacing: '-0.035em',
            margin: '6px 0 10px', textWrap: 'balance',
          }}>
            {title}
          </div>
          <div style={{ height: 30, paddingLeft: 28, fontSize: 16 }}>
            <span style={{ color: string }}>"</span>
            <span style={{ color: muted }}>,</span>{' '}
            <span style={{ color: comment }}>// {tags.join(' · ')}</span>
          </div>
          <div style={{ height: 30, fontSize: 16, marginTop: 'auto' }}>
            <span style={{ color: muted }}>{'}'}</span>
            <span style={{ color: muted }}>;</span>
          </div>
        </div>
      </div>

      {/* footer */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingTop: 20, borderTop: `1px solid ${faint}33`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <Avatar size={42} accent={s.accent} dark={dark} />
          <div>
            <div style={{ fontSize: 15, color: fg, fontWeight: 600, letterSpacing: '-0.01em' }}>
              koen van der borght
            </div>
            <div style={{ fontSize: 12, color: muted }}>{tags.map(t => `#${t}`).join('  ')}</div>
          </div>
        </div>
        <div style={{
          fontSize: 15, fontWeight: 700, color: fg, letterSpacing: '-0.01em',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span style={{ color: s.accent }}>{'>'}</span>
          koenvdborght.nl
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TerminalCard, DiagrammaticCard, SyntaxCard, SERIES });
