'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import styles from './loginForm.module.scss';
import { labels, titles } from '@/constants/texts';

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const { isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const validateForm = () => {
    const errors = {
      username: '',
      password: '',
    };

    if (!formData.username.trim()) {
      errors.username = 'Имя пользователя обязательно';
    } else if (formData.username.length < 3) {
      errors.username = 'Имя пользователя должно содержать минимум 3 символа';
    }

    if (!formData.password.trim()) {
      errors.password = 'Пароль обязателен';
    } else if (formData.password.length < 3) {
      errors.password = 'Пароль должен содержать минимум 3 символа';
    }

    setValidationErrors(errors);
    return !errors.username && !errors.password;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    await login(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name as keyof typeof validationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1 className={styles.title}>{titles.systemEntry}</h1>

      <div className={styles.formGroup}>
        <label htmlFor="username">{labels.userName}</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className={validationErrors.username ? styles.error : ''}
          placeholder="jacksone"
        />
        {validationErrors.username && (
          <span className={styles.errorMessage}>{validationErrors.username}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password">{labels.password}</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={validationErrors.password ? styles.error : ''}
          placeholder="••••••••"
        />
        {validationErrors.password && (
          <span className={styles.errorMessage}>{validationErrors.password}</span>
        )}
      </div>

      {error && <div className={styles.apiError}>{error}</div>}

      <button type="submit" className={styles.submitBtn} disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Тестовые данные: username: jacksone, password: jacksonepass
      </div>
    </form>
  );
}
