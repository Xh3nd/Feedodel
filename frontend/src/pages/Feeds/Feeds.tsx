import { Header, Footer } from "../../components/layout";
import styles from "./Feeds.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";
import dropdownIcon from "../../assets/icons/dropdown_icon.svg";
import notificationIcon from "../../assets/icons/notification-non-active_icon.svg";
import homeIcon from "../../assets/icons/home_icon.svg";
import { useNavigate } from "react-router-dom";
import { FEEDS } from "./feedsData";

export default function Feeds() {
  const navigate = useNavigate();

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
            <h1 className={styles.heading}>Ваши фиды в одном месте</h1>
            <div className={styles.breadcrumbs}>
              <img className={styles.breadcrumbHomeIcon} src={homeIcon} alt="" />
              <span>/</span>
              <span>All Feed&apos;s</span>
            </div>
          </div>

          <div className={styles.topControls}>
            <div className={styles.topLeft}>
              <p className={styles.topDescription}>
                Конвертируйте Excel в готовые фиды
                <br />
                для маркетплейсов за секунды.
              </p>

              <button className={styles.primaryBtn} type="button" onClick={() => navigate("/feed-generator")}>
                Начать
              </button>
            </div>

            <div className={styles.topRight}>
              <div className={styles.selectGroup}>
                <div className={styles.selectLabel}>Сортировать по</div>
                <button className={styles.selectBtn} type="button">
                  <span>Дата создания</span>
                  <img className={styles.selectIcon} src={dropdownIcon} alt="" />
                </button>
              </div>

              <div className={styles.selectGroup}>
                <div className={styles.selectLabel}>Отображать по</div>
                <button className={styles.selectBtn} type="button">
                  <span>Дата создания</span>
                  <img className={styles.selectIcon} src={dropdownIcon} alt="" />
                </button>
              </div>
            </div>
          </div>

          <section className={styles.cardsGrid}>
            {FEEDS.map((feed) => (
              <article key={feed.id} className={styles.feedCard}>
                <div className={styles.cardHead}>
                  <div className={styles.cardIndex}>
                    {String(feed.id).padStart(2, "0")}
                  </div>

                  <div className={styles.cardTitle}>{feed.title}</div>

                  <button className={styles.cardIconBtn} type="button" aria-label="Уведомления">
                    <img className={styles.cardIcon} src={notificationIcon} alt="" />
                  </button>
                </div>

                <div className={styles.cardBody}>
                  <div className={styles.cardMetaRow}>
                    <div className={styles.cardMetaCol}>
                      <div className={styles.metaLabel}>Date</div>
                      <div className={styles.metaValue}>{feed.date}</div>
                    </div>

                    <div className={styles.cardMetaCol}>
                      <div className={styles.metaLabel}>Status</div>
                      <div className={styles.metaValue}>{feed.status}</div>
                    </div>
                  </div>

                  <div className={styles.cardUrl}>{feed.url}</div>
                </div>

                <div className={styles.cardActions}>
                  <button
                    className={`${styles.actionBtn} ${styles.actionBtnEdit}`}
                    type="button"
                    onClick={() => navigate(`/feeds/${feed.id}`)}
                  >
                    Edit
                  </button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnHistory}`} type="button">
                    Log History
                  </button>
                </div>
              </article>
            ))}

            <article className={`${styles.feedCard} ${styles.createCard}`}>
              <div className={styles.createTitle}>Нужно что-то новенькое?</div>
              <button className={styles.primaryBtn} type="button" onClick={() => navigate("/feed-generator")}>Создать</button>
            </article>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
