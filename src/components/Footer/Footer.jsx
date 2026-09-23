import styles from './Footer.module.css'

// flush: no side padding, for a footer placed inside a container that already has its own (the case drawer).
export default function Footer({ flush = false }) {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.inner}${flush ? ` ${styles.flush}` : ''}`}>
        <span className={styles.copy}>© {new Date().getFullYear()} Vadim Kovalenko</span>
        <nav className={styles.links} aria-label="Contact">
          <a href="mailto:vadim.kavalenka@gmail.com">vadim.kavalenka@gmail.com</a>
          <a
            href="https://www.linkedin.com/in/vadim-kovalenko-design/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href={`${import.meta.env.BASE_URL}Kovalenko_Product_Design_CV_en.pdf`} download>
            Download CV
          </a>
        </nav>
      </div>
    </footer>
  )
}
