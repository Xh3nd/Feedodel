import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Footer from "../../../components/layout/Footer/Footer";
import { isAuthenticated } from "../../../utils/Auth";
import styles from "./FeedGeneratorStep3.module.css";

// icons
import stepDoneIcon from "../../../assets/icons/step-done_icon.svg";
import createMagicIcon from "../../../assets/icons/create-magic_icon.svg";
import downloadSuccessIcon from "../../../assets/icons/download-success_icon.svg";
import convertingIcon from "../../../assets/icons/converting_icon.svg";
import convertingSuccessIcon from "../../../assets/icons/converting-success_icon.svg";
import clipboardIcon from "../../../assets/icons/clipboard_icon.svg";
import downloadFileIcon from "../../../assets/icons/download-file_icon.svg";

type Stage = "preview" | "converting" | "done";

type Step1Data = {
  feedName?: string;
  platform?: string;
  typeOfBusiness?: string;
  update?: string;
  currency?: string;
  additionalParams?: Array<{ name: string; value: string }>;
};

type Step2Data = {
  fileName?: string;
  fileSizeMb?: string;
};

const LS_STEP1_KEY = "feed_generator_step1";
const LS_STEP2_KEY = "feed_generator_step2";
const LS_FEED_URL_KEY = "feed_generator_feed_url";

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function loadStep1Data(): Step1Data {
  return safeJsonParse<Step1Data>(localStorage.getItem(LS_STEP1_KEY), {});
}

