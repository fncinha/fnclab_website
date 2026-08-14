// lab-home.jsx — Home page variants A / B / C

// =========================================================================
// HOME A — Editorial / Type-led
// Large headline, generous whitespace, with subtle Inha blue accents.
// Includes stats, PI preview, news + recruit strip.
// =========================================================================
function HomeA({ c }) {
  return (
    <div className="fnc-page" style={{ background: T.ivory }}>
      <FNCNav c={c} active="home" />

      {/* Hero — split: lab name + intro left, research image right */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 56px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56,
          alignItems: 'center' }}>
          <div>
            <div style={{ width: 48, height: 3, background: T.blue, marginBottom: 28 }} />
            <div className="eyebrow" style={{ marginBottom: 24, color: T.blue }}>
              {c.hero.eyebrow}
            </div>
            <h1 className="home-hero-title" style={{
              fontSize: 76, lineHeight: 1.05, fontWeight: 500, letterSpacing: '-0.03em',
              marginBottom: 28,
            }}>
              {c.hero.title}
            </h1>
            <p style={{ maxWidth: 560, fontSize: 20, lineHeight: 1.6, color: T.ink70,
              marginBottom: 32 }}>
              {c.hero.subtitle}
            </p>
            <div style={{ display: 'flex', gap: 18, fontSize: 13, color: T.ink50,
              borderTop: `1px solid ${T.rule}`, paddingTop: 22, flexWrap: 'wrap' }} className="label">
              <span style={{ color: T.blue }}>● {c.contact.addressShort}</span>
              <span>{c.professor.email}</span>
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

      {/* Stats band — blue accent numbers */}
      <section style={{ borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`,
        background: T.paper }}>
        <div style={{ maxWidth: 1320, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{
              padding: '36px 40px',
              borderRight: i < c.stats.length - 1 ? `1px solid ${T.rule}` : 'none',
            }}>
              <div style={{ fontSize: 56, fontWeight: 400, letterSpacing: '-0.035em',
                color: T.blue, lineHeight: 1, marginBottom: 12 }}>
                {s.value}
              </div>
              <div className="label" style={{ fontSize: 12, color: T.ink50,
                textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research — image cards (3-col) */}
      <section id="research" style={{ background: T.ivory }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 56px 70px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <div className="eyebrow" style={{ color: T.blue, marginBottom: 8 }}>
                Research
              </div>
              <h2 style={{ fontSize: 36, fontWeight: 500, letterSpacing: '-0.022em' }}>
                연구 분야
              </h2>
            </div>
            <span className="mono" style={{ fontSize: 12, color: T.ink50 }}>
              0{c.research.length} areas
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {c.research.map((r, i) => (
              <div key={r.id} style={{
                background: T.paper, border: `1px solid ${T.rule}`,
                display: 'flex', flexDirection: 'column', overflow: 'hidden',
              }}>
                <LabImg src={r.img} label={r.title} ratio="16 / 10" bg={T.blueDeep} />
                <div style={{ padding: '24px 24px 26px', display: 'flex',
                  flexDirection: 'column', flex: 1 }}>
                  <div className="mono" style={{ fontSize: 11, color: T.blue, marginBottom: 12,
                    letterSpacing: '0.04em' }}>
                    /0{i + 1}
                  </div>
                  <h3 style={{ fontSize: 21, fontWeight: 500, letterSpacing: '-0.018em',
                    lineHeight: 1.25, marginBottom: 12 }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: T.ink70, lineHeight: 1.65,
                    marginBottom: 18, flex: 1 }}>
                    {r.body}
                  </p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {r.tags.map(t => (
                      <span key={t} className="mono" style={{
                        fontSize: 10, color: T.ink70,
                        border: `1px solid ${T.rule}`, padding: '3px 8px', borderRadius: 999,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities — image strip */}
      <section style={{ background: T.paper, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 56px' }}>
          <div className="eyebrow" style={{ color: T.blue, marginBottom: 8 }}>Facilities</div>
          <h2 style={{ fontSize: 30, fontWeight: 500, letterSpacing: '-0.022em',
            marginBottom: 36 }}>연구 시설 · 장비</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {(c.facilities || []).map((f, i) => (
              <div key={i}>
                <LabImg src={f.img} label={f.title} ratio="4 / 3" bg={T.blueDeep} />
                <h3 style={{ fontSize: 16, fontWeight: 500, letterSpacing: '-0.015em',
                  marginTop: 16, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13.5, color: T.ink70, lineHeight: 1.6 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PI preview — photo + info */}
      <section id="people" style={{ background: T.ivoryDeep, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 56px',
          display: 'grid', gridTemplateColumns: '300px 1fr 1fr', gap: 48, alignItems: 'start' }}>
          <div>
            <LabImg src={c.professor.photo} label="PROF" ratio="3 / 4" bg={T.blueDeep} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 56, height: 2, background: T.blue, marginBottom: 16 }} />
            <div className="eyebrow" style={{ color: T.blue, marginBottom: 14 }}>
              Principal Investigator
            </div>
            <h3 style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.028em',
              marginBottom: 6 }}>
              {c.professor.name}
            </h3>
            <div style={{ fontSize: 14, color: T.ink50, marginBottom: 22 }}>
              {c.professor.nameEn} · {c.professor.title}
            </div>
            <p style={{ fontSize: 16, color: T.ink70, lineHeight: 1.75 }}>
              {c.professor.bio}
            </p>
            <a href="#people" className="link-underline" style={{
              fontSize: 13, color: T.blue, marginTop: 22, display: 'inline-block',
            }}>구성원 전체 보기 →</a>
          </div>
          <div>
            <div className="eyebrow" style={{ color: T.ink50, marginBottom: 14 }}>Interests</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {c.professor.interests.map(i => (
                <div key={i} style={{
                  padding: '12px 14px', background: T.paper,
                  border: `1px solid ${T.rule}`,
                  fontSize: 13, letterSpacing: '-0.01em',
                }}>{i}</div>
              ))}
            </div>
            <div style={{ marginTop: 20, padding: '18px 20px',
              background: T.blue, color: '#fff', display: 'grid',
              gridTemplateColumns: 'auto 1fr', gap: '6px 16px', fontSize: 13 }}>
              <span className="mono" style={{ opacity: 0.7 }}>EMAIL</span>
              <span>{c.professor.email}</span>
              <span className="mono" style={{ opacity: 0.7 }}>OFFICE</span>
              <span>{c.professor.office}</span>
              <span className="mono" style={{ opacity: 0.7 }}>PHONE</span>
              <span className="mono">{c.professor.phone}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Research gallery — all PPT materials */}
      <GallerySection c={c} />

      {/* Projects */}
      <ProjectsSection c={c} />

      {/* Recent publications */}
      <section id="publications" style={{ background: T.ivory, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 56px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 40 }}>
            <div>
              <div className="eyebrow" style={{ color: T.blue, marginBottom: 8 }}>
                Recent Publications
              </div>
              <h2 style={{ fontSize: 30, fontWeight: 400, letterSpacing: '-0.022em' }}>
                최근 논문
              </h2>
            </div>
            <a href="#publications" className="link-underline" style={{ fontSize: 13, color: T.blue }}>
              See all →
            </a>
          </div>
          <div>
            {c.publications.slice(0, 5).map((p, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '70px 1fr 280px 100px',
                alignItems: 'baseline', gap: 24,
                padding: '22px 0', borderTop: `1px solid ${T.rule}`,
              }}>
                <span className="mono" style={{ fontSize: 13, color: T.blue,
                  letterSpacing: '0.02em' }}>{p.year}</span>
                <div>
                  <div style={{ fontSize: 18, marginBottom: 4, letterSpacing: '-0.015em' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 14, color: T.ink50 }}>{p.authors}</div>
                </div>
                <div style={{ fontSize: 13, fontStyle: 'italic', color: T.ink70 }}>{p.venue}</div>
                <div className="mono" style={{ fontSize: 11, color: T.ink50, textAlign: 'right' }}>
                  {p.type}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News + Recruit — two-column closer */}
      <section style={{ background: T.paper, borderTop: `1px solid ${T.rule}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '72px 56px',
          display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64 }}>
          {/* News */}
          <div>
            <div className="eyebrow" style={{ color: T.blue, marginBottom: 24 }}>News</div>
            {(c.news || []).map((n, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '80px 80px 1fr',
                alignItems: 'baseline', gap: 16,
                padding: '18px 0', borderTop: `1px solid ${T.rule}`,
              }}>
                <span className="mono" style={{ fontSize: 12, color: T.ink50 }}>{n.date}</span>
                <span className="mono" style={{ fontSize: 10, color: T.blue,
                  letterSpacing: '0.1em', textTransform: 'uppercase' }}>{n.tag}</span>
                <span style={{ fontSize: 15, letterSpacing: '-0.012em' }}>{n.title}</span>
              </div>
            ))}
          </div>
          {/* Recruit CTA */}
          <div id="recruit" style={{
            background: T.blueDeep, color: '#fff', padding: '40px 36px',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180,
              background: `repeating-linear-gradient(45deg, transparent 0 10px,
                rgba(255,255,255,0.05) 10px 11px)`, pointerEvents: 'none' }} />
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)', marginBottom: 18 }}>
              Recruit
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.022em',
              lineHeight: 1.2, marginBottom: 16 }}>
              {c.recruit.title}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)', lineHeight: 1.65,
              marginBottom: 28, maxWidth: 360 }}>
              {c.recruit.lead}
            </p>
            <a href="#recruit" className="mono link-underline" style={{
              fontSize: 13, color: '#fff',
            }}>{c.recruit.cta} →</a>
          </div>
        </div>
      </section>

      <FNCFooter c={c} />
    </div>
  );
}

