import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../components/layout/Header/Header";
import Footer from "../../../components/layout/Footer/Footer";
import { isAuthenticated } from "../../../utils/Auth";
import styles from "./FeedGeneratorStep2.module.css";

// imgs
import dndNonActiveImg from "../../../assets/images/drag-n-drop_non-active_img.png";
import dndActiveImg from "../../../assets/images/drag-n-drop_active_img.png";
import wrongFormatImg from "../../../assets/images/wrong-format_img.png";

// icons
import downloadIcon from "../../../assets/icons/download_icon.svg";
import downloadFailIcon from "../../../assets/icons/download-fail_icon.svg";
import downloadSuccessIcon from "../../../assets/icons/download-success_icon.svg";
import stepDoneIcon from "../../../assets/icons/step-done_icon.svg";

type UploadStage =
  | "idle"
  | "drag"
  | "wrong_format"
  | "uploading"
  | "fail_retry"
  | "fail_final"
  | "success";

const ACCEPTED_EXT = ["xlsx"];

async function fakeUpload(
  _file: File,
  onProgress: (p: number) => void,
  shouldFail: boolean
) {
  let p = 0;
  await new Promise<void>((resolve, reject) => {
    const id = window.setInterval(() => {
      p += 6;
      if (p > 100) p = 100;
      onProgress(p);

      if (p >= 100) {
        window.clearInterval(id);
        window.setTimeout(() => {
          if (shouldFail) reject(new Error("upload failed"));
          else resolve();
        }, 450);
      }
    }, 120);
  });
}

