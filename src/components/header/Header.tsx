'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import styles from './header.module.scss';
import { buttonTitles, titles } from '@/constants/texts';

export default function Header() {
  const { user, logout } = useAuthStore();

  const isClient = typeof window !== 'undefined';

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          {titles.siteNameTitle}
        </Link>

        <nav className={styles.nav}>
          {!isClient ? (
            <div style={{ width: '60px', height: '36px' }} />
          ) : user ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>
                {user.firstName} {user.lastName}
              </span>
              <button onClick={logout} className={styles.logoutBtn}>
                {buttonTitles.logout}
              </button>
            </div>
          ) : (
            <Link href="/login" className={styles.loginLink}>
              {buttonTitles.login}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
