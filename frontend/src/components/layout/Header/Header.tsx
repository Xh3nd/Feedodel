import styles from "./Header.module.css";

import logo from "../../../assets/icons/logo.svg";
import plusIcon from "../../../assets/icons/plus_black_icon.svg";
import plusIconWhite from "../../../assets/icons/plus_white_icon.svg";

import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <img className={styles.logo} src={logo} alt="Feedodel" />
      </div>

      <nav className={styles.headerNav}>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.navPill} ${isActive ? styles.navPillActive : ""}`
          }
        >
          О нас
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `${styles.navPill} ${isActive ? styles.navPillActive : ""}`
          }
        >
          Блог
        </NavLink>
        <NavLink
          to="/contacts"
          className={({ isActive }) =>
            `${styles.navPill} ${isActive ? styles.navPillActive : ""}`
          }
        >
          Контакты
        </NavLink>
        <NavLink
          to="/feeds"
          className={({ isActive }) =>
            `${styles.navPill} ${isActive ? styles.navPillActive : ""}`
          }
        >
          Фиды
        </NavLink>
      </nav>

      <div className={styles.headerRight}>
        <button className={styles.headerBtn} type="button">
          <img
            className={`${styles.plusIcon} ${styles.plusDark}`}
            src={plusIcon}
            alt=""
          />
          <img
            className={`${styles.plusIcon} ${styles.plusLight}`}
            src={plusIconWhite}
            alt=""
          />
          <span>Создать фид</span>
        </button>

        <button className={styles.headerBtn} type="button">
          <span>Войти</span>
        </button>
      </div>
    </div>
  );
}
