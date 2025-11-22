import { useState } from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from './Login.module.scss';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [profession, setProfession] = useState('');
  const [mainGoal, setMainGoal] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    login({
      username,
      email,
      age: Number(age) || 0,
      password,
      profession,
      mainGoal
    });



    navigate('/');
  };

  return (
    <div className={styles.loginPage}>
      <h2>Regisrtation</h2>
      <form className={styles.form} onSubmit={handleSubmit}>

        <div className={styles.inputGroup}>
          <label htmlFor="username">Your Name</label>
          <input
            id="username"
            type="text"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter ur pasword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="age">Age</label>
          <input
            id="age"
            type="number"
            placeholder="Your Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="profession">Profession (optional)</label>
          <input
            id="profession"
            type="text"
            placeholder="Your profession"
            value={profession}
            onChange={(e) => setProfession(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="mainGoal">Main goal (optional)</label>
          <textarea
            id="mainGoal"
            placeholder="Tell about your goal"
            value={mainGoal}
            onChange={(e) => setMainGoal(e.target.value)}
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