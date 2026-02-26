'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import styles from './appbutton.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'success' | 'danger' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

const AppButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', fullWidth = false, children, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`
          ${styles.button} 
          ${styles[variant]} 
          ${fullWidth ? styles.fullWidth : ''} 
          ${className || ''}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

AppButton.displayName = 'AppButton';

export default AppButton;
