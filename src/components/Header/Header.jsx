import { Link, NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand}>
          <span className={styles.name}>Vadim Kovalenko</span>
        </Link>
        <nav className={styles.nav}>
          <NavLink to="/" end className={({ isActive }) => (isActive ? styles.active : undefined)}>
            Work
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? styles.active : undefined)}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
