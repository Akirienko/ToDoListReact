import { useAuth } from "../../context/auth/AuthContext";
import styles from './Profile.module.scss';

function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileCard}>
        <div className={styles.profileHeader}>
          <div className={styles.avatar}>
            {user.username.charAt(0).toUpperCase()}
          </div>
          <h2>{user.username}</h2>
        </div>

        <div className={styles.profileInfo}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{user.email}</span>
          </div>

          <div className={styles.infoItem}>
            <span className={styles.label}>Age:</span>
            <span className={styles.value}>{user.age}</span>
          </div>

          {user.profession && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Profession:</span>
              <span className={styles.value}>{user.profession}</span>
            </div>
          )}

          {user.mainGoal && (
            <div className={styles.infoItem}>
              <span className={styles.label}>Main Goal:</span>
              <span className={styles.value}>{user.mainGoal}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;