import { useState } from 'react';
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

type AuthMode = 'login' | 'register';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData extends LoginFormData {
  username: string;
  age: number;
  profession?: string;
  mainGoal?: string;
}

function LoginPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const { register: registerField, handleSubmit, formState: { errors }, reset } = useForm<RegisterFormData>();
  const { signIn, signUp, error, loading } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterFormData | LoginFormData) => {
    try {
      if (mode === 'login') {
        await signIn(data.email, data.password)
        console.log('Login:', data);
      } else {
        const profileData: RegisterFormData = data as RegisterFormData
        await signUp(data.email, data.password, {
          username: profileData.username,
          age: profileData.age,
          profession: profileData.profession,
          mainGoal: profileData.mainGoal
        })
        console.log('Register:', data);
      }
      navigate('/');
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    reset();
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${mode === 'login' ? styles.active : ''}`}
          onClick={() => switchMode('login')}
        >
          Login
        </button>
        <button
          type="button"
          className={`${styles.tab} ${mode === 'register' ? styles.active : ''}`}
          onClick={() => switchMode('register')}
        >
          Register
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        {mode === 'register' && (
          <div className={styles.inputGroup}>
            <label htmlFor="username">Your Name</label>
            <input
              id="username"
              type="text"
              placeholder="Your name"
              {...registerField("username", {
                required: mode === 'register' ? "Name is required" : false,
                minLength: { value: 2, message: "Minimum 2 characters" }
              })}
            />
            {errors.username && <span className={styles.error}>{errors.username.message}</span>}
          </div>
        )}

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...registerField("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
          />
          {errors.email && <span className={styles.error}>{errors.email.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...registerField("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        {mode === 'register' && (
          <>
            <div className={styles.inputGroup}>
              <label htmlFor="age">Age</label>
              <input
                id="age"
                type="number"
                placeholder="Your Age"
                {...registerField("age", {
                  required: "Age is required",
                  min: { value: 1, message: "Age must be positive" },
                  max: { value: 120, message: "Invalid age" },
                  valueAsNumber: true
                })}
              />
              {errors.age && <span className={styles.error}>{errors.age.message}</span>}
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="profession">Profession (optional)</label>
              <input
                id="profession"
                type="text"
                placeholder="Your profession"
                {...registerField("profession")}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mainGoal">Main goal (optional)</label>
              <textarea
                id="mainGoal"
                placeholder="Tell about your goal"
                {...registerField("mainGoal")}
              />
            </div>
          </>
        )}

        {error && <div className={styles.error}>{error}</div>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Loading...' : (mode === 'login' ? 'Login' : 'Register')}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;