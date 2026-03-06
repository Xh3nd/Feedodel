import { useState } from "react";
import styles from "./CabinetSubscription.module.css";

import homeIcon from "../../../assets/icons/home_icon.svg";

import faqOpenIcon from "../../../assets/icons/showdown_shown_icon.svg";
import faqClosedIcon from "../../../assets/icons/showdown_unshown_icon.svg";


type Period = "monthly" | "yearly";

export default function CabinetSubscription() {
  const [period, setPeriod] = useState<Period>("monthly");
  const [months, setMonths] = useState<number>(3);

  const [notifyBeforeEnd, setNotifyBeforeEnd] = useState(false);
  const [autoRenew, setAutoRenew] = useState(true);

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = [
    {
      question: "Какие форматы поддерживаются?",
      answer: `На данный момент нашим сервисом поддерживаются следующие форматы:
  CSV / TSV — любые разделители
  XML — Яндекс.Маркет, Google Merchant, VK Каталог, Facebook
  JSON — стандартный и кастомные схемы
  Excel — XLS, XLSX`,
    },
    {
      question: "Какое SKU максимально я могу загрузить?",
      answer:
        "Количество SKU зависит от выбранного тарифа. Подробности указаны в карточках планов выше.",
    },
    {
      question: "Можно ли изменить тариф позже?",
      answer:
        "Да, тариф можно сменить в любой момент. Изменения применяются мгновенно.",
    },
  ];

  return (
    <div className={styles.wrap}>
      {/* TITLE + BREADCRUMBS */}
      <div className={styles.header}>
        <div className={styles.h1}>Твоя подписка – твой путь!</div>

        <div className={styles.breadcrumbs}>
          <img src={homeIcon} alt="" className={styles.homeIcon} />
          <div className={styles.sep}>/</div>
          <div className={styles.crumb}>Profile</div>
          <div className={styles.sep}>/</div>
          <div className={styles.crumb}>Subscription</div>
        </div>
      </div>

      {/* PERIOD + PLAN BADGE */}
      <section className={styles.section}>
        <div className={styles.periodRow}>
          <div className={styles.periodLeft}>
            <div className={styles.sectionTitle}>На какой период?</div>

            <div className={styles.periodTabs}>
              <button
                type="button"
                className={`${styles.tab} ${period === "monthly" ? styles.tabActive : ""}`}
                onClick={() => setPeriod("monthly")}
              >
                Ежемесячно

                <div className={styles.stepper}>
                  <button
                    type="button"
                    className={styles.stepBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMonths((m) => Math.max(1, m - 1));
                    }}
                    aria-label="minus"
                  >
                    –
                  </button>

                  <div className={styles.stepValue}>{months}</div>

                  <button
                    type="button"
                    className={styles.stepBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMonths((m) => Math.min(36, m + 1));
                    }}
                    aria-label="plus"
                  >
                    +
                  </button>
                </div>
              </button>

              <button
                type="button"
                className={`${styles.tab} ${period === "yearly" ? styles.tabActive : ""}`}
                onClick={() => setPeriod("yearly")}
              >
                Ежегодно
              </button>
            </div>
          </div>

          <div className={styles.planRight}>
            <div className={styles.planLabel}>Ваш план:</div>
            <div className={styles.planBadge}>
              <div className={styles.planBadgeText}>Standart</div>
            </div>
          </div>
        </div>

        {/* PLANS */}
        <div className={styles.plansRow}>
          {/* STANDART */}
          <div className={styles.planCard}>
            <div className={styles.planHead}>
              <div className={styles.planName}>Standart</div>
              <div className={styles.planSub}>Малые возможности</div>
            </div>

            <div className={styles.hr} />

            <div className={styles.priceBox}>
              <div className={styles.priceMain}>Free</div>
              <div className={styles.priceSub}>all the time</div>
            </div>

            <div className={styles.hr} />

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Max SKU numbers:</div>
              <div className={styles.featureValue}>32 in one file</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Shortcuts:</div>
              <div className={styles.featureValue}>No</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Feeds history:</div>
              <div className={styles.featureValue}>No</div>
            </div>
          </div>

          {/* PRO */}
          <div className={`${styles.planCard} ${styles.planCardPro}`}>
            <div className={styles.planHead}>
              <div className={`${styles.planName} ${styles.planNamePro}`}>Pro</div>
              <div className={styles.planBadgeSmall}>Выбирают чаще всего</div>
              <div className={styles.planDesc}>
                Для всех начинающих
                <br />
                или желающих ускорить процесс
              </div>
            </div>

            <div className={`${styles.hr} ${styles.hrPro}`} />

            <div className={styles.priceBox}>
              <div className={styles.priceLine}>
                <div className={styles.priceMainPro}>300 руб.</div>
              </div>
              <div className={styles.priceSubPro}>in 3 month</div>
            </div>

            <button type="button" className={styles.btnGradient}>
              Сменить план
            </button>

            <div className={`${styles.hr} ${styles.hrPro}`} />

            <div className={styles.feature}>
              <div className={styles.featureLabelPro}>Max SKU numbers:</div>
              <div className={styles.featureValuePro}>100 in one file</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabelPro}>Shortcuts:</div>
              <div className={styles.featureValuePro}>Yes</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabelPro}>Feeds history:</div>
              <div className={styles.featureValuePro}>Yes</div>
            </div>
          </div>

          {/* EXPERT */}
          <div className={styles.planCard}>
            <div className={styles.planHeadBetween}>
              <div>
                <div className={styles.planName}>Expert</div>
                <div className={styles.planSubOrange}>Выбор эксперта</div>
                <div className={styles.planSub}>
                  Для профессионалов, масштабирующих производство
                </div>
              </div>

              <div className={styles.orangePill}>
                Неограниченные возможности
              </div>
            </div>

            <div className={styles.hr} />

            <div className={styles.priceBox}>
              <div className={styles.priceLine}>
                <div className={styles.priceMain}>990 руб.</div>
                <div className={styles.priceOld}>1200 руб.</div>
              </div>
              <div className={styles.priceSub}>in year</div>
            </div>

            <button type="button" className={styles.btnBlack}>
              Сменить план
            </button>

            <div className={styles.hr} />

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Max SKU numbers:</div>
              <div className={styles.featureValue}>Unlimited</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Shortcuts:</div>
              <div className={styles.featureValue}>Yes</div>
            </div>

            <div className={styles.feature}>
              <div className={styles.featureLabel}>Feeds history:</div>
              <div className={styles.featureValue}>Yes</div>
            </div>
          </div>
        </div>
      </section>

      {/* PAYMENT + SETTINGS */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div>
            <div className={styles.sectionTitle}>Обновить платёжные данные</div>
            <div className={styles.sectionDesc}>
              Здесь вы можете добавить новую карту или выбрать альтернативный способ оплаты.
              <br />
              Все изменения применяются мгновенно.
            </div>
          </div>

          <button type="button" className={styles.btnGhost}>
            Изменить
          </button>
        </div>

        <div className={styles.checkCard}>
          <label className={styles.checkRow}>
            <span className={styles.checkbox}>
              <input
                type="checkbox"
                checked={notifyBeforeEnd}
                onChange={(e) => setNotifyBeforeEnd(e.target.checked)}
              />
              <span className={styles.checkboxUi} />
            </span>

            <span className={styles.checkTitle}>
              Заранее оповещать об окончании подписки?
            </span>
          </label>

          <div className={styles.checkDesc}>
            Permission to send feed status notifications by email
          </div>
        </div>

        <div className={styles.checkCard}>
          <label className={styles.checkRow}>
            <span className={styles.checkbox}>
              <input
                type="checkbox"
                checked={autoRenew}
                onChange={(e) => setAutoRenew(e.target.checked)}
              />
              <span className={styles.checkboxUi} />
            </span>

            <span className={styles.checkTitle}>Автопродление подписки</span>
          </label>

          <div className={styles.checkDesc}>
            Permission to send feed status notifications by email
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <div className={styles.faqTitle}>Остались вопросы? У нас есть все ответы</div>
          <div className={styles.faqSubtitle}>
            Здесь вы найдете всю необходимую информацию о ценах, ваших возможностях
            <br />
            и многое другое.{" "}
            <span className={styles.faqLink}>Больше задаваемых вопросов по ссылке</span>
          </div>
        </div>

        <div className={styles.faqList}>
            {faqData.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                <div
                    key={index}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                >
                    <div
                    className={styles.faqQRow}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setOpenIndex(isOpen ? null : index);
                        }
                    }}
                    >
                        <div className={styles.faqQ}>{item.question}</div>
                        <div className={styles.faqBtn}>
                            <img
                                src={isOpen ? faqOpenIcon : faqClosedIcon}
                                alt=""
                                className={styles.faqBtnIcon}
                            />
                        </div>
                    </div>

                    {isOpen && (
                    <div className={styles.faqA}>
                        {item.answer.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                        ))}
                    </div>
                    )}
                </div>
                );
            })}
        </div>
      </section>

      {/* REQUEST */}
      <section className={styles.request}>
        <div className={styles.requestText}>
          <div className={styles.requestTitle}>
            Выбор подходящего плана может быть непростым решением, и мы хотим убедиться,
            <br />
            что вы сделаете лучший выбор. Оставьте заявку, и мы поможем вам с выбором.
          </div>
          <div className={styles.requestSub}>Обычно мы отвечаем в течение нескольких часов.</div>
        </div>

        <div className={styles.emailField}>
          Email: ivan.ivanov@gmail.com
        </div>

        <div className={styles.requestBottom}>
          <label className={styles.consent}>
            <span className={styles.checkbox}>
              <input type="checkbox" />
              <span className={styles.checkboxUi} />
            </span>

            <span className={styles.consentText}>
              Оправляя сообщение вы подтверждаете, что ознакомились
              <br />
              с <span className={styles.underlined}>политикой конфиденциальности</span> и датете свое согласие на сбор
              <br />
              и обработку персональных данных
            </span>
          </label>

          <button type="button" className={styles.btnDisabled} disabled>
            Оправить
          </button>
        </div>
      </section>
    </div>
  );
}
