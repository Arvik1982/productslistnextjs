'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { buttonTitles, titles } from '@/constants/texts';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const { user, logout } = useAuth();
  const { isLoading } = useAuthStore();
  console.log({ isLoading });
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <Link href="/" className={styles.logo}>
          {titles.siteNameTitle}
        </Link>
        <nav className={styles.nav}>
          {!isLoading && user ? (
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
