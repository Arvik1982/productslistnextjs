'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './customInput.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={styles.formGroup}>
        <label htmlFor={props.id}>{label}</label>
        <input
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''} ${className || ''}`}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error}</span>}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
