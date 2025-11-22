import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import type { User } from "../../types"

import styles from './Login.module.scss';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<User>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: User) => {
    login(data);
    navigate('/');
  };

  return (
    <div className={styles.loginPage}>
      <h2>Registration</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Your Name</label>
          <input
            id="username"
            type="text"
            placeholder="Your name"
            {...register("username", {
              required: "Name is required",
              minLength: { value: 2, message: "Minimum 2 characters" }
            })}
          />
          {errors.username && <span className={styles.error}>{errors.username.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            {...register("email", {
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
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" }
            })}
          />
          {errors.password && <span className={styles.error}>{errors.password.message}</span>}
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Your Age"
            {...register("age", {
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
            {...register("profession")}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="mainGoal">Main goal (optional)</label>
          <textarea
            id="mainGoal"
            placeholder="Tell about your goal"
            {...register("mainGoal")}
          />
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default LoginPage;