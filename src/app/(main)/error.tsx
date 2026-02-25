'use client';

import { errors } from '@/constants/texts';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <div className="error-message">
        <h2>{errors.wrong}</h2>
        <p>{errors.loadError}</p>
        <button onClick={reset}>{errors.retry}</button>
      </div>
    </div>
  );
}
