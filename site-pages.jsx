// site-pages.jsx — FNC Lab site pages (router-driven, category navigation)
// Pages: Home · About · Research (list + detail w/ photos) · Projects · Publications

const { useState, useEffect } = React;

// shorthand
const wrap = { maxWidth: 1320, margin: '0 auto', padding: '0 56px' };

// Page title header used at top of each inner page
function PageHead({ eyebrow, title, sub }) {
  return (
    <div className="fnc-head" style={{ ...wrap, paddingTop: 72, paddingBottom: 8 }}>
      <div style={{ width: 48, height: 3, background: T.blue, marginBottom: 24 }} />
      <div className="eyebrow" style={{ color: T.blue, marginBottom: 14 }}>{eyebrow}</div>
      <h1 style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.08 }}>
        {title}
      </h1>
      {sub && (
        <p style={{ fontSize: 19, color: T.ink70, lineHeight: 1.6, maxWidth: 720, marginTop: 20,
          whiteSpace: 'pre-line' }}>
          {sub}
        </p>
      )}
    </div>
  );
}

// =========================================================================
// HOME
// =========================================================================
function HomePage({ c, go }) {
  const isKo = (window.__fncLang || 'ko') === 'ko';
  return (
    <div>
      {/* Hero */}
      <section style={{ ...wrap, paddingTop: 96, paddingBottom: 120 }}>
        <div className="r-hero" style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56,
          alignItems: 'center' }}>
          <div>
            <div style={{ width: 48, height: 3, background: T.blue, marginBottom: 28 }} />
            <div className="eyebrow" style={{ marginBottom: 24, color: T.blue }}>
              {c.hero.eyebrow}
            </div>
            <h1 className="r-hero-h1" style={{
              lineHeight: 1.05, fontWeight: 600, letterSpacing: '-0.03em',
              marginBottom: isKo ? 10 : 28, whiteSpace: 'nowrap',
            }}>
              {c.hero.title}
            </h1>
            {isKo && (
              <div className="r-hero-sub" style={{
                fontSize: 'clamp(16px, 2.4vw, 28px)', fontWeight: 600,
                letterSpacing: '-0.01em', color: T.ink70, marginBottom: 28,
                whiteSpace: 'nowrap',
              }}>
                Flow Noise Control LAB.
              </div>
            )}
            <p style={{ maxWidth: 560, fontSize: 20, lineHeight: 1.6, color: T.ink70,
              marginBottom: 36 }}>
              {c.hero.subtitle}
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <a href="#/about" className="fnc-btn" style={btnPrimary}>{navLabel(c,'about')} →</a>
              <a href="#/research" className="fnc-btn" style={btnGhost}>{navLabel(c,'research')}</a>
            </div>
          </div>
          <div>
            <LabImg src={c.hero.image} label="CFD SIMULATION" ratio="4 / 3" bg={T.blueDeep} />
            {c.hero.imageCaption && (
              <div className="mono" style={{ fontSize: 11, color: T.ink50, marginTop: 10,
                letterSpacing: '0.04em' }}>
                FIG. — {c.hero.imageCaption}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// ABOUT
// =========================================================================
function AboutPage({ c }) {
  return (
    <div>
      <PageHead eyebrow={c.about.tagline || 'About'} title={c.about.title} sub={c.about.lead} />

      {/* Representative images */}
      {c.about.highlights && (
        <section style={{ ...wrap, paddingTop: 40 }}>
          <div className="r-high" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {c.about.highlights.map((h, i) => (
              <figure key={i} style={{ margin: 0 }}>
                <div style={{ aspectRatio: '4 / 3', background: T.paper,
                  border: `1px solid ${T.rule}`, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', overflow: 'hidden', padding: 10 }}>
                  <img src={h.src} alt={h.caption} loading="lazy" style={{ maxWidth: '100%',
                    maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
                <figcaption style={{ fontSize: 12.5, color: T.ink70, marginTop: 10,
                  lineHeight: 1.45 }}>{h.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section style={{ ...wrap, paddingTop: 48, paddingBottom: 72 }}>
        <div style={{ maxWidth: 760 }}>
          {c.about.paragraphs.map((p, i) => (
            <p key={i} style={{ fontSize: 17, lineHeight: 1.8, color: T.ink70,
              marginBottom: 24 }}>{p}</p>
          ))}
        </div>
      </section>

      {/* Principles section removed per request */}

      {/* PI */}
      <section style={{ ...wrap, paddingTop: 72, paddingBottom: 88 }}>
        <div className="eyebrow" style={{ color: T.blue, marginBottom: 32 }}>
          Principal Investigator
        </div>
        <div className="r-pi" style={{ display: 'grid', gridTemplateColumns: '300px 1fr 1fr', gap: 48,
          alignItems: 'start' }}>
          <LabImg src={c.professor.photo} label="PROF" ratio="3 / 4" bg={T.blueDeep} />
          <div>
            <h2 style={{ fontSize: 40, fontWeight: 600, letterSpacing: '-0.028em',
              marginBottom: 6 }}>{c.professor.name}</h2>
            <div style={{ fontSize: 14, color: T.ink50, marginBottom: 22 }}>
              {c.professor.nameEn} · {c.professor.title}
            </div>
            <p style={{ fontSize: 16, color: T.ink70, lineHeight: 1.75 }}>{c.professor.bio}</p>
            {c.professor.thesis && (
              <div style={{ marginTop: 20, paddingLeft: 16, borderLeft: `2px solid ${T.rule}` }}>
                <div className="eyebrow" style={{ color: T.ink50, marginBottom: 6 }}>
                  Ph.D. Thesis
                </div>
                <div style={{ fontSize: 14, color: T.ink70, fontStyle: 'italic',
                  lineHeight: 1.5 }}>{c.professor.thesis}</div>
              </div>
            )}
          </div>
          <div>
            <div className="eyebrow" style={{ color: T.ink50, marginBottom: 14 }}>Interests</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {c.professor.interests.map(i => (
                <div key={i} style={{ padding: '12px 14px', background: T.paper,
                  border: `1px solid ${T.rule}`, fontSize: 13 }}>{i}</div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '18px 20px', background: T.blue, color: '#fff',
              display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '6px 16px', fontSize: 13 }}>
              <span className="mono" style={{ opacity: 0.7 }}>EMAIL</span>
              <span>{c.professor.email}</span>
              <span className="mono" style={{ opacity: 0.7 }}>OFFICE</span>
              <span>{c.professor.office}</span>
              <span className="mono" style={{ opacity: 0.7 }}>PHONE</span>
              <span className="mono">{c.professor.phone}</span>
            </div>
          </div>
        </div>

        {/* CV: Education / Career / Patents */}
        <div className="r-cv" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56,
          marginTop: 64, paddingTop: 48, borderTop: `1px solid ${T.rule}` }}>
          {c.professor.education && (
            <div>
              <div className="eyebrow" style={{ color: T.blue, marginBottom: 20 }}>
                {c.ui && c.ui.education ? c.ui.education : 'Education'}
              </div>
              {c.professor.education.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr',
                  gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.rule}` }}>
                  <span className="mono" style={{ fontSize: 13, color: T.ink50 }}>{e.period}</span>
                  <div>
                    <div style={{ fontSize: 15, letterSpacing: '-0.01em' }}>{e.school}</div>
                    <div style={{ fontSize: 13, color: T.ink70, marginTop: 2 }}>
                      {e.degree}{e.note ? ` · ${e.note}` : ''}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {c.professor.career && (
            <div>
              <div className="eyebrow" style={{ color: T.blue, marginBottom: 20 }}>
                {c.ui && c.ui.career ? c.ui.career : 'Career'}
              </div>
              {c.professor.career.map((e, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '110px 1fr',
                  gap: 16, padding: '14px 0', borderTop: i === 0 ? 'none' : `1px solid ${T.rule}` }}>
                  <span className="mono" style={{ fontSize: 13, color: T.ink50 }}>{e.period}</span>
                  <div style={{ fontSize: 15, letterSpacing: '-0.01em', lineHeight: 1.45 }}>
                    {e.role}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {c.professor.patents && (
          <div style={{ marginTop: 48, paddingTop: 40, borderTop: `1px solid ${T.rule}` }}>
            <div className="eyebrow" style={{ color: T.blue, marginBottom: 20 }}>
              {c.ui && c.ui.patents ? c.ui.patents : 'Patents'}
            </div>
            {c.professor.patents.map((p, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 220px',
                gap: 20, alignItems: 'baseline', padding: '14px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${T.rule}` }} className="r-pat">
                <span className="mono" style={{ fontSize: 13, color: T.blue }}>{p.year}</span>
                <div style={{ fontSize: 15, letterSpacing: '-0.01em', lineHeight: 1.45 }}>
                  {p.title}
                </div>
                <div className="mono r-pat-no" style={{ fontSize: 12, color: T.ink50 }}>{p.no}</div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

// =========================================================================
// RESEARCH (list)
// =========================================================================
function ResearchPage({ c }) {
  return (
    <div>
      <PageHead eyebrow="Research" title={navLabel(c, 'research')} sub={c.researchLead} />
      <section style={{ ...wrap, paddingTop: 48, paddingBottom: 88 }}>
        <div className="r-rlist" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {c.research.map((r, i) => (
            <a key={r.id} href={`#/research/${r.id}`} style={{
              background: T.paper, border: `1px solid ${T.rule}`, overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
            }}>
              <LabImg src={r.img} label={r.title} ratio="4 / 3" bg={T.blueDeep} />
              <div style={{ padding: '20px 20px 22px', flex: 1, display: 'flex',
                flexDirection: 'column' }}>
                <div className="mono" style={{ fontSize: 11, color: T.blue, marginBottom: 10 }}>
                  /0{i + 1}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 600, letterSpacing: '-0.018em',
                  lineHeight: 1.28, marginBottom: 10 }}>{r.title}</h3>
                <p style={{ fontSize: 14.5, color: T.ink70, lineHeight: 1.6,
                  marginBottom: r.notes ? 10 : 16, flex: r.notes ? '0 0 auto' : 1 }}>{r.body}</p>
                {r.notes && (
                  <div style={{ marginBottom: 16, flex: 1 }}>
                    {r.notes.map((n, k) => (
                      <div key={k} style={{ fontSize: 11, color: T.ink50, lineHeight: 1.5 }}>
                        * {n}
                      </div>
                    ))}
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {r.tags.slice(0, 3).map(t => (
                      <span key={t} className="mono" style={{ fontSize: 10, color: T.ink70,
                        border: `1px solid ${T.rule}`, padding: '3px 8px', borderRadius: 999 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <span style={{ fontSize: 16, color: T.blue }}>→</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

// =========================================================================
// RESEARCH DETAIL (with photos)
// =========================================================================
function ResearchDetailPage({ c, id }) {
  const [lb, setLb] = useState(null);
  const idx = c.research.findIndex(r => r.id === id);
  const r = c.research[idx];
  if (!r) return <NotFound c={c} />;

  const group = (c.gallery || []).find(g => g.id === id);
  const photos = group ? group.images : [];
  const nav = (d) => setLb(i => (i + d + photos.length) % photos.length);

  return (
    <div>
      <section style={{ ...wrap, paddingTop: 40 }}>
        <a href="#/research" className="link-underline"
          style={{ fontSize: 13, color: T.ink50 }}>← {navLabel(c, 'research')}</a>
      </section>

      <PageHead eyebrow={`Research / 0${idx + 1}`} title={r.title} sub={r.body} />

      {r.notes && (
        <div style={{ ...wrap, paddingTop: 12 }}>
          {r.notes.map((n, i) => (
            <div key={i} style={{ fontSize: 13, color: T.ink50, lineHeight: 1.7 }}>
              * {n}
            </div>
          ))}
        </div>
      )}

      <section style={{ ...wrap, paddingTop: 20, paddingBottom: 40 }}>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {r.tags.map(t => (
            <span key={t} className="mono" style={{ fontSize: 11, color: T.ink70,
              border: `1px solid ${T.rule}`, padding: '5px 12px', borderRadius: 999 }}>{t}</span>
          ))}
        </div>
      </section>

      {/* Resources / reference links — directly under the description */}
      {r.links && r.links.length > 0 && (
        <section style={{ ...wrap, paddingBottom: 40 }}>
          <div className="eyebrow" style={{ color: T.blue, marginBottom: 16 }}>
            {c.ui ? c.ui.resources : 'Resources'}
          </div>
          <div style={{ borderTop: `1px solid ${T.rule}` }}>
            {r.links.map((lk, i) => (
              <a key={i} href={lk.url} target="_blank" rel="noopener noreferrer" style={{
                display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'baseline',
                padding: '18px 0', borderBottom: `1px solid ${T.rule}`,
              }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.015em',
                    marginBottom: 4 }}>{lk.title}</div>
                  <div className="mono link-underline" style={{ fontSize: 13, color: T.blue,
                    marginBottom: lk.desc ? 6 : 0, display: 'inline-block' }}>
                    {/^https?:\/\//.test(lk.url)
                      ? lk.url.replace(/^https?:\/\//, '').replace(/\/$/, '')
                      : lk.url.split('/').pop()}
                  </div>
                  {lk.desc && (
                    <div style={{ fontSize: 14, color: T.ink70, lineHeight: 1.55 }}>{lk.desc}</div>
                  )}
                </div>
                <span className="mono" style={{ fontSize: 12, color: T.blue, whiteSpace: 'nowrap' }}>
                  {/^https?:\/\//.test(lk.url)
                    ? (c.ui ? c.ui.visitSite : 'Visit site')
                    : 'PDF'} ↗
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Videos */}
      {r.videos && r.videos.length > 0 && (
        <section style={{ ...wrap, paddingBottom: 48 }}>
          <div className="eyebrow" style={{ color: T.blue, marginBottom: 16 }}>
            {c.ui ? c.ui.videos : 'Videos'}
          </div>
          <div className="r-vids" style={{ display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 360px))',
            gap: 24 }}>
            {r.videos.map((v, i) => (
              <a key={i} href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', width: 360, maxWidth: '100%',
                  border: `1px solid ${T.rule}`, background: T.paper, overflow: 'hidden' }}>
                <div style={{ width: '100%', aspectRatio: '16 / 9', background: '#000' }}>
                  <img src={v.thumb || `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title || 'video'} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <div style={{ padding: '14px 16px 16px' }}>
                  {v.title && (
                    <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.012em',
                      lineHeight: 1.4, color: T.ink, marginBottom: 10 }}>{v.title}</div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between' }}>
                    <span className="mono link-underline" style={{ fontSize: 13, color: T.blue }}>
                      {c.ui ? c.ui.watchVideo : 'Watch on YouTube'}
                    </span>
                    <span className="mono" style={{ fontSize: 12, color: T.blue }}>↗</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Photos */}
      <section style={{ ...wrap, paddingBottom: 88 }}>
        {photos.length > 0 ? (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12,
              borderTop: `1px solid ${T.rule}`, paddingTop: 24, marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-0.018em' }}>
                {c.ui ? c.ui.relatedImages : 'Related images'}
              </h2>
              <span className="mono" style={{ fontSize: 12, color: T.ink50 }}>
                {photos.length}
              </span>
            </div>
            <div style={{ display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {photos.map((im, i) => (
                <figure key={i} onClick={() => setLb(i)} style={{ margin: 0, cursor: 'pointer',
                  background: T.paper, border: `1px solid ${T.rule}`, overflow: 'hidden' }}>
                  <div style={{ aspectRatio: '4 / 3', overflow: 'hidden', background: T.ink10 }}>
                    <img src={im.src} alt={im.caption} loading="lazy" style={{ width: '100%',
                      height: '100%', objectFit: 'cover', display: 'block',
                      transition: 'transform .3s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                  <figcaption style={{ padding: '12px 14px', fontSize: 13, color: T.ink70,
                    lineHeight: 1.45 }}>{im.caption}</figcaption>
                </figure>
              ))}
            </div>
          </>
        ) : (
          <div style={{ borderTop: `1px solid ${T.rule}`, paddingTop: 40,
            color: T.ink50, fontSize: 15 }}>
            {c.ui ? c.ui.noImages : 'Images will be added soon.'}
          </div>
        )}
      </section>

      <Lightbox items={photos} index={lb} onClose={() => setLb(null)} onNav={nav} />
    </div>
  );
}

// =========================================================================
// PROJECTS
// =========================================================================
function ProjectsPage({ c }) {
  return (
    <div>
      <PageHead eyebrow="Projects" title={navLabel(c, 'projects')} />
      <section style={{ ...wrap, paddingTop: 40, paddingBottom: 88 }}>
        {c.projects.map((p, i) => (
          <div key={i} className="r-proj" style={{ display: 'grid', gridTemplateColumns: '140px 1fr 240px 90px',
            alignItems: 'baseline', gap: 24, padding: '26px 0',
            borderTop: `1px solid ${T.rule}` }}>
            <span className="mono" style={{ fontSize: 14, color: T.blue }}>{p.year}</span>
            <div style={{ fontSize: 19, letterSpacing: '-0.015em', lineHeight: 1.4 }}>
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
                  color: T.blue, textDecoration: 'underline', textDecorationColor: T.blue,
                  textUnderlineOffset: 3, textDecorationThickness: 1 }}>
                  {p.title}
                </a>
              ) : p.title}
            </div>
            <div style={{ fontSize: 14.5, color: T.ink70 }}>{p.sponsor}</div>
            <div className="r-proj-role" style={{ fontSize: 12, color: T.ink50, textAlign: 'right' }}>{p.role}</div>
          </div>
        ))}
      </section>
    </div>
  );
}

// =========================================================================
// PUBLICATIONS
// =========================================================================
function PublicationsPage({ c }) {
  const years = [...new Set(c.publications.map(p => p.year))].sort((a, b) => b - a);
  return (
    <div>
      <PageHead eyebrow="Publications" title={navLabel(c, 'publications')} />
      <section style={{ ...wrap, paddingTop: 40, paddingBottom: 88 }}>
        {years.map(y => (
          <div key={y} style={{ marginBottom: 8 }}>
            {c.publications.filter(p => p.year === y).map((p, i, arr) => (
              <div key={i} className="r-pub" style={{ display: 'grid', gridTemplateColumns: '70px 1fr 300px 110px',
                alignItems: 'baseline', gap: 24, padding: '22px 0',
                borderTop: `1px solid ${T.rule}` }}>
                <span className="mono" style={{ fontSize: 14, color: T.blue }}>
                  {i === 0 ? p.year : ''}
                </span>
                <div>
                  <div style={{ fontSize: 18, marginBottom: 4, letterSpacing: '-0.015em',
                    lineHeight: 1.4 }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: T.ink50 }}>
                    {p.authors}{p.date ? ` · ${p.date}` : ''}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontStyle: 'italic', color: T.ink70 }}>{p.venue}</div>
                <div className="mono r-pub-type" style={{ fontSize: 11, color: T.ink50, textAlign: 'right' }}>
                  {p.type}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}

// =========================================================================
// Lightbox + helpers
// =========================================================================
function Lightbox({ items, index, onClose, onNav }) {
  useEffect(() => {
    if (index == null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, onClose, onNav]);

  if (index == null || !items[index]) return null;
  const it = items[index];
  const nb = (side) => ({ position: 'absolute', [side]: 20, top: '50%',
    transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.12)', border: 'none',
    color: '#fff', width: 48, height: 48, borderRadius: '50%', fontSize: 28, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 });
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(12,18,32,0.92)', backdropFilter: 'blur(8px)', display: 'flex',
      flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
      <button onClick={onClose} style={{ position: 'absolute', top: 24, right: 28,
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', fontSize: 30,
        cursor: 'pointer', lineHeight: 1 }}>×</button>
      {items.length > 1 && <button onClick={e => { e.stopPropagation(); onNav(-1); }} style={nb('left')}>‹</button>}
      {items.length > 1 && <button onClick={e => { e.stopPropagation(); onNav(1); }} style={nb('right')}>›</button>}
      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column',
        alignItems: 'center' }}>
        <img src={it.src} alt={it.caption} style={{ maxWidth: '86vw', maxHeight: '72vh',
          objectFit: 'contain', background: '#fff', borderRadius: 2,
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} />
        <div style={{ marginTop: 18, textAlign: 'center', maxWidth: 640 }}>
          <div style={{ fontSize: 16, color: '#fff', letterSpacing: '-0.01em' }}>{it.caption}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            {index + 1} / {items.length}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotFound({ c }) {
  return (
    <div style={{ ...wrap, paddingTop: 120, paddingBottom: 160, textAlign: 'center' }}>
      <h1 style={{ fontSize: 48, fontWeight: 600 }}>404</h1>
      <a href="#/home" className="link-underline" style={{ color: T.blue, marginTop: 16,
        display: 'inline-block' }}>← Home</a>
    </div>
  );
}

function navLabel(c, id) {
  const n = c.nav.find(x => x.id === id);
  return n ? n.label : id;
}

const btnPrimary = { background: T.ink, color: T.ivory, padding: '13px 24px',
  fontSize: 14, borderRadius: 2, fontWeight: 500 };
const btnGhost = { color: T.ink, padding: '13px 16px', fontSize: 14, fontWeight: 500,
  border: `1px solid ${T.rule}`, borderRadius: 2 };

Object.assign(window, {
  HomePage, AboutPage, ResearchPage, ResearchDetailPage, ProjectsPage, PublicationsPage,
  Lightbox, NotFound, PageHead,
});
