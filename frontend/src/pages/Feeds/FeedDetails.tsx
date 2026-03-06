import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../components/layout";
import styles from "./FeedDetails.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";
import homeIcon from "../../assets/icons/home_icon.svg";
import clipboardIcon from "../../assets/icons/clipboard_icon.svg";
import fileIcon from "../../assets/icons/download-success_icon.svg";
import { FEEDS } from "./feedsData";

type DetailsTab = "available" | "history";

const HISTORY_ROWS = Array.from({ length: 10 }).map((_, idx) => ({
  pos: String(17 - idx).padStart(3, "0"),
  date: "2025.12.12 00:15:00",
  feedName: "Iphones feed",
  inputFile: "Click there",
  outputFile: "Click there",
  shortcut: "Click there",
  status: "200",
}));

export default function FeedDetails() {
  const navigate = useNavigate();
  const { feedId } = useParams();
  const [tab, setTab] = useState<DetailsTab>("available");

  const feed = useMemo(() => FEEDS.find((it) => String(it.id) === feedId) ?? FEEDS[0], [feedId]);

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
            <h1 className={styles.heading}>{feed.title}</h1>
            <div className={styles.breadcrumbs}>
              <img className={styles.breadcrumbHomeIcon} src={homeIcon} alt="" />
              <span>/</span>
              <span>All Feed&apos;s</span>
              <span>/</span>
              <span>{feed.title}</span>
            </div>
          </div>

          <div className={styles.layout}>
            <aside className={styles.leftCol}>
              <div className={styles.sideBlock}>
                <div className={styles.sideTitle}>
                  Измените ваш фид
                  <br />
                  сохранив ссылку
                  <br />
                  и исходники.
                </div>
                <div className={styles.sideText}>
                  Исходный файл будет сохранен,
                  <br />
                  в любой момент можете вернуть фид в первоначальное состояние. Ссылка остается прежней.
                </div>
                <button
                  className={styles.sideBtn}
                  type="button"
                  onClick={() => navigate("/feed-generator?mode=edit")}
                >
                  Редактировать
                </button>
              </div>

              <div className={styles.sideBlock}>
                <div className={styles.sideTitle}>Что-то работает не так?</div>
                <div className={styles.sideText}>Сообщите нам и мы поможем вам</div>
                <button className={styles.sideBtn} type="button">
                  Сообщить
                </button>
              </div>
            </aside>

            <section className={styles.rightCol}>
              <div className={styles.feedTop}>
                <div className={styles.feedLinkBlock}>
                  <div className={styles.feedLinkTitle}>
                    <span>Feed link</span>
                    <img src={clipboardIcon} alt="" />
                  </div>
                  <div className={styles.feedLinkUrl}>{feed.url}</div>
                </div>

                <div className={styles.tabs}>
                  <button
                    className={`${styles.tabBtn} ${tab === "available" ? styles.tabBtnActive : ""}`}
                    type="button"
                    onClick={() => setTab("available")}
                  >
                    Available feeds
                  </button>
                  <button
                    className={`${styles.tabBtn} ${tab === "history" ? styles.tabBtnActive : ""}`}
                    type="button"
                    onClick={() => setTab("history")}
                  >
                    Convertion history
                  </button>
                </div>
              </div>

              {tab === "available" ? (
                <div className={styles.availableView}>
                  <h3 className={styles.blockTitle}>Основные параметры</h3>
                  <div className={styles.paramGrid}>
                    <div className={styles.paramCardWide}>
                      <div className={styles.paramName}>Feed name:</div>
                      <div className={styles.paramValue}>Iphones feed...</div>
                    </div>

                    <div className={styles.paramCard}>
                      <div className={styles.paramName}>Platform</div>
                      <div className={styles.paramValue}>Choose from the list</div>
                    </div>
                    <div className={styles.paramRowSmall}>
                      <div className={styles.paramCardSmall}>
                        <div className={styles.paramName}>Type of Business</div>
                        <div className={styles.paramValue}>Choose from the list</div>
                      </div>
                      <div className={styles.paramCardSmall}>
                        <div className={styles.paramName}>Update</div>
                        <div className={styles.paramValue}>Time update...</div>
                      </div>
                      <div className={styles.paramCardSmall}>
                        <div className={styles.paramName}>Currency</div>
                        <div className={styles.paramValue}>Choose from...</div>
                      </div>
                    </div>
                  </div>

                  <h3 className={styles.blockTitle}>Используемый файл</h3>
                  <div className={styles.fileCard}>
                    <img className={styles.fileIcon} src={fileIcon} alt="" />
                    <div className={styles.fileName}>Тут_имя_загружаемого_файла.xlsx</div>
                    <div className={styles.fileSize}>1.3mb</div>
                  </div>

                  <h3 className={styles.blockTitle}>Дополнительные параметры</h3>
                  <div className={styles.paramList}>
                    <div className={styles.paramLineCard}>
                      <div className={styles.paramLine}>
                        <div className={styles.paramLineLeft}>
                          <div className={styles.paramNum}>01</div>
                          <div className={styles.paramName}>Param</div>
                        </div>
                        <div className={styles.paramValueBox}>Your parameters...</div>
                      </div>
                    </div>
                    <div className={styles.paramLineCard}>
                      <div className={styles.paramLine}>
                        <div className={styles.paramLineLeft}>
                          <div className={styles.paramNum}>02</div>
                          <div className={styles.paramName}>Param</div>
                        </div>
                        <div className={styles.paramValueBox}>Your parameters...</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.historyView}>
                  <h3 className={styles.blockTitle}>Последнее обновление</h3>
                  <div className={styles.lastUpdateRow}>
                    <span>2025 12.12</span>
                    <span>Iphones feed</span>
                    <span>Тут_имя_файла.xlsx</span>
                    <span>Тут_имя_файла.xlsx</span>
                    <span>Click there</span>
                    <span>200</span>
                  </div>

                  <h3 className={styles.blockTitle}>Convertion history</h3>
                  <div className={styles.historyHeader}>
                    <span>Pos.</span>
                    <span>Date / time</span>
                    <span>Feed name</span>
                    <span>Input file</span>
                    <span>Output file</span>
                    <span>Shortcut</span>
                    <span>Status</span>
                  </div>
                  <div className={styles.historyRows}>
                    {HISTORY_ROWS.map((row) => (
                      <div key={row.pos} className={styles.historyRow}>
                        <span>{row.pos}</span>
                        <span>{row.date}</span>
                        <span>{row.feedName}</span>
                        <span>{row.inputFile}</span>
                        <span>{row.outputFile}</span>
                        <span>{row.shortcut}</span>
                        <span>{row.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
