'use client';

import { errorMessages } from '@/constants/texts';
import { useEffect } from 'react';
import styles from './error.module.scss';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ошибка загрузки:', {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  const getErrorMessage = () => {
    const message = error.message.toLowerCase();

    if (message.includes('404') || message.includes('not found')) {
      return `${errorMessages.notFound}`;
    }
    if (message.includes('500') || message.includes('server error')) {
      return `${errorMessages.serverError}`;
    }
    if (message.includes('network') || message.includes('fetch')) {
      return `${errorMessages.fetchError}`;
    }
    if (message.includes('timeout') || message.includes('timed out')) {
      return `${errorMessages.timeout}`;
    }

    return errorMessages.loadError;
  };

  return (
    <div className={styles.container}>
      <div className={styles.errorMessage}>
        <h2>{errorMessages.wrong}</h2>
        <p>{getErrorMessage()}</p>
        {error.digest && <small>Код ошибки: {error.digest}</small>}
        <span>{errorMessages.retry}</span>
      </div>
    </div>
  );
}