// =========================================================================
// HOME B — Image-led / Magazine
// Full-bleed simulation hero, asymmetric grid, dark headline band.
// =========================================================================
function HomeB({ c }) {
  return (
    <div className="fnc-page" style={{ background: T.paper }}>
      <FNCNav c={c} active="home" variant="dark" />

      {/* Hero — full bleed image */}
      <section style={{ position: 'relative', background: T.blueDeep, color: '#fff' }}>
        <div style={{ height: 620, position: 'relative', overflow: 'hidden' }}>
          <img src={c.hero.image} alt="" style={{ position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }} />
          <div style={{ position: 'absolute', inset: 0,
            background: `linear-gradient(180deg, rgba(20,33,66,0.5) 0%, rgba(20,33,66,0.2) 45%, rgba(10,18,40,0.85) 100%)` }} />
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px',
            position: 'relative', height: '100%' }}>
            <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
              {c.hero.eyebrow}
            </div>
            <h1 style={{
              fontSize: 80, fontWeight: 500, lineHeight: 1.04, letterSpacing: '-0.032em',
              maxWidth: 980, color: '#fff',
            }}>
              {c.hero.title}
            </h1>
            {c.hero.imageCaption && (
              <div className="mono" style={{ position: 'absolute', bottom: 32, right: 56,
                fontSize: 11, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.65)' }}>
                FIG. — {c.hero.imageCaption}
              </div>
            )}
          </div>
        </div>

        {/* Intro band overlapping bottom of hero */}
        <div style={{ background: T.ivory, color: T.ink,
          maxWidth: 1100, margin: '-80px auto 0', padding: '56px 64px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.08)', position: 'relative', zIndex: 2 }}>
          <p style={{ fontSize: 22, lineHeight: 1.5, color: T.ink, letterSpacing: '-0.012em' }}>
            {c.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Research grid */}
      <section style={{ background: T.paper, padding: '120px 56px 80px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80, marginBottom: 56 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 16 }}>Research</div>
              <h2 style={{ fontSize: 44, fontWeight: 500, letterSpacing: '-0.025em' }}>
                연구 분야
              </h2>
            </div>
            <p style={{ fontSize: 17, color: T.ink70, alignSelf: 'end', lineHeight: 1.6 }}>
              {c.about.lead}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
            {c.research.map((r, i) => (
              <div key={r.id} style={{
                background: T.paper, border: `1px solid ${T.rule}`, overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                <LabImg src={r.img} label={r.title} ratio="16 / 10" bg={T.blueDeep} />
                <div style={{ padding: '28px 28px 30px', flex: 1,
                  display: 'flex', flexDirection: 'column' }}>
                  <div className="mono" style={{ fontSize: 11, color: T.blue, marginBottom: 16 }}>
                    /0{i + 1}
                  </div>
                  <h3 style={{ fontSize: 21, fontWeight: 500, marginBottom: 12,
                    letterSpacing: '-0.018em', lineHeight: 1.25 }}>
                    {r.title}
                  </h3>
                  <p style={{ fontSize: 14, color: T.ink70, lineHeight: 1.6, flex: 1 }}>{r.body}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 18 }}>
                    {r.tags.map(t => (
                      <span key={t} className="mono" style={{
                        fontSize: 10, color: T.ink50,
                      }}>· {t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects strip */}
      <section style={{ background: T.ivoryDeep, padding: '80px 56px', borderTop: `1px solid ${T.rule}` }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div className="eyebrow" style={{ marginBottom: 28 }}>Selected Projects</div>
          {c.projects.slice(0, 4).map((p, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '120px 1fr 200px 80px',
              alignItems: 'center', gap: 24,
              padding: '20px 0', borderTop: `1px solid ${T.rule}`,
            }}>
              <span className="mono" style={{ fontSize: 12, color: T.ink50 }}>{p.year}</span>
              <span style={{ fontSize: 17, letterSpacing: '-0.012em' }}>{p.title}</span>
              <span style={{ fontSize: 13, color: T.ink70 }}>{p.sponsor}</span>
              <span className="mono" style={{ fontSize: 11, color: T.blue, textAlign: 'right' }}>
                {p.role}
              </span>
            </div>
          ))}
        </div>
      </section>

      <FNCFooter c={c} />
    </div>
  );
}

// =========================================================================
// HOME C — Split / Data-forward
// Two-column hero, stats row, horizontal research index.
// =========================================================================
function HomeC({ c }) {
  return (
    <div className="fnc-page" style={{ background: T.ivory }}>
      <FNCNav c={c} active="home" />

      {/* Split hero */}
      <section style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 56px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 64, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 28 }}>
              {c.hero.eyebrow}
            </div>
            <h1 style={{
              fontSize: 72, fontWeight: 400, lineHeight: 1.04, letterSpacing: '-0.03em',
              marginBottom: 32,
            }}>
              {c.hero.title}
            </h1>
            <p style={{ fontSize: 18, color: T.ink70, maxWidth: 540, lineHeight: 1.6, marginBottom: 40 }}>
              {c.hero.subtitle}
            </p>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <a href="#research" style={{
                background: T.ink, color: T.ivory, padding: '12px 22px',
                fontSize: 13, borderRadius: 2,
              }}>Explore research →</a>
              <a href="#about" style={{
                color: T.ink, padding: '12px 8px', fontSize: 13,
              }} className="link-underline">About the lab</a>
            </div>
          </div>
          <div>
            <LabImg src={c.hero.image} label="CFD VISUALIZATION" height={520} bg={T.blueDeep} />
          </div>
        </div>
      </section>

      {/* Stats band */}
      <section style={{ borderTop: `1px solid ${T.rule}`, borderBottom: `1px solid ${T.rule}`,
        background: T.paper }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '36px 56px',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: T.rule }}>
          {c.stats.map((s, i) => (
            <div key={i} style={{ background: T.paper, padding: '12px 24px' }}>
              <div style={{ fontSize: 44, fontWeight: 400, letterSpacing: '-0.03em',
                color: T.blue, lineHeight: 1 }}>
                {s.value}
              </div>
              <div className="mono" style={{ fontSize: 11, color: T.ink50,
                textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Research — horizontal index */}
      <section id="research" style={{ padding: '100px 56px 80px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between',
            alignItems: 'baseline', marginBottom: 48 }}>
            <div>
              <div className="eyebrow" style={{ marginBottom: 8 }}>Research areas</div>
              <h2 style={{ fontSize: 38, fontWeight: 400, letterSpacing: '-0.025em' }}>
                What we work on.
              </h2>
            </div>
            <a className="link-underline" style={{ fontSize: 13 }}>Full research index →</a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 24 }}>
            {c.research.map((r, i) => (
              <div key={r.id} style={{
                padding: '24px 0', borderTop: `1px solid ${T.ink}`,
              }}>
                <div className="mono" style={{ fontSize: 11, color: T.ink50, marginBottom: 18 }}>
                  0{i + 1} / 0{c.research.length}
                </div>
                <h3 style={{ fontSize: 19, fontWeight: 500, marginBottom: 12,
                  letterSpacing: '-0.018em', lineHeight: 1.2 }}>
                  {r.title}
                </h3>
                <p style={{ fontSize: 13, color: T.ink70, lineHeight: 1.55 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured + Recent activity split */}
      <section style={{ background: T.paper, borderTop: `1px solid ${T.rule}`, padding: '80px 56px' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64 }}>
          {/* Featured project */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Featured project</div>
            <LabImg src={c.research[1].img} label="FEATURED" height={320} bg={T.blueDeep} />
            <h3 style={{ fontSize: 28, fontWeight: 400, letterSpacing: '-0.022em',
              marginTop: 28, marginBottom: 16 }}>
              {c.projects[0].title}
            </h3>
            <div style={{ display: 'flex', gap: 24, fontSize: 13, color: T.ink70 }} className="mono">
              <span>{c.projects[0].year}</span>
              <span>{c.projects[0].sponsor}</span>
              <span style={{ color: T.blue }}>{c.projects[0].role}</span>
            </div>
          </div>
          {/* Recent pubs */}
          <div>
            <div className="eyebrow" style={{ marginBottom: 16 }}>Recent publications</div>
            {c.publications.slice(0, 5).map((p, i) => (
              <div key={i} style={{ padding: '18px 0', borderTop: `1px solid ${T.rule}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="mono" style={{ fontSize: 11, color: T.ink50 }}>
                    {p.year} · {p.type}
                  </span>
                  <span style={{ fontSize: 11, color: T.ink50, fontStyle: 'italic' }}>{p.venue}</span>
                </div>
                <div style={{ fontSize: 15, letterSpacing: '-0.012em' }}>{p.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FNCFooter c={c} />
    </div>
  );
}

Object.assign(window, { HomeA, HomeB, HomeC });
