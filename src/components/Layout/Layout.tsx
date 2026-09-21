// React JSX runtime provides React automatically; explicit import not needed.
import { Outlet } from 'react-router-dom'
import type { LayoutProps } from './Layout.types'
import styles from './Layout.module.css'

export function Layout(_props: LayoutProps): JSX.Element {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
          <div className={styles.headerInner}>
          <img src="/github.svg" alt="GitHub" className={styles.logo} />
          <h1 className={styles.title}>React Repository Issues</h1>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
