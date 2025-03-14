import styles from "./header.module.css";
import skipLogo from "../../assets/skip-logo.png";

interface HeaderProps {
  isLogedIn: boolean
}

export default function Header({ isLogedIn }: HeaderProps) {
  return (
    <div className={styles.main_header_container}>
      <div className={styles.app_name}>
        <img src={skipLogo} alt="SKI-P Logo" className={styles.logo} />
        <a href="">Karate Score App</a>
      </div>
      {isLogedIn ? (
        <div className={styles.dojos_actions}>
          <button className={styles.login_buttons}>Logout</button>
          <button className={styles.login_buttons}>Perfil</button>
        </div>
      ) : (
        <div className={styles.dojos_actions}>
          <button className={styles.login_buttons}>Login</button>
          <button className={styles.login_buttons}>Criar Conta</button>
        </div>
      )}
    </div>
  );
}
