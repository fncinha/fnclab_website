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
    .fnc-page img { max-width: 100%; }

    /* ---- Responsive ---- */
    @media (max-width: 960px) {
      .r-pi   { grid-template-columns: 1fr !important; gap: 36px !important; }
      .r-foot { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
    }
    @media (max-width: 760px) {
      .fnc-page section { padding-left: 22px !important; padding-right: 22px !important; }
      .fnc-head,
      .r-navbar,
      .r-foot, .r-foot-bottom {
        padding-left: 22px !important; padding-right: 22px !important; }
      .fnc-head { padding-top: 48px !important; }
      .fnc-head h1 { font-size: clamp(32px, 8.5vw, 46px) !important; }
      .r-hero { grid-template-columns: 1fr !important; gap: 34px !important;
        padding-top: 56px !important; padding-bottom: 72px !important; }
      .r-hero-h1 { white-space: normal !important; font-size: clamp(30px, 8.5vw, 46px) !important; }
      .r-hero-sub { white-space: normal !important; }
      .r-rlist { grid-template-columns: 1fr !important; }
      .r-high  { grid-template-columns: repeat(2, 1fr) !important; }
      .r-cv    { grid-template-columns: 1fr !important; gap: 36px !important; }
      .r-pat   { grid-template-columns: 1fr !important; gap: 4px !important; }
      .r-pat .r-pat-no { text-align: left !important; }
      .r-proj  { grid-template-columns: 1fr !important; gap: 6px !important; }
      .r-proj .r-proj-role { text-align: left !important; }
      .r-pub   { grid-template-columns: 1fr !important; gap: 6px !important; }
      .r-pub .r-pub-type { text-align: left !important; }
      .r-vids  { grid-template-columns: 1fr !important; }
      .r-vids > a { width: 100% !important; }
      .r-navbar { flex-wrap: wrap !important; padding-top: 14px !important;
        padding-bottom: 14px !important; row-gap: 12px !important; }
      .r-nav { flex-wrap: wrap !important; gap: 18px !important; row-gap: 12px !important; }
      .r-foot-bottom { flex-direction: column !important; gap: 6px !important; }
    }
    @media (max-width: 440px) {
      .r-high { grid-template-columns: 1fr !important; }
    }

    /* ---- Scroll reveal (subtle) ---- */
    .fnc-page [data-rv] {
      opacity: 0; transform: translateY(16px);
      transition: opacity 0.6s cubic-bezier(0.22,0.61,0.36,1),
                  transform 0.6s cubic-bezier(0.22,0.61,0.36,1); }
    .fnc-page [data-rv].rv-in { opacity: 1; transform: none; }
    @media (prefers-reduced-motion: reduce) {
      .fnc-page [data-rv] { opacity: 1 !important; transform: none !important;
        transition: none !important; }
    }

    /* ---- Buttons & nav micro-interactions ---- */
    .fnc-page .fnc-btn {
      transition: transform 0.2s ease, box-shadow 0.25s ease,
                  background 0.2s ease, opacity 0.2s ease; will-change: transform; }
    .fnc-page .fnc-btn:hover { transform: translateY(-2px);
      box-shadow: 0 8px 22px rgba(20,33,66,0.16); }
    .fnc-page .fnc-btn:active { transform: translateY(0) scale(0.98); }
    .fnc-page .r-nav a { transition: color 0.2s ease, border-color 0.2s ease; }
    @media (prefers-reduced-motion: reduce) {
      .fnc-page .fnc-btn, .fnc-page .fnc-btn:hover, .fnc-page .fnc-btn:active {
        transform: none !important; }
    }
  `;
  document.head.appendChild(s);
}

// ---------- Scroll-reveal installer ----------
// Gently fades page blocks up as they enter the viewport. Re-scans on every
// route change via a MutationObserver, and respects prefers-reduced-motion.
if (!window.__fncRevealInstalled) {
  window.__fncRevealInstalled = true;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('rv-in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  const scan = () => {
    document.querySelectorAll('.fnc-head, .fnc-page main section').forEach((el) => {
      if (!el.hasAttribute('data-rv')) { el.setAttribute('data-rv', ''); io.observe(el); }
    });
  };
  let raf = 0;
  const kick = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(scan); };
  const start = () => {
    scan();
    const app = document.getElementById('app');
    if (app) new MutationObserver(kick).observe(app, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else { start(); }
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

function InhaLogo({ dark = false, height = 54 }) {
  if (HAS_LOGO_FILE) {
    const logo = (
      <img
        src={LOGO_SRC}
        alt="Inha University"
        style={{ height, width: 'auto', display: 'block' }}
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
      <div className="r-navbar" style={{ maxWidth: 1320, margin: '0 auto', padding: '16px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}>
        <a href="#/home" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="assets/logo-lockup.svg" alt="FNC Lab"
            style={{ height: 44, width: 'auto', display: 'block' }} />
          <span style={{ width: 1, height: 30, background: dim, opacity: 0.4 }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.22 }}>
            <span style={{ fontSize: 17, fontWeight: 500, letterSpacing: '-0.018em' }}>
              {c.site.labNameShort}
            </span>
            <span style={{ fontSize: 12.5, color: dim, letterSpacing: '0.01em', marginTop: 2 }}>
              {c.site.affiliation}
            </span>
          </div>
        </a>
        <nav className="r-nav" style={{ display: 'flex', gap: 30, alignItems: 'center' }}>
          {items.map(n => {
            const on = n.id === active;
            return (
              <a key={n.id} href={`#/${n.id}`} style={{
                fontSize: 15.5, color: on ? T.blue : dim,
                fontWeight: on ? 600 : 450, position: 'relative', paddingBottom: 2,
                borderBottom: on ? `2px solid ${T.blue}` : '2px solid transparent',
              }}>{n.label}</a>
            );
          })}
          <span style={{ width: 1, height: 14, background: dim, opacity: 0.4 }} />
          <LangToggle />
          <span style={{ width: 1, height: 26, background: dim, opacity: 0.35 }} />
          <a href="https://www.inha.ac.kr" target="_blank" rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center' }} aria-label="Inha University">
            <InhaLogo height={52} />
          </a>
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
    <div style={{ display: 'inline-flex', gap: 8, fontSize: 13.5, fontFamily: T.mono }}>
      <a onClick={() => set('en')} style={{
        color: lang === 'en' ? 'inherit' : 'currentColor',
        opacity: lang === 'en' ? 1 : 0.5, cursor: 'pointer',
      }}>ENG</a>
      <span style={{ opacity: 0.3 }}>/</span>
      <a onClick={() => set('ko')} style={{
        opacity: lang === 'ko' ? 1 : 0.5, cursor: 'pointer',
      }}>KOR</a>
    </div>
  );
}

function FNCFooter({ c }) {
  return (
    <div style={{ borderTop: `1px solid ${T.rule}`, background: T.ivory, color: T.ink70 }}>
      <div className="r-foot" style={{ maxWidth: 1320, margin: '0 auto', padding: '40px 56px',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 40, fontSize: 13 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: T.ink, marginBottom: 6 }}>
            {c.site.labName}
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
        fontSize: 11, color: T.ink50 }} className="mono r-foot-bottom">
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
