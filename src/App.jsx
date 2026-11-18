import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import {
  Menu, X, Download, Github, Mail, Phone, GraduationCap, Code2, Database, FileText,
  Award, Languages, Users, FolderGit2, ArrowDown, Globe, Palette, Braces, Server, Sparkles, Heart,
} from 'lucide-react'
import { profile, education, skills, projects, certifications, softSkills, languages } from './data.js'

const icons = { HTML5: Globe, CSS3: Palette, JavaScript: Braces, PHP: Server, MySQL: Database, 'Microsoft Office': FileText }
const roles = ['building websites', 'designing databases', 'solving problems', 'learning something new']
const links = ['About', 'Education', 'Skills', 'Projects', 'Certifications', 'Contact']

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease: 'easeOut' } }),
}
const view = { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '-60px' } }

function Typewriter({ words }) {
  const [i, setI] = useState(0)
  const [txt, setTxt] = useState('')
  const [del, setDel] = useState(false)
  useEffect(() => {
    const w = words[i % words.length]
    let delay = del ? 40 : 85
    if (!del && txt === w) delay = 1500
    if (del && txt === '') delay = 300
    const t = setTimeout(() => {
      if (!del && txt === w) setDel(true)
      else if (del && txt === '') { setDel(false); setI(i + 1) }
      else setTxt(del ? w.slice(0, txt.length - 1) : w.slice(0, txt.length + 1))
    }, delay)
    return () => clearTimeout(t)
  }, [txt, del, i, words])
  return <span className="typed-text">{txt}<i className="caret" /></span>
}

function Section({ id, icon: Icon, title, children }) {
  return (
    <section id={id} className="section">
      <motion.div className="container" {...view} variants={fade}>
        <h2 className="section-title"><Icon size={26} /> {title}</h2>
        {children}
      </motion.div>
    </section>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on)
    return () => window.removeEventListener('scroll', on)
  }, [])

  return (
    <>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <header className={`nav ${scrolled ? 'nav-solid' : ''}`}>
        <div className="container nav-inner">
          <a href="#home" className="logo">{profile.initials}</a>
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)}>{l}</a>
            ))}
          </nav>
          <button className="menu-btn" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <span className="shape s1" /><span className="shape s2" /><span className="shape s3" /><span className="shape s4" />
          <div className="container hero-grid">
            <motion.div initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.12 } } }}>
              <motion.p variants={fade} className="hello"><Sparkles size={16} /> Hello, I'm</motion.p>
              <motion.h1 variants={fade}>{profile.name}</motion.h1>
              <motion.p variants={fade} className="typed">I enjoy <Typewriter words={roles} /></motion.p>
              <motion.h3 variants={fade} className="gradient-text">{profile.title}</motion.h3>
              <motion.p variants={fade} className="lead">
                A detail-oriented HNDIT student with a solid foundation in software development and IT support, looking for a real-world Industrial Training placement.
              </motion.p>
              <motion.div variants={fade} className="cta">
                <a className="btn primary" href="#contact"><Mail size={18} /> Contact me</a>
                <a className="btn ghost" href={profile.cv} download><Download size={18} /> Download CV</a>
                <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub</a>
              </motion.div>
            </motion.div>
            <motion.div className="avatar-wrap" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
              <div className="avatar-ring" />
              <div className="avatar">
  <img
    src="/profile.jpg"
    alt="Hasini Buddhika Nawarathna"
    width="360"
    height="360"
    decoding="async"
    className="profile-photo"
  />
