import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CaseDrawer.module.css'

function MetaBar({ meta }) {
  return (
    <ul className={styles.meta}>
      {meta.map(({ label, value }) => (
        <li key={label} className={styles.metaItem}>
          <span className={styles.metaLabel}>{label}</span>
          <span className={styles.metaValue}>{value}</span>
        </li>
      ))}
    </ul>
  )
}

function Feature({ feature }) {
  return (
    <section className={styles.feature}>
      <span className={styles.featureNumber}>{feature.number}</span>
      <h2 className={styles.featureTitle}>{feature.title}</h2>
      <p className={styles.featureDesc}>{feature.description}</p>

      {feature.image && (
        <figure className={styles.featureFigure}>
          <img src={feature.image} alt={feature.title} />
          {feature.imageCaption && (
            <figcaption className={styles.caption}>{feature.imageCaption}</figcaption>
          )}
        </figure>
      )}

      <div className={styles.problemWork}>
        <div>
          <h3 className={styles.pwLabel}>The problem</h3>
          <p className={styles.pwBody}>{feature.problem}</p>
        </div>
        <div>
          <h3 className={styles.pwLabel}>The work</h3>
          <p className={styles.pwBody}>{feature.work}</p>
        </div>
      </div>

      {feature.videoId && (
        <div className={styles.videoWrapper}>
          <iframe
            src={`https://www.youtube.com/embed/${feature.videoId}`}
            title={feature.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </section>
  )
}

export default function CaseDrawer({ caseData, onClose }) {
  useEffect(() => {
    if (!caseData) return
    document.body.style.overflow = 'hidden'
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKey)
    }
  }, [caseData, onClose])

  return (
    <AnimatePresence>
      {caseData && (
        <>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.div
            className={styles.drawer}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className={styles.drawerInner}>
              <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                <span className={styles.closeIcon}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
                <span>Back</span>
              </button>

              {/* Header */}
              <header className={styles.caseHeader}>
                {caseData.tags && (
                  <ul className={styles.tags}>
                    {caseData.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <h1 className={styles.title}>{caseData.subtitle || caseData.title}</h1>
              </header>

              {/* Meta bar */}
              {caseData.meta && <MetaBar meta={caseData.meta} />}

              {/* Intro description */}
              {caseData.intro && (
                <p className={styles.intro}>
                  {caseData.title && caseData.intro.startsWith(caseData.title)
                    ? <><strong>{caseData.title}</strong>{caseData.intro.slice(caseData.title.length)}</>
                    : caseData.intro}
                </p>
              )}

              {/* Context + Approach */}
              {(caseData.context || caseData.approach) && (
                <div className={styles.contextApproach}>
                  {caseData.context && (
                    <div>
                      <h3 className={styles.colLabel}>Context</h3>
                      <p className={styles.colBody}>{caseData.context}</p>
                    </div>
                  )}
                  {caseData.approach && (
                    <div>
                      <h3 className={styles.colLabel}>Approach</h3>
                      <p className={styles.colBody}>{caseData.approach}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Features */}
              {caseData.features && caseData.features.map((f) => (
                <Feature key={f.number} feature={f} />
              ))}

              {/* Fallback: legacy sections array */}
              {!caseData.features && caseData.sections && caseData.sections.map((section, i) => (
                <section key={i} className={styles.section}>
                  {section.heading && <h2 className={styles.sectionHeading}>{section.heading}</h2>}
                  {section.body && <p className={styles.sectionBody}>{section.body}</p>}
                  {section.image && (
                    <figure className={styles.featureFigure}>
                      <img src={section.image} alt={section.heading || ''} />
                      {section.imageCaption && (
                        <figcaption className={styles.caption}>{section.imageCaption}</figcaption>
                      )}
                    </figure>
                  )}
                  {section.videoId && (
                    <div className={styles.videoWrapper}>
                      <iframe
                        src={`https://www.youtube.com/embed/${section.videoId}`}
                        title={section.heading || caseData.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </section>
              ))}

              {/* Retrospective — always last */}
              {caseData.retrospective && (
                <div className={styles.retro}>
                  <h2 className={styles.retroHeading}>Retrospective</h2>
                  <p className={styles.retroBody}>{caseData.retrospective}</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
