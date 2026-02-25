import { info } from '@/constants/texts';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div className={styles.spinner} />
        <p className={styles.text}>{info.loading}</p>
      </div>
    </div>
  );
}
