// lab-tokens.jsx
// FNC Lab — design tokens, language context, shared chrome (Nav + Footer)

// ---------- Tokens ----------
const T = {
  // Inha blue + warm ivory
  blue:      'oklch(0.42 0.12 250)',
  blueDeep:  'oklch(0.28 0.10 250)',
  blueSoft:  'oklch(0.55 0.10 250)',

  ink:       'oklch(0.18 0.012 250)',
  ink70:     'oklch(0.35 0.012 250)',
  ink50:     'oklch(0.55 0.010 250)',
  ink30:     'oklch(0.75 0.008 250)',
  ink10:     'oklch(0.92 0.006 250)',

  ivory:     'oklch(0.985 0.008 85)',
  ivoryDeep: 'oklch(0.965 0.012 85)',
  paper:     'oklch(1 0 0)',
  rule:      'oklch(0.88 0.006 250)',

  // Type stack — SF Pro Display first, Pretendard Korean fallback
  sans: 'Pretendard, "Pretendard Variable", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  serif: '"Newsreader", "Source Serif Pro", Georgia, serif',
  mono: 'Pretendard, "Pretendard Variable", system-ui, sans-serif',
};
window.T = T;

// ---------- Inject base CSS once ----------
if (!document.getElementById('fnc-base')) {
  const s = document.createElement('style');
  s.id = 'fnc-base';
  s.textContent = `
    @import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css');
    .fnc-page * { box-sizing: border-box; }
    .fnc-page { font-family: ${T.sans}; color: ${T.ink}; background: ${T.ivory};
      font-feature-settings: "ss01","cv11"; -webkit-font-smoothing: antialiased;
      letter-spacing: -0.011em; line-height: 1.55; }
    .fnc-page .mono { font-family: ${T.sans}; letter-spacing: 0.02em; font-variant-numeric: tabular-nums; }
    .fnc-page a { color: inherit; text-decoration: none; }
    .fnc-page h1, .fnc-page h2, .fnc-page h3 { font-weight: 500; letter-spacing: -0.028em; line-height: 1.05; margin: 0; }
    .fnc-page p { margin: 0; text-wrap: pretty; }
    .fnc-page .eyebrow { font-family: ${T.sans}; font-size: 11px; letter-spacing: 0.14em;
      text-transform: uppercase; color: ${T.ink50}; font-weight: 500; }
    .fnc-page .label { font-family: ${T.sans}; letter-spacing: 0.04em; font-weight: 450; }
    .fnc-page .rule { height: 1px; background: ${T.rule}; }
    .fnc-page .link-underline { background-image: linear-gradient(currentColor,currentColor);
      background-size: 100% 1px; background-repeat: no-repeat; background-position: 0 100%;
      padding-bottom: 1px; }

    /* gentle hover lift for cards/links */
    .fnc-page a[href^="#/research/"], .fnc-page figure {
      transition: transform 0.25s ease, box-shadow 0.25s ease; }
    .fnc-page a[href^="#/research/"]:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 30px rgba(20,33,66,0.10); }
  `;
  document.head.appendChild(s);
}

// ---------- i18n helper ----------
// All variants accept (c) — the content object for the current language.
// Toggling the canvas-level lang re-renders the whole tree.

// ---------- Shared chrome ----------
// InhaLogo: When the real Inha logo file is dropped into assets/, flip
// HAS_LOGO_FILE to true. Until then, render a clean wordmark placeholder.
const HAS_LOGO_FILE = true;
const LOGO_SRC = (typeof window !== 'undefined' && window.__resolveAsset)
  ? window.__resolveAsset('assets/inha-logo.svg') : 'assets/inha-logo.svg';

function InhaLogo({ dark = false }) {
  if (HAS_LOGO_FILE) {
    const logo = (
      <img
        src={LOGO_SRC}
        alt="Inha University"
        style={{ height: 38, width: 'auto', display: 'block' }}
      />
    );
    // On dark navs the emblem's dark text/ring would vanish — back it with a white chip.
    if (dark) {
      return (
        <span style={{ display: 'inline-flex', padding: 4, background: '#fff',
          borderRadius: 6, boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>
          {logo}
        </span>
      );
    }
    return logo;
  }
  // Fallback wordmark block
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '4px 10px', border: `1px solid ${dark ? 'rgba(255,255,255,0.3)' : T.rule}`,
      borderRadius: 2,
    }}>
      <span style={{
        width: 18, height: 18, background: T.blue, borderRadius: 1,
        display: 'inline-block', position: 'relative',
      }}>
        <span style={{ position:'absolute', inset: 4, border:'1.5px solid #fff' }} />
      </span>
      <span style={{ fontSize: 11, letterSpacing: '0.04em', fontWeight: 500,
        color: dark ? '#fff' : T.ink }}>
        INHA UNIVERSITY
      </span>
    </div>
  );
}

// SITE_NAV — categories visible in the top bar, in order.
// (구성원/모집/연락처 are intentionally omitted per request.)
const SITE_NAV = ['home', 'about', 'research', 'projects', 'publications'];

