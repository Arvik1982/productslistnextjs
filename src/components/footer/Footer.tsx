'use client';

import { useAuth } from '@/hooks/useAuth';
import styles from './footer.module.scss';
import { infoText } from '@/constants/texts';

export default function Footer() {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <span className={styles.year}>© {currentYear}</span>
        {user && (
          <span className={styles.userEmail}>
            {infoText.LoggedAs}
            {user.email}
          </span>
        )}
      </div>
    </footer>
  );
}
