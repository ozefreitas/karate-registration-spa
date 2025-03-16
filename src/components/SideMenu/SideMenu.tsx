import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./sidemenu.module.css";

export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={styles.nav_container}>
      <div onClick={handleNavMenuClick} className={styles.nav_options_button}>
        <img
          width="32"
          height="32"
          src="https://img.icons8.com/windows/32/menu--v1.png"
          alt="menu--v1"
        />
      </div>
      <nav
        className={`${styles.options_nav_menu} ${
          isMenuOpen ? styles.open : ""
        }`}
      >
        <div className={styles.page_selection}>
          <a href="">Atletas</a>
          <a href="">Competições</a>
          <a href="">Ajuda</a>
          <a href="">Regras</a>
          <a href="">Feedback</a>
        </div>
      </nav>
    </div>
  );
}