function loadStep2Data(): Step2Data {
  return safeJsonParse<Step2Data>(localStorage.getItem(LS_STEP2_KEY), {});
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

export default function FeedGeneratorStep3() {
  const navigate = useNavigate();

  // auth-guard
  useEffect(() => {
    if (!isAuthenticated()) navigate("/login", { replace: true });
  }, [navigate]);

  const step1 = useMemo(() => loadStep1Data(), []);
  const step2 = useMemo(() => loadStep2Data(), []);

  const [stage, setStage] = useState<Stage>("preview");

  // converting simulation
  const [progress, setProgress] = useState(0); // 0..100
  const [etaSec, setEtaSec] = useState(27); // макет: 00:27
  const timerRef = useRef<number | null>(null);

  // result
  const [feedUrl, setFeedUrl] = useState<string>(() => {
    const saved = localStorage.getItem(LS_FEED_URL_KEY);
    return saved || "https://www.feedodel.ru/feed/EXAMPLE/your_feed.xml";
  });

  const isConverting = stage === "converting";
  const isDone = stage === "done";

  const additionalParams = step1.additionalParams?.length
    ? step1.additionalParams
    : [
        { name: "Param", value: "Choose from the list" },
        { name: "Param", value: "Choose from the list" },
      ];

  const fileName = step2.fileName || "Тут_имя_загружаемого_файла.xlsx";
  const fileSize = step2.fileSizeMb || "1.3mb";

  const startConverting = () => {
    if (isConverting) return;

    setStage("converting");
    setProgress(0);
    setEtaSec(27);

    if (timerRef.current) window.clearInterval(timerRef.current);

    timerRef.current = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + 4);
        return next;
      });

      setEtaSec((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    // завершение (примерно как в макете)
    window.setTimeout(() => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;

      const url =
        localStorage.getItem(LS_FEED_URL_KEY) ||
        "https://www.feedodel.ru/feed/yfygnJgeAEm4a6RCXyr6O4/IP_Zyranov_Iphones_feed.xml";

      localStorage.setItem(LS_FEED_URL_KEY, url);

      setFeedUrl(url);
      setProgress(100);
      setEtaSec(0);
      setStage("done");
    }, 7000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(feedUrl);
    } catch {
      // fallback
      const el = document.createElement("textarea");
      el.value = feedUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
  };

  const downloadFeed = () => {
    // заглушка: заменишь на реальный download с бэка
    const content = `<!-- feed placeholder -->\n<feed url="${feedUrl}"></feed>\n`;
    const blob = new Blob([content], { type: "application/xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = (step1.feedName ? step1.feedName : "feed") + ".xml";
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Header />

      <div className={styles.page}>
        <div className={styles.body}>
          {/* LEFT */}
          <aside className={styles.sidebar}>
            <div className={styles.serviceSelect}>
              <div className={styles.serviceText}>Сервис: Генератор Feed</div>
              <span className={styles.serviceChevron} />
            </div>

            <div className={styles.steps}>
              <div className={styles.stepsHeader}>
                <div className={styles.stepsTitle}>Генератор Feed</div>
                <div className={styles.stepsCount}>3 / 3</div>
              </div>

              {/* Step 1 done */}
              <div className={styles.stepCardDone}>
                <div className={styles.stepCardRow}>
                  <div className={styles.stepCardRowTitle}>Шаг 1: Настройки</div>
                  <span className={styles.stepDoneMark}>
                    <img src={stepDoneIcon} alt="" />
                  </span>
                </div>
              </div>

              {/* Step 2 done */}
              <div className={styles.stepCardDone}>
                <div className={styles.stepCardRow}>
                  <div className={styles.stepCardRowTitle}>Шаг 2: Импорт xlsx</div>
                  <span className={styles.stepDoneMark}>
                    <img src={stepDoneIcon} alt="" />
                  </span>
                </div>
              </div>

              {/* Step 3 active */}
              <div className={styles.stepCardActive}>
                <div className={styles.stepCardTitle}>Шаг 3: Генерация xml</div>
                <div className={styles.stepCardText}>
                  Проверьте данные и получите готовый фид или настройте автообновляемую
                  ссылку как вам нужно.
                </div>
              </div>
            </div>

            <div className={styles.sidebarBottom}>
              {!isDone ? (
                <>
                  <button
                    type="button"
                    className={styles.btnBack}
                    onClick={() => navigate("/feed-generator/step-2")}
                    disabled={isConverting}
                  >
                    Назад
                  </button>

                  <button
                    type="button"
                    className={`${styles.btnPrimary} ${isConverting ? styles.btnDisabled : ""}`}
                    disabled={isConverting}
                    onClick={startConverting}
                  >
                    <span>Создать</span>
                    <img className={styles.btnIcon} src={createMagicIcon} alt="" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className={styles.btnPrimary}
                  onClick={() => {
                    // “Создать новый” — возвращаем на шаг 1 (или /feed-generator)
                    navigate("/feed-generator");
                  }}
                >
                  <span>Создать новый</span>
                </button>
              )}
            </div>
          </aside>

          {/* RIGHT */}
          <main className={styles.content}>
            {stage === "preview" && (
              <>
                {/* Используемый файл */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Используемый файл</div>
                  </div>

                  <div className={styles.fileCard}>
                    <div className={styles.fileIconWrap}>
                      <img src={downloadSuccessIcon} alt="" />
                    </div>

                    <div className={styles.fileInfo}>
                      <div className={styles.fileRow}>
                        <div className={styles.fileName} title={fileName}>
                          {fileName}
                        </div>
                        <div className={styles.fileSize}>{fileSize}</div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Параметры фида */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Параметры фида</div>
                  </div>

                  <div className={styles.paramGrid}>
                    <div className={styles.paramCardWide}>
                      <div className={styles.paramRow}>
                        <div className={styles.paramLabel}>Feed name:</div>
                        <div className={styles.paramValueBox}>
                          {step1.feedName || "Iphones feed"}
                        </div>
                      </div>
                    </div>

                    <div className={styles.paramCardMedium}>
                      <div className={styles.paramRow}>
                        <div className={styles.paramLabel}>Platform</div>
                        <div className={styles.paramValueBox}>
                          {step1.platform || "Choose from the list"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.paramGrid3}>
                    <div className={styles.paramCardSmall}>
                      <div className={styles.paramCol}>
                        <div className={styles.paramLabel}>Type of Business</div>
                        <div className={styles.paramValueBox}>
                          {step1.typeOfBusiness || "Choose from the list"}
                        </div>
                      </div>
                    </div>

                    <div className={styles.paramCardSmall}>
                      <div className={styles.paramCol}>
                        <div className={styles.paramLabel}>Update</div>
                        <div className={styles.paramValueBox}>
                          {step1.update || "Choose from the list"}
                        </div>
                      </div>
                    </div>

                    <div className={styles.paramCardSmall}>
                      <div className={styles.paramCol}>
                        <div className={styles.paramLabel}>Currency</div>
                        <div className={styles.paramValueBox}>
                          {step1.currency || "Choose from the list"}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Дополнительные параметры */}
                <section className={styles.section}>
                  <div className={styles.sectionHeader}>
                    <div className={styles.sectionTitle}>Дополнительные параметры</div>
                  </div>

                  <div className={styles.paramList}>
                    {additionalParams.slice(0, 2).map((p, idx) => {
                      const n = pad2(idx + 1);
                      return (
                        <div className={styles.paramLineCard} key={`${p.name}-${idx}`}>
                          <div className={styles.paramLine}>
                            <div className={styles.paramLineLeft}>
                              <div className={styles.paramNum}>{n}</div>
                              <div className={styles.paramName}>{p.name}</div>
                            </div>

                            <div className={styles.paramValueBox}>
                              {p.value || "Choose from the list"}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </>
            )}

            {stage === "converting" && (
              <div className={styles.centerStage}>
                <div className={styles.centerBlock}>
                  <div className={styles.ringWrap}>
                    <ProgressRing progress={progress} />
                    <div className={styles.centerIcon}>
                      <img src={convertingIcon} alt="" />
                    </div>
                  </div>

                  <div className={styles.centerHint}>
                    Осталось примерно {pad2(Math.floor(etaSec / 60))}:{pad2(etaSec % 60)}
                  </div>
                </div>

                <div className={styles.centerText}>
                  Подготавливаем полочку
                  <br />
                  для вашего фида...
                </div>
              </div>
            )}

            {stage === "done" && (
              <div className={styles.centerStage}>
                <div className={styles.centerBlock}>
                  <div className={styles.ringWrap}>
                    <ProgressRing progress={100} success />
                    <div className={styles.centerIcon}>
                      <img src={convertingSuccessIcon} alt="" />
                    </div>
                  </div>

                  <div className={styles.centerHint}>Ваш Feed готов!</div>
                </div>

                <div className={styles.doneBlock}>
                  <div className={styles.doneTitle}>Ваш Feed готов!</div>

                  <div className={styles.linkRow}>
                    <button
                      type="button"
                      className={styles.linkBtn}
                      onClick={copyLink}
                      title="Скопировать ссылку"
                    >
                      {feedUrl}
                    </button>

                    <button
                      type="button"
                      className={styles.iconBtn}
                      onClick={copyLink}
                      aria-label="Скопировать ссылку"
                      title="Скопировать ссылку"
                    >
                      <img src={clipboardIcon} alt="" />
                    </button>
                  </div>

                  <div className={styles.doneActions}>
                    <button type="button" className={styles.btnOutline} onClick={downloadFeed}>
                      <span>Скачать файл</span>
                      <img className={styles.btnIconDark} src={downloadFileIcon} alt="" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

function ProgressRing({
  progress,
  success,
}: {
  progress: number;
  success?: boolean;
}) {
  const r = 92;
  const c = 2 * Math.PI * r;
  const dash = (Math.max(0, Math.min(100, progress)) / 100) * c;

  return (
    <svg
      className={`${styles.ring} ${success ? styles.ringSuccess : ""}`}
      viewBox="0 0 240 240"
    >
      <circle className={styles.ringBg} cx="120" cy="120" r={r} />
      <circle
        className={styles.ringFg}
        cx="120"
        cy="120"
        r={r}
        style={{ strokeDasharray: `${dash} ${c - dash}` }}
      />
    </svg>
  );
}
