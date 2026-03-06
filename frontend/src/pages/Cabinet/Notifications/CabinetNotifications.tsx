import { useState } from "react";
import styles from "./CabinetNotifications.module.css";

import homeIcon from "../../../assets/icons/home_icon.svg";

export default function CabinetNotifications() {
  const [receiveAll, setReceiveAll] = useState(false);

  const [siteFeedStatus, setSiteFeedStatus] = useState(false);
  const [siteErrorLog, setSiteErrorLog] = useState(false);

  const [emailFeedStatus, setEmailFeedStatus] = useState(false);
  const [emailErrorLog, setEmailErrorLog] = useState(false);

  return (
    <div className={styles.wrap}>
      {/* TITLE + BREADCRUMBS */}
      <div className={styles.header}>
        <div className={styles.h1}>Настройки уведомлений</div>

        <div className={styles.breadcrumbs}>
          <img src={homeIcon} alt="" className={styles.homeIcon} />
          <div className={styles.sep}>/</div>
          <div className={styles.crumb}>Profile</div>
          <div className={styles.sep}>/</div>
          <div className={styles.crumb}>Notifications Feeds</div>
        </div>
      </div>

      {/* TOP TOGGLE */}
      <div className={styles.card}>
        <label className={styles.row}>
          <span className={styles.checkbox}>
            <input
              type="checkbox"
              checked={receiveAll}
              onChange={(e) => setReceiveAll(e.target.checked)}
            />
            <span className={styles.checkboxUi} />
          </span>

          <span className={styles.rowTitle}>
            Receive all kinds of notifications on the website (by email)
          </span>
        </label>

        <div className={styles.rowDesc}>
          Permission to send feed status notifications by email
        </div>
      </div>

      {/* WEBSITE NOTIFICATIONS */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Уведомления на сайте</div>
        </div>

        <div className={styles.list}>
          <div className={styles.card}>
            <label className={styles.row}>
              <span className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={siteFeedStatus}
                  onChange={(e) => setSiteFeedStatus(e.target.checked)}
                />
                <span className={styles.checkboxUi} />
              </span>

              <span className={styles.rowTitle}>Feed status</span>
            </label>

            <div className={styles.rowDesc}>
              Permission to send feed status notifications by email
            </div>
          </div>

          <div className={styles.card}>
            <label className={styles.row}>
              <span className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={siteErrorLog}
                  onChange={(e) => setSiteErrorLog(e.target.checked)}
                />
                <span className={styles.checkboxUi} />
              </span>

              <span className={styles.rowTitle}>Error report (LOG)</span>
            </label>

            <div className={styles.rowDesc}>
              Permission to send feed status notifications by email
            </div>
          </div>
        </div>
      </section>

      {/* EMAIL NOTIFICATIONS */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Уведомления на ваш Email</div>
        </div>

        <div className={styles.list}>
          <div className={styles.card}>
            <label className={styles.row}>
              <span className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={emailFeedStatus}
                  onChange={(e) => setEmailFeedStatus(e.target.checked)}
                />
                <span className={styles.checkboxUi} />
              </span>

              <span className={styles.rowTitle}>Feed status</span>
            </label>

            <div className={styles.rowDesc}>
              Permission to send feed status notifications by email
            </div>
          </div>

          <div className={styles.card}>
            <label className={styles.row}>
              <span className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={emailErrorLog}
                  onChange={(e) => setEmailErrorLog(e.target.checked)}
                />
                <span className={styles.checkboxUi} />
              </span>

              <span className={styles.rowTitle}>Error report (LOG)</span>
            </label>

            <div className={styles.rowDesc}>
              Permission to send feed status notifications by email
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
