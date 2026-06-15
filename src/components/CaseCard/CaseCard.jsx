import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import styles from './CaseCard.module.css'

const Y_RANGES = [
  [0, -10],  // top-left:     slow
  [0, -40],  // top-right:    fast
  [0, -22],  // bottom-left:  medium
  [0, -52],  // bottom-right: fastest
]

export default function CaseCard({ caseData, onClick, index = 0 }) {
  const { title, subtitle, description, tags, cover } = caseData
  const prefersReducedMotion = useReducedMotion()

  const { scrollY } = useScroll()
  const [yStart, yEnd] = Y_RANGES[index % 4]
  const cardY = useTransform(
    scrollY,
    [0, 1000],
    prefersReducedMotion ? [0, 0] : [yStart, yEnd]
  )

  return (
    <motion.article className={styles.card} style={{ y: cardY }} onClick={onClick} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      <div className={styles.cover}>
        {cover ? (
          <img src={cover} alt={title} className={styles.image} />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>
      <div className={styles.body}>
        {tags && tags.length > 0 && (
          <ul className={styles.tags}>
            {tags.map((tag) => (
              <li key={tag} className={styles.tag}>{tag}</li>
            ))}
          </ul>
        )}
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{subtitle || description}</p>
      </div>
    </motion.article>
  )
}
