import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import CaseCard from '../../components/CaseCard/CaseCard'
import CaseModal from '../../components/CaseModal/CaseModal'
import cases from '../../cases/index'
import styles from './Home.module.css'

const pageVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.04 } },
}

const pageItem = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.23, ease: [0.16, 1, 0.3, 1] } },
}

export default function Home() {
  const [activeCase, setActiveCase] = useState(null)

  return (
    <>
      <Header />

      <motion.main
        className={styles.main}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <section className={styles.intro}>
          <div className={styles.introInner}>
            <motion.h1 variants={pageItem} className={styles.introHeading}>
              Product Designer building fintech, communication, and retail products.
            </motion.h1>
          </div>
        </section>

        <section className={styles.work}>
          <div className={styles.workInner}>
            <motion.h2 variants={pageItem} className={styles.workLabel}>Selected Work</motion.h2>
            <motion.div variants={pageItem} className={styles.grid}>
              {cases.map((c, i) => (
                <CaseCard key={c.id} caseData={c} index={i} onClick={() => setActiveCase(c)} />
              ))}
            </motion.div>
          </div>
        </section>
      </motion.main>

      <Footer />

      <CaseModal caseData={activeCase} onClose={() => setActiveCase(null)} />
    </>
  )
}
