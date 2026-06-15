import { motion } from 'framer-motion'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import styles from './About.module.css'

const pageVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const pageItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.23, ease: [0.16, 1, 0.3, 1] } },
}

const skills = [
  'Interaction Design',
  'Visual Design',
  'Information Architecture',
  'User Flows',
  'Wireframing',
  'Prototyping',
  'Usability Testing',
  'UX Writing',
  'User Research',
  'Design Systems',
  'Figma',
  'FigJam',
  'Accessibility',
  'AI & Agentic Workflows',
  'Claude Code',
  'Adobe CC',
  'Amplitude',
  'Miro',
  'Agile',
  'Jira',
  'Confluence',
]

const experience = [
  {
    role: 'Design Lead',
    company: 'IDT Technologies',
    location: 'Warsaw, Poland',
    period: '2024–Present',
    summary:
      'Leading a team in overhauling the design for a retail POS platform used by small businesses, including convenience stores, retail shops and restaurants',
  },
  {
    role: 'Senior UX/UI Designer',
    company: 'IDT Technologies',
    location: 'Warsaw, Poland',
    period: '2022–2024',
    summary:
      'Redesigned a global fintech money transfer (remittance) app, improving onboarding, transfers, top-ups, and account management',
  },
  {
    role: 'Middle UX/UI Designer',
    company: 'IDT Technologies',
    location: 'Warsaw, Poland',
    period: '2020–2022',
    summary: 'Designed UX flows for VoIP and text messaging app targeting US market',
  },
  {
    role: 'UI Designer',
    company: 'Huawei Technologies',
    location: 'Minsk, Belarus',
    period: '2019–2020',
    summary:
      'Led regional design support for marketing and corporate campaigns, delivered consistent brand experiences across platforms using global standards',
  },
  {
    role: 'Designer',
    company: 'Freelance Practice',
    location: '',
    period: '2010–Present',
    summary: 'End-to-end design services for startups and small businesses',
  },
  {
    role: 'In-House Designer',
    company: 'Fairview Health',
    location: 'Minneapolis, USA',
    period: '2008–2017',
    summary:
      'Created visual materials for healthcare campaigns, patient education, and internal communications',
  },
]

const education = [
  {
    institution: 'Minneapolis Community and Technical College',
    location: 'Minneapolis, USA',
    degree: 'Front-End Development Certificate',
  },
  {
    institution: 'Belarusian State Economic University',
    location: 'Minsk, Belarus',
    degree: "Bachelor's Degree in Accounting and Economics",
  },
]

export default function About() {
  return (
    <>
      <Header />

      <motion.main
        className={styles.main}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.heroLeft}>
              <motion.h1 variants={pageItem} className={styles.name}>Vadim Kovalenko</motion.h1>
              <motion.p variants={pageItem} className={styles.title}>Product Designer building fintech, communication, and retail products</motion.p>
            </div>
            <motion.div variants={pageItem} className={styles.heroContact}>
              <a
                href="https://www.linkedin.com/in/vadim-kovalenko-design/"
                className={styles.contactLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={`${import.meta.env.BASE_URL}VadimKovalenko_CV_2026.pdf`}
                className={styles.contactLink}
                download
              >
                Download CV (PDF)
              </a>
            </motion.div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.contentInner}>
            <motion.div variants={pageItem} className={styles.bio}>
              <h2 className={styles.sectionLabel}>About</h2>
              <p className={styles.bioText}>
                I&apos;m a product designer with 6+ years of experience in building fintech, communication,
                and retail products, built on a broader 15+ year design career across the U.S. and Europe.
              </p>
            </motion.div>

            <motion.div variants={pageItem} className={styles.skills}>
              <h2 className={styles.sectionLabel}>Skills</h2>
              <ul className={styles.skillList}>
                {skills.map((skill) => (
                  <li key={skill} className={styles.skillItem}>{skill}</li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={pageItem} className={styles.expSection}>
              <h2 className={styles.sectionLabel}>Experience</h2>
              <div className={styles.expList}>
                {experience.map((item) => (
                  <div key={`${item.role}-${item.period}`} className={styles.expItem}>
                    <div className={styles.expMeta}>
                      <span className={styles.expPeriod}>{item.period}</span>
                    </div>
                    <div className={styles.expBody}>
                      <h3 className={styles.expRole}>{item.role}</h3>
                      <span className={styles.expCompany}>
                        {item.company}{item.location ? ` · ${item.location}` : ''}
                      </span>
                      <p className={styles.expSummary}>{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={pageItem} className={styles.eduSection}>
              <h2 className={styles.sectionLabel}>Education</h2>
              <div className={styles.eduList}>
                {education.map((item) => (
                  <div key={item.institution} className={styles.eduItem}>
                    <div className={styles.expMeta}>
                      <span className={styles.expPeriod}>{item.location}</span>
                    </div>
                    <div className={styles.expBody}>
                      <h3 className={styles.expRole}>{item.institution}</h3>
                      <span className={styles.expCompany}>{item.degree}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        </section>
      </motion.main>

      <Footer />
    </>
  )
}