</div>
              <motion.div className="chip c1" animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}><Code2 size={16} /> Software Development</motion.div>
              <motion.div className="chip c3" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 6 }}><Heart size={16} /> Teamwork</motion.div>
              <motion.div className="chip c2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}><Database size={16} /> MySQL</motion.div>
            </motion.div>
          </div>
          <a href="#about" className="scroll-hint" aria-label="Scroll down"><ArrowDown /></a>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...skills, ...skills, ...skills, ...skills].map((s, k) => <span key={k}><Sparkles size={16} /> {s.name}</span>)}
          </div>
        </div>

        <Section id="about" icon={Users} title="About Me">
          <div className="glass about">
            <p>{profile.summary}</p>
            <div className="facts">
              <div><strong>HNDIT</strong><span>SLIATE - ATI, Trincomalee</span></div>
              <div><strong>2024 - 2027</strong><span>Current programme</span></div>
              <div><strong>Goal</strong><span>Industrial Training</span></div>
            </div>
          </div>
        </Section>

        <Section id="education" icon={GraduationCap} title="Education">
          <div className="timeline">
            {education.map((e, i) => (
              <motion.div key={i} className="t-item" {...view} variants={fade} custom={i}>
                <span className="dot" />
                <div className="glass t-card">
                  <span className="period">{e.period}</span>
                  <h4>{e.title}</h4>
                  {e.place && <p className="muted">{e.place}</p>}
                  <ul className="tags">{e.details.map((d) => <li key={d}>{d}</li>)}</ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="skills" icon={Code2} title="Technical Skills">
          <div className="grid skills">
            {skills.map((s, i) => {
              const Icon = icons[s.name] || Code2
              return (
                <motion.div key={s.name} className="glass skill" {...view} variants={fade} custom={i} whileHover={{ y: -8, scale: 1.03 }}>
                  <div className="icon"><Icon size={26} /></div>
                  <h4>{s.name}</h4>
                  <p className="muted">{s.note}</p>
                </motion.div>
              )
            })}
          </div>
        </Section>

        <Section id="projects" icon={FolderGit2} title="Projects">
          <div className="grid projects">
            {projects.map((p, i) => (
              <motion.article key={p.title} className="glass project" {...view} variants={fade} custom={i} whileHover={{ y: -6 }}>
                <div className="icon"><FolderGit2 size={26} /></div>
                <h3>{p.title}</h3>
                <ul>{p.points.map((pt) => <li key={pt}>{pt}</li>)}</ul>
                {p.tech.length > 0 && <ul className="tags">{p.tech.map((t) => <li key={t}>{t}</li>)}</ul>}
                <a className="link" href={profile.github} target="_blank" rel="noreferrer"><Github size={16} /> View on GitHub</a>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="certifications" icon={Award} title="Certifications">
          <div className="grid certs">
            {certifications.map((c, i) => (
              <motion.div key={c.name} className="glass cert" {...view} variants={fade} custom={i}>
                <Award size={28} className="gold" />
                <h4>{c.name}</h4>
                <p className="muted">{c.issuer}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <section className="section tight">
          <div className="container two-col">
            <motion.div {...view} variants={fade}>
              <h2 className="section-title"><Users size={26} /> Soft Skills</h2>
              <ul className="tags big">{softSkills.map((s) => <li key={s}>{s}</li>)}</ul>
            </motion.div>
            <motion.div {...view} variants={fade} custom={1}>
              <h2 className="section-title"><Languages size={26} /> Languages</h2>
              {languages.map((l) => (
                <div key={l.name} className="lang">
                  <div className="lang-head"><strong>{l.name}</strong><span className="muted">{l.level}</span></div>
                  <div className="meter"><motion.div className="fill" initial={{ width: 0 }} whileInView={{ width: `${l.pct}%` }} viewport={{ once: true }} transition={{ duration: 1.2, ease: 'easeOut' }} /></div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Section id="contact" icon={Mail} title="Contact">
          <div className="glass contact">
            <p className="lead">I'm open to Industrial Training opportunities. Get in touch and let's talk.</p>
            <div className="contact-links">
              <a href={`mailto:${profile.email}`}><Mail /> {profile.email}</a>
              <a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone /> {profile.phone}</a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github /> GitHub profile</a>
            </div>
            <a className="btn primary" href={profile.cv} download><Download size={18} /> Download CV</a>
          </div>
        </Section>
      </main>

      <footer className="footer">Made with <Heart size={14} className="heart" /> © {new Date().getFullYear()} {profile.name}</footer>
    </>
  )
}
