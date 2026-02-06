import styles from "./Header.module.css";

import logo from "../../../assets/icons/logo.svg";
import plusIcon from "../../../assets/icons/plus_black_icon.svg";
import plusIconWhite from "../../../assets/icons/plus_white_icon.svg";

import subtract from "../../../assets/images/header-subtract-element.png";

import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [hidden, setHidden] = useState(false);

  const lastY = useRef(0);
  const upAcc = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      // всегда показываем в самом верху
      if (y < 10) {
        setHidden(false);
        upAcc.current = 0;
        lastY.current = y;
        return;
      }

      // вниз — прячем (с порогом, чтобы не дёргалось)
      if (delta > 4) {
        setHidden(true);
        upAcc.current = 0;
      }

      // вверх — копим "подъём" и показываем после небольшого скролла вверх
      if (delta < -4) {
        upAcc.current += -delta;
        if (upAcc.current > 40) {
          setHidden(false);
          upAcc.current = 0;
        }
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}>
      <img className={styles.subtract} src={subtract} alt="" aria-hidden="true" />

      {/* LEFT: NAV */}
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

      {/* CENTER: LOGO */}
      <Link to="/" className={styles.logoWrap} aria-label="Feedodel">
        <img className={styles.logo} src={logo} alt="Feedodel" />
      </Link>

      {/* RIGHT: ACTIONS */}
      <div className={styles.headerRight}>
        <button className={`${styles.headerBtn} ${styles.createBtn}`} type="button">
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

        <Link to="/login" className={`${styles.headerBtn} ${styles.loginBtn}`}>
          Войти
        </Link>
      </div>
    </header>
  );
}
