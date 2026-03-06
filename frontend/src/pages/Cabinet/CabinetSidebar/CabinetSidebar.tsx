import { NavLink } from "react-router-dom";
import styles from "./CabinetSidebar.module.css";

import profileIcon from "../../../assets/icons/profile_icon.svg";
import profileIconNonActive from "../../../assets/icons/profile-non-active_icon.svg";

import subscriptionIcon from "../../../assets/icons/subscription_icon.svg";

import notificationIconWhite from "../../../assets/icons/notification_white_icon.svg";
import notificationIconNonActive from "../../../assets/icons/notification-non-active_icon.svg";

import signOutIcon from "../../../assets/icons/arrow_sign-out_icon.svg";

export default function CabinetSidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <div className={styles.title}>Личный кабинет</div>
      </div>

      <nav className={styles.menu}>
        {/* PROFILE */}
        <NavLink
          to="/cabinet/profile"
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? profileIcon : profileIconNonActive}
                alt=""
                className={styles.icon}
              />
              <span className={isActive ? styles.itemTextActive : styles.itemText}>
                Профиль
              </span>
            </>
          )}
        </NavLink>

        {/* SUBSCRIPTION */}
        <NavLink
          to="/cabinet/subscription"
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <img src={subscriptionIcon} alt="" className={styles.icon} />
              <span className={isActive ? styles.itemTextActive : styles.itemText}>
                Подписка
              </span>
            </>
          )}
        </NavLink>

        {/* NOTIFICATIONS */}
        <NavLink
          to="/cabinet/notifications"
          className={({ isActive }) =>
            `${styles.item} ${isActive ? styles.itemActive : ""}`
          }
        >
          {({ isActive }) => (
            <>
              <img
                src={isActive ? notificationIconWhite : notificationIconNonActive}
                alt=""
                className={styles.icon}
              />
              <span className={isActive ? styles.itemTextActive : styles.itemText}>
                Notifications Feeds
              </span>
            </>
          )}
        </NavLink>
      </nav>

      <button className={styles.logout}>
        <img src={signOutIcon} alt="" className={styles.logoutIcon} />
        <span className={styles.logoutText}>Выйти</span>
      </button>
    </aside>
  );
}
