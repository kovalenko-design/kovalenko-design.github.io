import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../Footer/Footer'
import styles from './CaseModal.module.css'

// A short screen recording that plays like a moving image: silent, looping, no player chrome.
// It plays only while visible. A click opens it full screen, where the native controls appear.
// A small button pauses it: a clip the viewer paused stays paused until they press play.
// With reduced motion it stays still and shows native controls in place.
function Clip({ src, poster, label, caption }) {
  const ref = useRef(null)
  const held = useRef(false)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [fullscreen, setFullscreen] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video || reduceMotion) return undefined
    // Play once at least 45% of the clip is on screen, not counting the bottom 15% of the screen,
    // so a clip does not start while it is only just peeking in at the bottom. Pause when it drops below that.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.45) {
          if (!held.current) video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.45, rootMargin: '0px 0px -15% 0px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  useEffect(() => {
    const video = ref.current
    if (!video) return undefined
    const isFull = () => document.fullscreenElement === video || document.webkitFullscreenElement === video
    const onFullscreen = () => setFullscreen(isFull())
    // Pausing or playing with the native controls in full screen counts as the viewer's choice too.
    const onPlay = () => {
      setPlaying(true)
      if (isFull()) held.current = false
    }
    const onPause = () => {
      setPlaying(false)
      if (isFull()) held.current = true
    }
    document.addEventListener('fullscreenchange', onFullscreen)
    document.addEventListener('webkitfullscreenchange', onFullscreen)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreen)
      document.removeEventListener('webkitfullscreenchange', onFullscreen)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
    }
  }, [])

  const openFullscreen = () => {
    const video = ref.current
    if (!video) return
    if (video.requestFullscreen) video.requestFullscreen().catch(() => {})
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen()
    else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen() // iPhone
    video.play().catch(() => {})
  }

  const togglePlay = () => {
    const video = ref.current
    if (!video) return
    if (video.paused) {
      held.current = false
      video.play().catch(() => {})
    } else {
      held.current = true
      video.pause()
    }
  }

  const restart = () => {
    const video = ref.current
    if (!video) return
    held.current = false
    video.currentTime = 0
    video.play().catch(() => {})
  }

  return (
    <figure className={styles.clipFigure}>
      <div className={styles.clipWrapper}>
        <video
          ref={ref}
          className={styles.clip}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          controls={reduceMotion || fullscreen}
          aria-label={label}
          onClick={reduceMotion ? undefined : openFullscreen}
        />
        {!reduceMotion && (
          <div className={`${styles.clipControls}${playing ? '' : ` ${styles.clipControlsShown}`}`}>
            <div className={styles.clipControlsGroup}>
              <button type="button" className={styles.clipButton} onClick={restart} aria-label={`Restart ${label}`}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
              </button>
              <button type="button" className={styles.clipButton} onClick={togglePlay} aria-label={`${playing ? 'Pause' : 'Play'} ${label}`}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {playing ? <path d="M8 5v14M16 5v14" /> : <path d="M8 5l11 7-11 7z" fill="currentColor" />}
                </svg>
              </button>
            </div>
            <button type="button" className={styles.clipButton} onClick={openFullscreen} aria-label={`View ${label} full screen`}>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" />
              </svg>
            </button>
          </div>
        )}
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

// A row of slides the viewer scrolls or swipes sideways. Each slide snaps into place and the next one peeks in,
// so it is clear there is more. The buttons and the dots follow the scroll position.
function Carousel({ slides, label }) {
  const trackRef = useRef(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    const onScroll = () => {
      let nearest = 0
      let best = Infinity
      Array.from(track.children).forEach((slide, i) => {
        const distance = Math.abs(slide.offsetLeft - track.scrollLeft)
        if (distance < best) {
          best = distance
          nearest = i
        }
      })
      setIndex(nearest)
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => track.removeEventListener('scroll', onScroll)
  }, [])

  const goTo = (target) => {
    const track = trackRef.current
    const slide = track && track.children[target]
    if (!slide) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className={styles.carousel}>
      <div
        ref={trackRef}
        className={styles.carouselTrack}
        role="region"
        aria-roledescription="carousel"
        aria-label={label}
        tabIndex={0}
      >
        {slides.map((slide, i) => (
          <figure
            key={i}
            className={styles.carouselSlide}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <div className={styles.carouselCard}>
              <img src={slide.image} alt={slide.caption || ''} />
            </div>
            {slide.caption && <figcaption className={styles.caption}>{slide.caption}</figcaption>}
          </figure>
        ))}
      </div>
      <div className={styles.carouselNav}>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous screen"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <div className={styles.carouselDots}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={styles.carouselDot}
              onClick={() => goTo(i)}
              aria-label={`Go to screen ${i + 1} of ${slides.length}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          className={styles.carouselButton}
          onClick={() => goTo(index + 1)}
          disabled={index === slides.length - 1}
          aria-label="Next screen"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

// Two images side by side on a grey card, each with its own caption underneath.
// "framed" adds padding and gaps so images that carry their own edges (cards, dialogs) are not cut off.
// A screen recording that stands in for an animated GIF: silent, looping, no controls.
// It plays only while it is on screen, and stays still with reduced motion.
function LoopVideo({ src, className, label }) {
  const ref = useRef(null)
  const [reduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const video = ref.current
    if (!video || reduceMotion) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [reduceMotion])

  return (
    <video
      ref={ref}
      src={src}
      className={className}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : 'true'}
      muted
      loop
      playsInline
      preload="metadata"
    />
  )
}

// A picture or, when the file is a video, a looping video. Both take the same class, so they lay out the same.
function Media({ src, alt, className }) {
  if (/\.mp4(\?|$)/.test(src)) return <LoopVideo src={src} className={className} label={alt} />
  return <img src={src} alt={alt} className={className} />
}

function MediaPair({ items, framed }) {
  return (
    <div className={`${styles.twoMedia}${framed ? ` ${styles.twoMediaFramed}` : ''}`}>
      {items.map((media, i) => (
        <div key={i} className={styles.twoMediaItem}>
          {media.image
            ? <Media src={media.image} alt={media.caption || ''} className={styles.twoMediaImg} />
            : <div className={styles.twoMediaPlaceholder} />}
          {media.caption && <p className={styles.twoMediaCaption}>{media.caption}</p>}
        </div>
      ))}
    </div>
  )
}

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

      {feature.clip && <Clip src={feature.clip.src} poster={feature.clip.poster} label={feature.title} caption={feature.clip.caption} />}
      {!feature.clip && feature.videoId && (
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
  const [copied, setCopied] = useState(false)
  // A case opened from a shared link shows at once, with no entry animation.
  const [openedOnLoad, setOpenedOnLoad] = useState(Boolean(caseData))
  if (!caseData && openedOnLoad) setOpenedOnLoad(false)
  const startState = openedOnLoad ? false : 'hidden'

  const copyLink = async () => {
    const url = `${window.location.origin}/${caseData.id}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      // Older browsers: copy through a temporary text field.
      const field = document.createElement('textarea')
      field.value = url
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setCopied(true)
  }

  useEffect(() => {
    if (!copied) return undefined
    const timer = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(timer)
  }, [copied])

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
          initial={startState}
          animate="visible"
          exit="exit"
          onClick={onClose}
          style={{ perspective: '1400px' }}
        >
          <motion.div
            className={styles.modal}
            variants={modalVariants}
            initial={startState}
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            style={{ transformOrigin: 'center center' }}
          >
            <button className={styles.copyBtn} onClick={copyLink} aria-label="Copy link to this case">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            {copied && <span className={styles.copyToast} role="status">Link copied</span>}
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <motion.div
              className={`${styles.content}${caseData.logo && !caseData.logoWide ? ' ' + styles.contentWithSquircle : ''}${caseData.logoWide ? ' ' + styles.contentWithWideLogo : ''}`}
              variants={contentVariants}
              initial={startState}
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
                  {section.layout === 'section-intro' ? (
                    <div className={styles.sectionIntro}>
                      {section.heading && (
                        <h2 className={styles.title}>{section.heading}</h2>
                      )}
                      {section.meta && (
                        <ul className={styles.meta}>
                          {section.meta.map(({ label, value }) => (
                            <li key={label} className={styles.metaItem}>
                              <span className={styles.metaLabel}>{label}</span>
                              <span className={styles.metaValue}>{value}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className={styles.introSplit}>
                        <div className={styles.introSplitLeft}>
                          {section.body && <p className={styles.intro}>{section.body}</p>}
                        </div>
                        {section.introImage && (
                          <figure className={styles.introSplitRight}>
                            <img src={section.introImage.src} alt="" />
                          </figure>
                        )}
                        <div className={styles.introSplitBelow}>
                          {section.context && (
                            <div>
                              <h3 className={styles.colLabel}>Context</h3>
                              <p className={styles.colBody}>{section.context}</p>
                            </div>
                          )}
                          {section.tools && (
                            <div className={styles.toolsRow}>
                              {section.tools.map((tool) => (
                                <img key={tool.name} src={tool.icon} alt={tool.name} title={tool.name} className={styles.toolIcon} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : section.layout === 'two-col-header' ? (
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
                        {section.clip ? (
                          <Clip src={section.clip.src} poster={section.clip.poster} label={section.heading || caseData.title} caption={section.clip.caption} />
                        ) : section.image ? (
                          <img src={section.image} alt={section.heading || ''} />
                        ) : null}
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
                  ) : section.layout === 'carousel' ? (
                    <>
                      {section.heading && (
                        <h2 className={styles.sectionHeading}>{section.heading}</h2>
                      )}
                      {/* A paragraph can be { lead, text }: the lead is set in bold as a run-in heading */}
                      {section.body && section.body.map((para, j) => (
                        <p key={j} className={styles.sectionBody}>
                          {typeof para === 'string' ? para : (
                            <>
                              <strong className={styles.sectionLead}>{para.lead}</strong> {para.text}
                            </>
                          )}
                        </p>
                      ))}
                      <Carousel slides={section.slides} label={section.heading || caseData.title} />
                    </>
                  ) : section.layout === 'clip-side' ? (
                    <div className={styles.clipSide}>
                      <div className={styles.clipSideText}>
                        {section.heading && (
                          <h2 className={styles.sectionHeading}>{section.heading}</h2>
                        )}
                        {section.body && (
                          Array.isArray(section.body)
                            ? section.body.map((para, j) => <p key={j} className={styles.sectionBody}>{para}</p>)
                            : <p className={styles.sectionBody}>{section.body}</p>
                        )}
                      </div>
                      <div className={styles.clipSideMedia}>
                        {/* Optional row of small decorative pictures (for example the devices) above the clip */}
                        {section.devices && (
                          <div className={styles.deviceRow}>
                            {section.devices.map((src, j) => (
                              <img key={j} src={src} alt="" className={styles.deviceImg} />
                            ))}
                          </div>
                        )}
                        <Clip src={section.clip.src} poster={section.clip.poster} label={section.heading || caseData.title} caption={section.clip.caption} />
                      </div>
                    </div>
                  ) : section.layout === 'timeline' ? (
                    <>
                      {section.heading && (
                        <h2 className={styles.sectionHeading}>{section.heading}</h2>
                      )}
                      <ol className={styles.timeline}>
                        {section.stages.map((stage, j) => (
                          <li key={j} className={styles.timelineStage}>
                            <span className={styles.timelineNode} aria-hidden="true">{j + 1}</span>
                            <h3 className={styles.timelineTitle}>{stage.title}</h3>
                            <p className={styles.timelineBody}>{stage.body}</p>
                          </li>
                        ))}
                      </ol>
                      {section.note && (
                        <p className={styles.timelineNote}>
                          <strong className={styles.timelineNoteLabel}>{section.note.label}</strong>{' '}
                          {section.note.body}
                        </p>
                      )}
                    </>
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
                    <MediaPair
                      items={[
                        { image: section.image, caption: section.imageCaption },
                        { image: section.image2, caption: section.imageCaption2 },
                      ]}
                    />
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
                              <Media src={section.image} alt={section.heading || ''} />
                              {section.image2 && <Media src={section.image2} alt="" />}
                              {section.image3 && <Media src={section.image3} alt="" />}
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
                      {/* Text that continues after the image (bodyAfter), before any pair or clip */}
                      {section.bodyAfter && (
                        Array.isArray(section.bodyAfter)
                          ? section.bodyAfter.map((para, j) => <p key={j} className={styles.sectionBody}>{para}</p>)
                          : <p className={styles.sectionBody}>{section.bodyAfter}</p>
                      )}
                      {section.pair && <MediaPair items={section.pair} framed />}
                      {section.clip && <Clip src={section.clip.src} poster={section.clip.poster} label={section.heading || caseData.title} caption={section.clip.caption} />}
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

              <motion.div variants={item} className={styles.caseFooter}>
                <Footer flush />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
