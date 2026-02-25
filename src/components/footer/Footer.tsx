'use client';

import { useAuthStore } from '@/store/authStore';
import styles from './footer.module.scss';
import { info } from '@/constants/texts';

export default function Footer() {
  const { user } = useAuthStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <span className={styles.year}>© {currentYear}</span>
        {user && (
          <span className={styles.userEmail}>
            {info.LoggedAs}
            {user.email}
          </span>
        )}
      </div>
    </footer>
  );
}
