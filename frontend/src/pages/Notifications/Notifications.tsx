import { Header, Footer } from "../../components/layout";
import styles from "./Notifications.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";
import homeIcon from "../../assets/icons/home_icon.svg";
import dropdownIcon from "../../assets/icons/dropdown_icon.svg";

type Notice = {
  title: string;
  time: string;
  text: string;
  isNew?: boolean;
};

const NEW_NOTICES: Notice[] = [
  {
    title: "Обновление фида",
    time: "5 мин.",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
    isNew: true,
  },
  {
    title: "Тема уведомления",
    time: "10 час.",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
  },
  {
    title: "Тема уведомления",
    time: "сегодня",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
  },
  {
    title: "Тема уведомления",
    time: "сегодня",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
  },
  {
    title: "Тема уведомления",
    time: "сегодня",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
  },
];

const EARLY_NOTICES: Notice[] = [
  {
    title: "Тема уведомления",
    time: "вчера",
    text: "Ваш фид “pos.Имя_фида” был успешно обновлен. Статус: 200",
  },
];

export default function Notifications() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.hero}>
          <img className={styles.heroImage} src={headerTopImg} alt="" />

          <div className={styles.heroCard}>
            <div className={styles.heroCardTextWrap}>
              <div className={styles.heroCardTitle}>Будущее с нами это:</div>
              <div className={styles.heroCardText}>
                Простой инструмент сегодня
                <br />
                - основа масштабируемой
                <br />
                маркетинговой платформы завтра.
              </div>
            </div>
            <button className={styles.heroCardArrowBtn} type="button" aria-label="Подробнее">
              <img className={styles.heroCardArrowIcon} src={heroArrowIcon} alt="" />
            </button>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.headingBlock}>
            <h1 className={styles.heading}>Notifications</h1>
            <div className={styles.breadcrumbs}>
              <img className={styles.breadcrumbHomeIcon} src={homeIcon} alt="" />
              <span>/</span>
              <span>All Feed&apos;s</span>
              <span>/</span>
              <span>Notifications</span>
            </div>
          </div>

          <div className={styles.topControls}>
            <div className={styles.topLeft}>
              <div className={styles.topTitle}>
                Настройте ваши
                <br />
                уведомления
              </div>
              <button className={styles.setupBtn} type="button">
                Настроить
              </button>
            </div>

            <div className={styles.topRight}>
              <div className={styles.selectGroup}>
                <div className={styles.selectLabel}>Сортировать по</div>
                <button className={styles.selectBtn} type="button">
                  <span>Дата получения</span>
                  <img className={styles.selectIcon} src={dropdownIcon} alt="" />
                </button>
              </div>

              <div className={styles.selectGroup}>
                <div className={styles.selectLabel}>Отображать по</div>
                <button className={styles.selectBtn} type="button">
                  <span>Со статусом</span>
                  <img className={styles.selectIcon} src={dropdownIcon} alt="" />
                </button>
              </div>
            </div>
          </div>

          <section className={styles.noticeSection}>
            <div className={styles.groupTitle}>Новые уведомления</div>
            {NEW_NOTICES.map((notice, idx) => (
              <article
                key={`new-${idx}`}
                className={`${styles.noticeItem} ${notice.isNew ? styles.noticeItemNew : ""}`}
              >
                <div className={styles.noticeHead}>
                  <div className={styles.noticeSubject}>{notice.title}</div>
                  <div className={styles.noticeTime}>{notice.time}</div>
                </div>
                <div className={styles.noticeText}>{notice.text}</div>
              </article>
            ))}

            <div className={styles.groupTitleEarly}>Ранние уведомления</div>
            {EARLY_NOTICES.map((notice, idx) => (
              <article key={`old-${idx}`} className={styles.noticeItem}>
                <div className={styles.noticeHead}>
                  <div className={styles.noticeSubject}>{notice.title}</div>
                  <div className={styles.noticeTime}>{notice.time}</div>
                </div>
                <div className={styles.noticeText}>{notice.text}</div>
              </article>
            ))}
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