function FNCNav({ c, active = 'home' }) {
  const dim = T.ink50, fg = T.ink;
  const items = SITE_NAV
    .map(id => c.nav.find(n => n.id === id))
    .filter(Boolean);
  return (
    <div style={{ background: 'rgba(252,251,248,0.92)', backdropFilter: 'blur(10px)',
      color: fg, borderBottom: `1px solid ${T.rule}`,
      position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#/home" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <InhaLogo />
          <span style={{ width: 1, height: 24, background: dim, opacity: 0.4 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontSize: 15, fontWeight: 500, letterSpacing: '-0.018em' }}>
              {c.site.labNameShort}
            </span>
            <span style={{ fontSize: 11, color: dim, letterSpacing: '0.01em', marginTop: 2 }}>
              {c.site.affiliation}
            </span>
          </div>
        </a>
        <nav style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {items.map(n => {
            const on = n.id === active;
            return (
              <a key={n.id} href={`#/${n.id}`} style={{
                fontSize: 14, color: on ? T.blue : dim,
                fontWeight: on ? 600 : 450, position: 'relative', paddingBottom: 2,
                borderBottom: on ? `2px solid ${T.blue}` : '2px solid transparent',
              }}>{n.label}</a>
            );
          })}
          <span style={{ width: 1, height: 14, background: dim, opacity: 0.4 }} />
          <LangToggle />
        </nav>
      </div>
    </div>
  );
}

function LangToggle() {
  // Reads/writes the canvas-level lang via a global setter the host provides.
  const lang = window.__fncLang || 'ko';
  const set = window.__fncSetLang || (() => {});
  return (
    <div style={{ display: 'inline-flex', gap: 8, fontSize: 12, fontFamily: T.mono }}>
      <a onClick={() => set('en')} style={{
        color: lang === 'en' ? 'inherit' : 'currentColor',
        opacity: lang === 'en' ? 1 : 0.5, cursor: 'pointer',
      }}>EN</a>
      <span style={{ opacity: 0.3 }}>/</span>
      <a onClick={() => set('ko')} style={{
        opacity: lang === 'ko' ? 1 : 0.5, cursor: 'pointer',
      }}>KO</a>
    </div>
  );
}

function FNCFooter({ c }) {
  return (
    <div style={{ borderTop: `1px solid ${T.rule}`, background: T.ivory, color: T.ink70 }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 56px',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, fontSize: 13 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 6 }}>
            {c.site.labNameShort} — {c.site.labNameEn}
          </div>
          <div style={{ color: T.ink50 }}>{c.site.affiliation}</div>
          <div style={{ color: T.ink50, marginTop: 2 }} className="mono">{c.site.domain}</div>
        </div>
        <div>
          <div style={{ color: T.ink50, marginBottom: 8 }} className="eyebrow">Contact</div>
          <div>{c.contact.email}</div>
          <div>{c.contact.phone}</div>
        </div>
        <div>
          <div style={{ color: T.ink50, marginBottom: 8 }} className="eyebrow">Address</div>
          <div style={{ lineHeight: 1.5 }}>{c.contact.address}</div>
        </div>
        <div>
          <div style={{ color: T.ink50, marginBottom: 8 }} className="eyebrow">Links</div>
          {['about', 'research', 'projects', 'publications']
            .map(id => c.nav.find(n => n.id === id)).filter(Boolean).map(n => (
            <div key={n.id}><a href={`#/${n.id}`}>{n.label}</a></div>
          ))}
        </div>
      </div>
      <div style={{ borderTop: `1px solid ${T.rule}`, padding: '18px 56px', maxWidth: 1320,
        margin: '0 auto', display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: T.ink50 }} className="mono">
        <span>{c.footer.copyright}</span>
        <span>{c.footer.credit}</span>
      </div>
    </div>
  );
}

// ---------- Reusable bits ----------
function ImagePlaceholder({ label, height = 360, accent = 'blue', ratio }) {
  // Subtly striped placeholder. Use for hero/imagery slots that the lab will swap.
  const bg = accent === 'blue' ? T.blueDeep : T.ink;
  const stripe = accent === 'blue' ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.06)';
  return (
    <div style={{
      width: '100%', height, aspectRatio: ratio,
      background: `repeating-linear-gradient(135deg, ${bg} 0 12px, ${stripe} 12px 13px)`,
      borderRadius: 2, position: 'relative', overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', padding: 18,
    }}>
      <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)',
        letterSpacing: '0.08em' }}>
        [ {label} ]
      </span>
    </div>
  );
}

function VariantBadge({ children }) {
  return (
    <div style={{
      position: 'absolute', top: 12, left: 12, zIndex: 5,
      fontFamily: T.mono, fontSize: 10, letterSpacing: '0.12em',
      padding: '4px 8px', background: 'rgba(255,255,255,0.92)',
      color: T.ink, borderRadius: 2, textTransform: 'uppercase',
      boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
    }}>{children}</div>
  );
}

// LabImg: real photo with object-fit cover on a blue-ink backdrop.
// Falls back to ImagePlaceholder if no src given.
function LabImg({ src, label, height = 360, ratio, fit = 'cover', bg }) {
  if (!src) return <ImagePlaceholder label={label || 'IMAGE'} height={height} ratio={ratio} />;
  return (
    <div style={{
      width: '100%', height: ratio ? undefined : height, aspectRatio: ratio,
      background: bg || T.ink10, overflow: 'hidden', position: 'relative',
    }}>
      <img src={src} alt={label || ''} loading="lazy" style={{
        width: '100%', height: '100%', objectFit: fit, objectPosition: 'center',
        display: 'block',
      }} />
    </div>
  );
}

Object.assign(window, { T, FNCNav, FNCFooter, LangToggle, ImagePlaceholder, LabImg, VariantBadge, InhaLogo });
