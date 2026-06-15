import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './CaseModal.module.css'

const ease = [0.16, 1, 0.3, 1]

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.24 } },
  exit:   { opacity: 0, transition: { duration: 0.20 } },
}

const modalVariants = {
  hidden: {
    opacity: 0,
    rotateX: 90,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.36,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
  exit: {
    opacity: 0,
    rotateX: 90,
    transition: { duration: 0.14, ease: [0.55, 0, 1, 0.45] },
  },
}

const contentVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.32 } },
}

const item = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.46, ease } },
}

function MetaBar({ meta }) {
  return (
    <motion.ul variants={item} className={styles.meta}>
      {meta.map(({ label, value }) => (
        <li key={label} className={styles.metaItem}>
          <span className={styles.metaLabel}>{label}</span>
          <span className={styles.metaValue}>{value}</span>
        </li>
      ))}
    </motion.ul>
  )
}

function Feature({ feature }) {
  return (
    <motion.section variants={item} className={styles.feature}>
      {feature.number && <span className={styles.featureNumber}>{feature.number}</span>}
      <h2 className={styles.featureTitle}>{feature.title}</h2>
      <p className={styles.featureDesc}>{feature.description}</p>

      {feature.image && (
        feature.imageLayout === 'overlay' ? (
          <div className={styles.overlayContainer}>
            <img src={feature.image} alt={feature.title} className={styles.overlayImage} />
            {feature.imageCaption && (
              <div className={styles.featureCaptionOverlay}>
                <p className={styles.featureCaptionOverlayText}>{feature.imageCaption}</p>
              </div>
            )}
          </div>
        ) : (
          <figure className={styles.featureFigure}>
            <img src={feature.image} alt={feature.title} />
            {feature.imageCaption && (
              <figcaption className={styles.caption}>{feature.imageCaption}</figcaption>
            )}
          </figure>
        )
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
    </motion.section>
  )
}

export default function CaseModal({ caseData, onClose }) {
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
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{ transformOrigin: 'center center' }}
          >
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <motion.div
              className={`${styles.content}${caseData.logo && !caseData.logoWide ? ' ' + styles.contentWithSquircle : ''}${caseData.logoWide ? ' ' + styles.contentWithWideLogo : ''}`}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {/* App logo — absolutely positioned top-right */}
              {caseData.logo && (
                <motion.img
                  variants={item}
                  src={caseData.logo}
                  alt={caseData.title}
                  className={`${styles.caseLogo}${caseData.logoWide ? ' ' + styles.caseLogoWide : ''}`}
                />
              )}

              {/* Tags + Title */}
              <motion.header variants={item} className={styles.caseHeader}>
                {caseData.tags && (
                  <ul className={styles.tags}>
                    {caseData.tags.map((tag) => (
                      <li key={tag} className={styles.tag}>{tag}</li>
                    ))}
                  </ul>
                )}
                <h1 className={styles.title}>{caseData.subtitle || caseData.title}</h1>
              </motion.header>

              {/* Meta bar */}
              {caseData.meta && <MetaBar meta={caseData.meta} />}

              {/* Intro — split (text+context left, image right) or stacked */}
              {caseData.splitIntro ? (
                <motion.div variants={item} className={`${styles.introSplit}${caseData.introImageSmall ? ' ' + styles.introSplitSmall : ''}`}>
                  {caseData.introImageSmall ? (
                    // Small hero: phone floats right first (float must precede wrapping text in DOM)
                    <>
                      {caseData.introImage && (
                        <figure className={styles.introSplitRight}>
                          {caseData.introBgImage && (
                            <img src={caseData.introBgImage} alt="" aria-hidden="true" className={styles.introBgImg} />
                          )}
                          <img src={caseData.introImage.src} alt={caseData.introImage.caption || ''} className={styles.introFgImg} />
                          {caseData.introImage.caption && (
                            <figcaption className={styles.caption}>{caseData.introImage.caption}</figcaption>
                          )}
                        </figure>
                      )}
                      <div className={styles.introSplitLeftFull}>
                        {caseData.intro && (
                          <p className={styles.intro}>
                            {caseData.title && caseData.intro.startsWith(caseData.title)
                              ? <><strong>{caseData.title}</strong>{caseData.intro.slice(caseData.title.length)}</>
                              : caseData.intro}
                          </p>
                        )}
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
                        {caseData.tools && (
                          <div className={styles.toolsRow}>
                            {caseData.tools.map((tool) => (
                              <img key={tool.name} src={tool.icon} alt={tool.name} title={tool.name} className={styles.toolIcon} />
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    // Standard split: intro top-left, hero right spanning 2 rows, context/tools bottom-left
                    <>
                      <div className={styles.introSplitLeft}>
                        {caseData.intro && (
                          <p className={styles.intro}>
                            {caseData.title && caseData.intro.startsWith(caseData.title)
                              ? <><strong>{caseData.title}</strong>{caseData.intro.slice(caseData.title.length)}</>
                              : caseData.intro}
                          </p>
                        )}
                      </div>
                      {caseData.introImage && (
                        <figure className={styles.introSplitRight}>
                          <img src={caseData.introImage.src} alt={caseData.introImage.caption || ''} />
                          {caseData.introImage.caption && (
                            <figcaption className={styles.caption}>{caseData.introImage.caption}</figcaption>
                          )}
                        </figure>
                      )}
                      <div className={styles.introSplitBelow}>
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
                        {caseData.tools && (
                          <div className={styles.toolsRow}>
                            {caseData.tools.map((tool) => (
                              <img key={tool.name} src={tool.icon} alt={tool.name} title={tool.name} className={styles.toolIcon} />
                            ))}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              ) : (
                <>
                  {caseData.intro && (
                    <motion.p variants={item} className={styles.intro}>
                      {caseData.title && caseData.intro.startsWith(caseData.title)
                        ? <><strong>{caseData.title}</strong>{caseData.intro.slice(caseData.title.length)}</>
                        : caseData.intro}
                    </motion.p>
                  )}
                  {caseData.introImage && (
                    <motion.figure variants={item} className={styles.introFigure}>
                      <img src={caseData.introImage.src} alt={caseData.introImage.caption || ''} />
                      {caseData.introImage.caption && (
                        <figcaption className={styles.caption}>{caseData.introImage.caption}</figcaption>
                      )}
                    </motion.figure>
                  )}
                  {(caseData.context || caseData.approach) && (
                    <motion.div
                      variants={item}
                      className={`${styles.contextApproach}${!caseData.approach ? ' ' + styles.contextSingle : ''}`}
                    >
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
                    </motion.div>
                  )}
                </>
              )}

              {/* Tool icons — rendered inside introSplitLeft when splitIntro, otherwise here */}
              {caseData.tools && !caseData.splitIntro && (
                <motion.div variants={item} className={styles.toolsRow}>
                  {caseData.tools.map((tool) => (
                    <img key={tool.name} src={tool.icon} alt={tool.name} title={tool.name} className={styles.toolIcon} />
                  ))}
                </motion.div>
              )}

              {/* Features (zendit schema) */}
              {caseData.features && caseData.features.map((f) => (
                <Feature key={f.title} feature={f} />
              ))}

              {/* Sections (boss money / legacy schema) */}
              {!caseData.features && caseData.sections && caseData.sections.map((section, i) => (
                <motion.section variants={item} key={i} className={`${styles.section}${section.layout === 'img-left-text-right' ? ' ' + styles.sectionTight : ''}`}>
                  {section.layout === 'two-col-header' ? (
                    <>
                      <div className={styles.twoColHeader}>
                        <h2 className={styles.twoColHeading}>{section.heading}</h2>
                        <div className={styles.twoColBody}>
                          {section.body && (
                            Array.isArray(section.body)
                              ? section.body.map((para, j) => <p key={j}>{para}</p>)
                              : <p>{section.body}</p>
                          )}
                        </div>
                      </div>
                      {section.image && (
                        <figure className={styles.featureFigure}>
                          <img src={section.image} alt={section.heading || ''} />
                          {section.imageCaption && (
                            <figcaption className={styles.caption}>{section.imageCaption}</figcaption>
                          )}
                        </figure>
                      )}
                    </>
                  ) : section.layout === 'overlay' ? (
                    <>
                      <div className={styles.overlayContainer}>
                        <picture>
                          {section.imageMobile && (
                            <source srcSet={section.imageMobile} media="(max-width: 860px)" />
                          )}
                          <img src={section.image} alt={section.heading || ''} className={styles.overlayImage} />
                        </picture>
                        <div className={styles.overlayText}>
                          {section.heading && <h2 className={styles.overlayHeading}>{section.heading}</h2>}
                          {section.body && (
                            Array.isArray(section.body)
                              ? section.body.map((para, j) => <p key={j} className={styles.overlayBody}>{para}</p>)
                              : <p className={styles.overlayBody}>{section.body}</p>
                          )}
                        </div>
                      </div>
                      {section.imageCaption && (
                        <p className={styles.caption}>{section.imageCaption}</p>
                      )}
                    </>
                  ) : section.layout === 'text-left-img-right' ? (
                    <div className={styles.textLeftImgRightCols}>
                      <div className={styles.textLeftImgRightLeft}>
                        {section.heading && (
                          <h2 className={styles.sectionHeading}>{section.heading}</h2>
                        )}
                        {section.body && (
                          Array.isArray(section.body)
                            ? section.body.map((para, j) => <p key={j} className={styles.sectionBody}>{para}</p>)
                            : <p className={styles.sectionBody}>{section.body}</p>
                        )}
                      </div>
                      <div className={styles.textLeftImgRightRight}>
                        {section.image && (
                          <img src={section.image} alt={section.heading || ''} />
                        )}
                        {section.imageCaption && (
                          <p className={styles.caption}>{section.imageCaption}</p>
                        )}
                      </div>
                    </div>
                  ) : section.layout === 'img-left-text-right' ? (
                    <div className={styles.imgLeftTextRightCols}>
                      <div className={styles.imgLeftTextRightLeft}>
                        {section.image && (
                          <img src={section.image} alt={section.heading || ''} />
                        )}
                        {section.imageCaption && (
                          <p className={styles.caption}>{section.imageCaption}</p>
                        )}
                      </div>
                      <div className={styles.imgLeftTextRightRight}>
                        {section.heading && (
                          <h2 className={styles.sectionHeading}>{section.heading}</h2>
                        )}
                        {section.body && (
                          Array.isArray(section.body)
                            ? section.body.map((para, j) => <p key={j} className={styles.sectionBody}>{para}</p>)
                            : <p className={styles.sectionBody}>{section.body}</p>
                        )}
                        {section.steps && (
                          <ol className={styles.stepsList}>
                            {section.steps.map((step, j) => (
                              <li key={j} className={styles.stepItem}>
                                <img src={step.icon} alt={`Step ${j + 1}`} className={styles.stepIcon} />
                                <p className={styles.stepText}>{step.text}</p>
                              </li>
                            ))}
                          </ol>
                        )}
                      </div>
                    </div>
                  ) : section.layout === 'info-grid' ? (
                    <div className={styles.infoGridCard}>
                      <div className={styles.infoGrid}>
                        {section.cells.map((cell, j) => (
                          <div key={j} className={styles.infoCell}>
                            <h3 className={styles.infoCellLabel}>{cell.label}</h3>
                            <p className={styles.infoCellBody}>{cell.body}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : section.layout === 'two-media' ? (
                    <div className={styles.twoMedia}>
                      <div className={styles.twoMediaItem}>
                        {section.image
                          ? <img src={section.image} alt={section.imageCaption || ''} className={styles.twoMediaImg} />
                          : <div className={styles.twoMediaPlaceholder} />}
                        {section.imageCaption && <p className={styles.twoMediaCaption}>{section.imageCaption}</p>}
                      </div>
                      <div className={styles.twoMediaItem}>
                        {section.image2
                          ? <img src={section.image2} alt={section.imageCaption2 || ''} className={styles.twoMediaImg} />
                          : <div className={styles.twoMediaPlaceholder} />}
                        {section.imageCaption2 && <p className={styles.twoMediaCaption}>{section.imageCaption2}</p>}
                      </div>
                    </div>
                  ) : section.layout === 'two-col-body' ? (
                    <>
                      {section.heading && (
                        <h2 className={styles.sectionHeading}>{section.heading}</h2>
                      )}
                      {section.body && Array.isArray(section.body) && (
                        <div className={styles.twoColBodyGrid}>
                          {section.body.map((para, j) => (
                            <p key={j} className={styles.twoColBodyCol}>{para}</p>
                          ))}
                        </div>
                      )}
                      {section.image && (
                        <figure className={styles.featureFigure}>
                          <img src={section.image} alt={section.heading || ''} />
                          {section.imageCaption && (
                            <figcaption className={styles.caption}>{section.imageCaption}</figcaption>
                          )}
                        </figure>
                      )}
                    </>
                  ) : (
                    <>
                      {section.heading && (
                        <h2 className={styles.sectionHeading}>{section.heading}</h2>
                      )}
                      {section.body && (
                        Array.isArray(section.body)
                          ? section.body.map((para, j) => <p key={j} className={styles.sectionBody}>{para}</p>)
                          : <p className={styles.sectionBody}>{section.body}</p>
                      )}
                      {section.image && (
                        (section.image2 || section.image3) ? (
                          <>
                            <figure className={styles.imageStack}>
                              <img src={section.image} alt={section.heading || ''} />
                              {section.image2 && <img src={section.image2} alt="" />}
                              {section.image3 && <img src={section.image3} alt="" />}
                            </figure>
                            {section.imageCaption && (
                              <p className={styles.caption}>{section.imageCaption}</p>
                            )}
                          </>
                        ) : (
                          <figure className={styles.featureFigure}>
                            <img
                              src={section.image}
                              alt={section.heading || ''}
                              className={section.imageSmall ? styles.featureImgSmall : undefined}
                            />
                            {section.imageCaption && (
                              <figcaption className={styles.caption}>{section.imageCaption}</figcaption>
                            )}
                          </figure>
                        )
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
                    </>
                  )}
                </motion.section>
              ))}

              {/* Retrospective */}
              {caseData.retrospective && (
                <motion.div variants={item} className={styles.retro}>
                  <h2 className={styles.retroHeading}>Retrospective</h2>
                  <p className={styles.retroBody}>{caseData.retrospective}</p>
                  {caseData.retroUrl && (
                    <a
                      href={`https://${caseData.retroUrl}`}
                      className={styles.retroLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {caseData.retroUrl}
                    </a>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
