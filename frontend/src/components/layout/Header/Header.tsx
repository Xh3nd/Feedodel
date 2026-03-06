import styles from "./Header.module.css";

import logo from "../../../assets/icons/logo.svg";
import plusIcon from "../../../assets/icons/plus_black_icon.svg";
import plusIconWhite from "../../../assets/icons/plus_white_icon.svg";

import profileBlackIcon from "../../../assets/icons/profile_black_icon.svg";
import profileWhiteIcon from "../../../assets/icons/profile_white_icon.svg";
import notificationBlackIcon from "../../../assets/icons/notification_black_icon.svg";
import notificationWhiteIcon from "../../../assets/icons/notification_white_icon.svg";

import subtract from "../../../assets/images/header-subtract-element.png";

import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { clearAuthenticated, isAuthenticated } from "../../../utils/Auth";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isNotificationsPage = location.pathname === "/notifications";

  // На степах (feed-generator) НЕ скрываем header при скролле
  const disableAutoHide = useMemo(() => {
    return location.pathname.startsWith("/feed-generator");
  }, [location.pathname]);

  // header hide/show
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const upAcc = useRef(0);

  // auth
  const [authed, setAuthed] = useState(isAuthenticated());

  // profile menu
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // hide/show on scroll (кроме степов)
  useEffect(() => {
    if (disableAutoHide) {
      setHidden(false);
      return;
    }

    lastY.current = window.scrollY;
    upAcc.current = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      if (y < 10) {
        setHidden(false);
        upAcc.current = 0;
        lastY.current = y;
        return;
      }

      if (delta > 4) {
        setHidden(true);
        upAcc.current = 0;
      }

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
  }, [disableAutoHide]);

  // слушаем localStorage (если авторизация меняется в другом месте)
  useEffect(() => {
    const onStorage = () => setAuthed(isAuthenticated());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // закрытие меню кликом вне + ESC
  useEffect(() => {
    if (!menuOpen) return;

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (menuRef.current && t && !menuRef.current.contains(t)) {
        setMenuOpen(false);
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    clearAuthenticated();
    setAuthed(false);
    setMenuOpen(false);
    navigate("/", { replace: true });
  };

  return (
    <header className={`${styles.header} ${hidden ? styles.headerHidden : ""}`}>
      <img className={styles.subtract} src={subtract} alt="" aria-hidden="true" />

      {/* LEFT: NAV */}
      <nav className={styles.headerNav}>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `${styles.navPill} ${
              isActive || location.pathname === "/" ? styles.navPillActive : ""
            }`
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
        {/* Создать фид */}
        <button
          className={`${styles.headerBtn} ${
            authed ? styles.createBtn : styles.createBtnGuest
          }`}
          type="button"
          onClick={() => navigate(authed ? "/feed-generator" : "/login")}
        >
          <img className={`${styles.plusIcon} ${styles.plusDark}`} src={plusIcon} alt="" />
          <img
            className={`${styles.plusIcon} ${styles.plusLight}`}
            src={plusIconWhite}
            alt=""
          />
          <span>Создать фид</span>
        </button>

        {!authed ? (
          <Link to="/login" className={`${styles.headerBtn} ${styles.loginBtn}`}>
            Войти
          </Link>
        ) : (
          <div className={styles.userBlock} ref={menuRef}>
            {/* notifications */}
            <button
              type="button"
              className={`${styles.notificationBtn} ${
                isNotificationsPage ? styles.notificationBtnActive : ""
              }`}
              aria-label="Уведомления"
              onClick={() => {
                navigate("/notifications");
              }}
            >
              <img
                className={`${styles.notificationImg} ${styles.notificationImgBlack}`}
                src={notificationBlackIcon}
                alt=""
              />
              <img
                className={`${styles.notificationImg} ${styles.notificationImgWhite}`}
                src={notificationWhiteIcon}
                alt=""
              />
            </button>

            {/* profile */}
            <button
              type="button"
              className={`${styles.profileBtn} ${menuOpen ? styles.profileBtnOpen : ""}`}
              aria-label="Профиль"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <img
                className={`${styles.profileImg} ${styles.profileImgBlack}`}
                src={profileBlackIcon}
                alt=""
              />
              <img
                className={`${styles.profileImg} ${styles.profileImgWhite}`}
                src={profileWhiteIcon}
                alt=""
              />
            </button>

            {menuOpen && (
              <div className={styles.profileMenu}>
                <div className={styles.menuTop}>
                  <div className={styles.avatarPill}>
                    <div className={styles.avatarIcon} />
                  </div>

                  <div className={styles.userText}>
                    <div className={styles.userName}>Druzyanov Yan</div>
                    <div className={styles.userEmail}>yandruzyanov@...</div>
                  </div>
                </div>

                <div className={styles.divider} />

                <div className={styles.menuGroup}>
                  <button
                    type="button"
                    className={styles.menuItem}
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/feeds");
                    }}
                  >
                    <span className={styles.itemIcon} />
                    <span className={styles.itemText}>Мои фиды</span>
                  </button>

                  <button type="button" className={styles.menuItem}>
                    <span className={styles.itemIcon} />
                    <Link to="/cabinet/notifications/" className={styles.itemText}>Уведомления</Link>
                    <span className={styles.badge}>01</span>
                  </button>

                  <button type="button" className={styles.menuItem}>
                    <span className={styles.itemIcon} />
                    <Link to="/cabinet/subscription" className={styles.itemText}>Подписка</Link>
                  </button>
                </div>

                <div className={styles.divider} />

                <div className={styles.menuGroup}>
                  <button type="button" className={styles.menuItem}>
                    <span className={styles.itemIcon} />
                    <Link to="/cabinet/profile" className={styles.itemText}>Настройки профиля</Link>
                  </button>

                  <button type="button" className={styles.menuItem}>
                    <span className={styles.itemIcon} />
                    <span className={styles.itemText}>Поддержка</span>
                  </button>
                </div>

                <div className={styles.divider} />

                <button
                  type="button"
                  className={styles.menuItem}
                  onClick={handleLogout}
                >
                  <span className={styles.itemIcon} />
                  <span className={styles.itemText}>Выйти</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
