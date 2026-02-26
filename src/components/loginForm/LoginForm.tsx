'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import AppButton from '@/components/appButton/AppButton';
import styles from './loginForm.module.scss';
import { labels, titles, buttonTitles, errorMessages } from '@/constants/texts';
import CustomInput from '../customInput/AppInput';

const MIN_SIMBOLS = 3;

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
      errors.username = errorMessages.usernameError;
    } else if (formData.username.length < MIN_SIMBOLS) {
      errors.username = `${errorMessages.minLengthValueError}${MIN_SIMBOLS}`;
    }

    if (!formData.password.trim()) {
      errors.password = errorMessages.passwordError;
    } else if (formData.password.length < MIN_SIMBOLS) {
      errors.password = `${errorMessages.minLengthValueError}${MIN_SIMBOLS}`;
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
      <h1 className={styles.title}>{titles.SignInTitle}</h1>

      <CustomInput
        id="username"
        name="username"
        type="text"
        label={labels.userName}
        value={formData.username}
        onChange={handleChange}
        error={validationErrors.username}
        placeholder="jacksone"
      />

      <CustomInput
        id="password"
        name="password"
        type="password"
        label={labels.password}
        value={formData.password}
        onChange={handleChange}
        error={validationErrors.password}
        placeholder="••••••••"
      />

      {error && <div className={styles.apiError}>{error}</div>}

      <AppButton type="submit" variant="primary" fullWidth disabled={isLoading}>
        {isLoading ? buttonTitles.loading : buttonTitles.login}
      </AppButton>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666', textAlign: 'center' }}>
        Тестовые данные: username: jacksone, password: jacksonepass
      </div>
    </form>
  );
}
