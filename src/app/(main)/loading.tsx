import { infoText } from '@/constants/texts';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p className={styles.text}>{infoText.loading}</p>
      </div>
    </div>
  );
}
