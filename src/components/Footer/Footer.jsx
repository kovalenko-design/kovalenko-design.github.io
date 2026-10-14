import EmailLink from '../EmailLink/EmailLink'
import EdgeBlur from '../EdgeBlur/EdgeBlur'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <EdgeBlur edge="bottom" />
      <div className={styles.inner}>
        <nav className={styles.links} aria-label="Contact">
          <EmailLink>Email</EmailLink>
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