function formatBytes(bytes: number) {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(1)}mb`;
  const kb = bytes / 1024;
  return `${Math.round(kb)}kb`;
}

function getExt(name: string) {
  const n = name.toLowerCase();
  return n.split(".").pop() || "";
}

export default function FeedGeneratorStep2() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isEditMode = searchParams.get("mode") === "edit";

  useEffect(() => {
    if (!isAuthenticated()) navigate("/login", { replace: true });
  }, [navigate]);

  const [stage, setStage] = useState<UploadStage>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const shouldFailThisAttempt = useMemo(() => {
    return false; // если нужно тестировать фейл — поставь true
  }, []);

  const isXlsx = (f: File) => ACCEPTED_EXT.includes(getExt(f.name));

  const resetToIdle = () => {
    setStage("idle");
    setFile(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const startUpload = async (f: File, isRetry: boolean) => {
    setFile(f);
    setProgress(0);
    setStage("uploading");

    try {
      await fakeUpload(f, setProgress, shouldFailThisAttempt);
      setStage("success");
    } catch {
      setStage(isRetry ? "fail_final" : "fail_retry");
    }
  };

  const handlePickedFile = (f: File) => {
    setFile(f);
    setProgress(0);

    if (!isXlsx(f)) {
      setStage("wrong_format");
      return;
    }

    startUpload(f, false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (!f) {
      setStage("idle");
      return;
    }
    setStage("idle");
    handlePickedFile(f);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setStage("drag");
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    if ((e.currentTarget as HTMLElement).contains(e.relatedTarget as Node)) return;
    setStage("idle");
  };

  const openFileDialog = () => inputRef.current?.click();

  const dndImg =
    stage === "wrong_format"
      ? wrongFormatImg
      : stage === "drag"
      ? dndActiveImg
      : dndNonActiveImg;

  const canGoNext = stage === "success";

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
                <div className={styles.stepsCount}>2 / 3</div>
              </div>

              <div className={styles.stepCardDone}>
                <div className={styles.stepCardRow}>
                  <div className={styles.stepCardRowTitle}>Шаг 1: Настройки</div>
                  <span className={styles.stepDoneMark}>
                    <img src={stepDoneIcon} alt="" />
                  </span>
                </div>
              </div>

              <div className={styles.stepCardActive}>
                <div className={styles.stepCardTitle}>Шаг 2: Импорт xlsx</div>
                <div className={styles.stepCardText}>
                  Загрузите xlsx файл. Используйте систему драг&дроп, или кнопку
                  найти файл на своем устройстве.
                  <br />
                  <br />
                  Скачать шаблон xlsx можно по ссылке{" "}
                  <a
                    className={styles.link}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    нажав здесь
                  </a>
                  .
                </div>
              </div>

              <div className={styles.stepCardDisabled}>Шаг 3: Генерация xml</div>
            </div>

            <div className={styles.sidebarBottom}>
              <button
                type="button"
                className={styles.btnBack}
                onClick={() => navigate(`/feed-generator${isEditMode ? "?mode=edit" : ""}`)}
              >
                Назад
              </button>

              <button
                type="button"
                className={`${styles.btnNext} ${
                  !canGoNext ? styles.btnDisabled : ""
                }`}
                disabled={!canGoNext}
                onClick={() => {
                  navigate(`/feed-generator/step-3${isEditMode ? "?mode=edit" : ""}`);
                }}
              >
                Далее
              </button>
            </div>
          </aside>

          {/* RIGHT */}
          <main className={styles.content}>
            <div
              className={styles.dropArea}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
              onDragOver={onDragOver}
              onDrop={onDrop}
            >
              <div className={styles.center}>
                {/* Верхний текст показываем только в idle/drag/wrong_format */}
                {(stage === "idle" || stage === "drag" || stage === "wrong_format") && (
                  <div className={styles.titleBlock}>
                    <div
                      className={`${styles.centerTitle} ${
                        stage === "wrong_format" ? styles.titleWarn : ""
                      }`}
                    >
                      {stage === "wrong_format"
                        ? "ВНИМАНИЕ! Неверный формат файла."
                        : stage === "drag"
                        ? "Просто перетащите сюда файл"
                        : isEditMode
                        ? "Пропустите это шаг, если хотите использовать старый фал или загрузите новый"
                        : "Перетащите файл в окно браузера"}
                    </div>

                    {stage === "wrong_format" ? (
                      <div className={styles.centerSub}>
                        Поддерживаемые форматы: CSV / TSV (любые разделители), XML
                        (Яндекс.Маркет, Google Merchant, VK Каталог, Facebook), JSON
                        (стандартный и кастомные схемы), Excel (XLS, XLSX)
                        <div className={styles.helperLine}>
                          <span>Если вам необходим шаблон xlsx </span>
                          <a
                            className={styles.link}
                            href="#"
                            onClick={(e) => e.preventDefault()}
                          >
                            нажмите здесь
                          </a>
                        </div>
                      </div>
                    ) : (
                      <>
                        {isEditMode ? (
                          <div className={styles.helperLine}>
                            <span>Перетащите файл в окно браузера, если вам необходим шаблон xlsx </span>
                            <a
                              className={styles.link}
                              href="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              нажмите здесь
                            </a>
                          </div>
                        ) : (
                          <div className={styles.helperLine}>
                            <span>Если вам необходим шаблон xlsx </span>
                            <a
                              className={styles.link}
                              href="#"
                              onClick={(e) => e.preventDefault()}
                            >
                              нажмите здесь
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {/* CENTRAL VISUAL */}
                <div className={styles.visual}>
                  {stage === "uploading" && file ? (
                    <StatusBlock
                      variant="uploading"
                      icon={downloadIcon}
                      fileName={file.name}
                      fileSizeLine={`${formatBytes((file.size * progress) / 100)} of ${formatBytes(
                        file.size
                      )}`}
                      title="Загружаем ваш файл..."
                      progress={progress}
                    />
                  ) : stage === "success" && file ? (
                    <StatusBlock
                      variant="success"
                      icon={downloadSuccessIcon}
                      fileName={file.name}
                      fileSizeLine={formatBytes(file.size)}
                      title="Загрузка файла завершена!"
                    />
                  ) : stage === "fail_retry" ? (
                    <div className={styles.failOuter}>
                      <StatusBlock
                        variant="fail"
                        icon={downloadFailIcon}
                        title="Сбой загрузки"
                      />

                      <div className={styles.failDesc}>
                        При загрузке файла произошел сбой повторите загрузку файла или
                        загрузите новый
                      </div>

                      <div className={styles.failActions}>
                        <button
                          type="button"
                          className={styles.failBtnPrimary}
                          onClick={() => {
                            if (!file) return;
                            startUpload(file, true);
                          }}
                        >
                          Повторить
                        </button>

                        <button
                          type="button"
                          className={styles.failBtnSecondary}
                          onClick={resetToIdle}
                        >
                          Новый файл
                        </button>
                      </div>
                    </div>
                  ) : stage === "fail_final" ? (
                    <div className={styles.failOuter}>
                      <StatusBlock
                        variant="fail"
                        icon={downloadFailIcon}
                        title="Файл не загружен"
                      />

                      <div className={styles.failDesc}>
                        Файла не загружен, попробуйте загрузить новый файл
                      </div>

                      <div className={styles.failActions}>
                        <button
                          type="button"
                          className={styles.failBtnPrimary}
                          onClick={resetToIdle}
                        >
                          Новый файл
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      src={dndImg}
                      alt=""
                      className={styles.dndImg}
                      draggable={false}
                    />
                  )}
                </div>

                {/* BOTTOM ACTION (только когда выбираем файл) */}
                {(stage === "idle" || stage === "drag" || stage === "wrong_format") && (
                  <div className={styles.bottomBlock}>
                    <div className={styles.bottomTitle}>
                      или открыть файл с устройства
                    </div>

                    <button
                      type="button"
                      className={styles.findBtn}
                      onClick={openFileDialog}
                    >
                      Найти
                    </button>

                    <input
                      ref={inputRef}
                      type="file"
                      accept=".xlsx"
                      className={styles.hiddenInput}
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handlePickedFile(f);
                      }}
                    />
                  </div>
                )}

                {/* Нижние подсказки (как у тебя было) */}
                {stage === "fail_retry" && (
                  <div className={styles.failHint}>
                    Сбой мог произойти по разным причинам, одними из которых могут
                    быть нестабильный интернет или плохое соединение с сервером. Если
                    сбои продолжаются, обратитесь в поддержку.
                  </div>
                )}

                {stage === "fail_final" && (
                  <div className={styles.failHint}>
                    Файл не загружен — это означает, что файл либо поврежден, либо
                    содержит некорректные данные. Если ошибка повторилась, обратитесь
                    в{" "}
                    <a
                      className={styles.link}
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      поддержку
                    </a>
                    .
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </>
  );
}

/**
 * Единый центральный статусный блок:
 * - общая верстка
 * - модификаторы цвета/обводки для uploading/success/fail
 */
function StatusBlock({
  variant,
  icon,
  fileName,
  fileSizeLine,
  title,
  progress,
}: {
  variant: "uploading" | "success" | "fail";
  icon: string;
  fileName?: string;
  fileSizeLine?: string;
  title: string;
  progress?: number;
}) {
  const wrapClass =
    variant === "success"
      ? `${styles.status} ${styles.statusSuccess}`
      : variant === "fail"
      ? `${styles.status} ${styles.statusFail}`
      : `${styles.status} ${styles.statusUploading}`;

  return (
    <div className={wrapClass}>
      <div className={styles.statusTop}>
        {variant === "uploading" ? (
          <ProgressRing progress={progress ?? 0} />
        ) : (
          <StaticRing variant={variant} />
        )}

        <div className={styles.statusIcon}>
          <img src={icon} alt="" />
        </div>
      </div>

      {fileName && <div className={styles.statusFile} title={fileName}>{fileName}</div>}
      {fileSizeLine && <div className={styles.statusSize}>{fileSizeLine}</div>}

      <div className={styles.statusTitle}>{title}</div>
    </div>
  );
}

function ProgressRing({ progress }: { progress: number }) {
  const r = 92;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - progress / 100);

  return (
    <svg className={styles.ring} viewBox="0 0 240 240">
      <circle className={styles.ringBg} cx="120" cy="120" r={r} />
      <circle
        className={styles.ringFg}
        cx="120"
        cy="120"
        r={r}
        style={{
          strokeDasharray: c,
          strokeDashoffset: offset,
        }}
      />
    </svg>
  );
}

function StaticRing({ variant }: { variant: "success" | "fail" }) {
  return (
    <svg className={styles.ring} viewBox="0 0 240 240">
      <circle className={styles.ringBg} cx="120" cy="120" r={92} />
      <circle
        className={variant === "success" ? styles.ringSuccess : styles.ringFail}
        cx="120"
        cy="120"
        r={92}
      />
    </svg>
  );
}
