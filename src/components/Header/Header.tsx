import styles from "./header.module.css";
import skipLogo from "../../assets/skip-logo.png";

export default function Header({}) {
  return (
    <div className={styles.main_header_container}>
      <div className={styles.app_name}>
        <img src={skipLogo} alt="SKI-P Logo" className={styles.logo} />
        <a href="">Karate Score App</a>
      </div>
      <div className={styles.dojos_actions}>
        <button>Login</button>
        <button>Criar Conta</button>
      </div>
    </div>
  );
}
