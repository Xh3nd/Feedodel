import Header from "../../../components/layout/Header/Header";
import Footer from "../../../components/layout/Footer/Footer";

import dropdownIcon from "../../../assets/icons/dropdown_icon.svg";
import closeIcon from "../../../assets/icons/close_icon.svg";
import plusBlackIcon from "../../../assets/icons/plus_black_icon.svg";

import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isAuthenticated } from "../../../utils/Auth";
import styles from "./FeedGeneratorStep1.module.css";

const PLATFORM_OPTIONS = [
  "Я.Бизнес",
  "Я.Товары",
  "Я.Услуги",
  "Я.Директ",
  "ВК.Реклама",
  "2Gis",
];

const CURRENCY_OPTIONS = ["dollar", "euro", "by", "rub", "tenge"];

const BUSINESS_TYPE_OPTIONS = [
  "Empty"
];

const UPDATE_OPTIONS = [
  "Empty"
];

/** маленький селект под макет */
function Dropdown({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const t = e.target as Node | null;
      if (ref.current && t && !ref.current.contains(t)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.dropdown} ref={ref}>
      <button
        type="button"
        className={styles.select}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={value ? styles.selectValue : styles.selectPlaceholder}>
          {value || placeholder}
        </span>
        <img src={dropdownIcon} alt="" className={styles.dropdownIcon}/>
      </button>

      {open && (
        <div className={styles.menu}>
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              className={styles.menuItem}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FeedGeneratorStep1() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditMode = searchParams.get("mode") === "edit";

  // защита: на страницу можно только авторизованным
  useEffect(() => {
    if (!isAuthenticated()) navigate("/login", { replace: true });
  }, [navigate]);

  // states
  const [feedName, setFeedName] = useState("");
  const [platform, setPlatform] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [update, setUpdate] = useState("");
  const [currency, setCurrency] = useState("");

  return (
    <>
    <Header />
    <div className={styles.page}>
      <div className={styles.body}>
        {/* LEFT */}
        <aside className={styles.sidebar}>
          <div className={styles.serviceSelect}>
            <div className={styles.serviceText}>Сервис: Генератор Feed</div>
            <span className={styles.chevronSmall} />
          </div>

          <div className={styles.steps}>
            <div className={styles.stepsHeader}>
              <div className={styles.stepsTitle}>Генератор Feed</div>
              <div className={styles.stepsCount}>1 / 3</div>
            </div>

            <div className={styles.stepCardActive}>
              <div className={styles.stepCardTitle}>Шаг 1: Настройки</div>
              <div className={styles.stepCardText}>
                Задайте имя фиду, выберите платформу, настройте поля, задайте
                свои параметры.
              </div>
            </div>

            <div className={styles.stepCardDisabled}>Шаг 2: Импорт xlsx</div>
            <div className={styles.stepCardDisabled}>Шаг 3: Генерация xml</div>
          </div>

          <div className={styles.sidebarBottom}>
            <button type="button" className={styles.btnBack} disabled>
              Назад
            </button>
            <button
              type="button"
              className={styles.btnNext}
              onClick={() => {
                navigate(`/feed-generator/step-2${isEditMode ? "?mode=edit" : ""}`);
                console.log({
                  feedName,
                  platform,
                  businessType,
                  update,
                  currency,
                });
              }}
            >
              Далее
            </button>
          </div>
        </aside>

        {/* RIGHT */}
        <main className={styles.content}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Обязательные параметры</div>
            </div>

            <div className={styles.grid}>
              {/* Feed name */}
              <div className={styles.cardWide}>
                <div className={styles.cardTitle}>Feed name:</div>
                <input
                  className={styles.input}
                  value={feedName}
                  onChange={(e) => setFeedName(e.target.value)}
                  placeholder="Iphones feed..."
                />
              </div>

              {/* Platform */}
              <div className={styles.cardMedium}>
                <div className={styles.cardTitle}>Platform</div>
                <Dropdown
                  value={platform}
                  placeholder="Choose from the list"
                  options={PLATFORM_OPTIONS}
                  onChange={setPlatform}
                />
              </div>

              {/* Type of Business (шаблон: потом сам расширишь) */}
              <div className={styles.cardSmall}>
                <div className={styles.cardTitle}>Type of Business</div>
                <Dropdown
                  value={businessType}
                  placeholder="Choose from the list"
                  options={BUSINESS_TYPE_OPTIONS}
                  onChange={setBusinessType}
                />
              </div>

              {/* Update (шаблон) */}
              <div className={styles.cardSmall}>
                <div className={styles.cardTitle}>Update</div>
                <Dropdown
                  value={update}
                  placeholder="Time update..."
                  options={UPDATE_OPTIONS}
                  onChange={setUpdate}
                />
              </div>

              {/* Currency */}
              <div className={styles.cardSmall}>
                <div className={styles.cardTitle}>Currency</div>
                <Dropdown
                  value={currency}
                  placeholder="Choose from..."
                  options={CURRENCY_OPTIONS}
                  onChange={setCurrency}
                />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
                <div className={styles.sectionTitle2}>Задайте нужный параметры</div>
            </div>

            <div className={styles.paramCard}>
                <div className={styles.paramHead}>
                <div className={styles.paramLeftHead}>
                    <div className={styles.paramNum}>01</div>
                    <div className={styles.paramName}>Param</div>
                </div>

                <button
                    type="button"
                    className={styles.paramRemoveBtn}
                    aria-label="Удалить параметр"
                >
                    <img src={closeIcon} alt="" />
                </button>
                </div>

                <input className={styles.input} placeholder="Your parameters..." />
            </div>

            <div className={styles.addRow}>
                <button type="button" className={styles.addBtn}>
                    <img
                    src={plusBlackIcon}
                    alt=""
                    className={styles.addIcon}
                    />
                    Добавить параметр
                </button>
            </div>
        </section>
        </main>
      </div>
    </div>

    <Footer />
    </>
  );
}
