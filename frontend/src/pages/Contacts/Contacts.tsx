import { useState } from "react";
import type { FormEvent } from "react";
import { Header, Footer } from "../../components/layout";
import { Link } from "react-router-dom";
import styles from "./Contacts.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import faqOpenIcon from "../../assets/icons/showdown_shown_icon.svg";
import faqClosedIcon from "../../assets/icons/showdown_unshown_icon.svg";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";
import doneIcon from "../../assets/icons/done_icon.svg";

type FaqItem = {
  id: string;
  question: string;
  answer?: string;
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "formats",
    question: "Какие форматы поддерживаются?",
    answer:
      "На данный момент нашим сервисом поддерживаются следующие форматы:\n" +
      "CSV / TSV - любые разделители\n" +
      "XML - Яндекс.Маркет, Google Merchant, VK Каталог, Facebook\n" +
      "JSON - стандартный и кастомные схемы\n" +
      "Excel - XLS, XLSX",
  },
  { id: "speed", question: "Как быстро обрабатываются фиды?" },
  { id: "access", question: "Можно ли дать доступ команде?" },
  { id: "support", question: "Как работает техническая поддержка?" },
];

export default function Contacts() {
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || submitted) return;
    setSubmitted(true);
  };

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
            <h1 className={styles.heading}>Contact Us</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumbLine} />
              <span>/</span>
              <span>Contact Us &amp; FAQ&apos;s</span>
            </div>
          </div>

          <div className={styles.contactWrap}>
            <div className={styles.contactInfo}>
              <p className={styles.infoText}>
                Оставьте заявку, и мы поможем вам.
                <br />
                Обычно мы отвечаем в течение нескольких часов.
              </p>

              <p className={styles.infoText}>
                Или напиши нам на прямой адрес поддержки
                <br />
                <a href="mailto:support@feedodel.ru" className={styles.infoLink}>
                  support@feedodel.ru
                </a>
              </p>

              <p className={styles.infoText}>
                Так можете найти нас в социальных сетях
                <br />
                <a href="#" className={styles.infoLink}>
                  перейдя по ссылке
                </a>
              </p>
            </div>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.fields}>
                <label className={styles.srOnly} htmlFor="name">
                  Имя
                </label>
                <input
                  id="name"
                  className={styles.field}
                  type="text"
                  placeholder="Имя: Иван Иванов"
                />

                <label className={styles.srOnly} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  className={styles.field}
                  type="email"
                  placeholder="Email: ivan.ivanov@gmail.com"
                />

                <label className={styles.srOnly} htmlFor="message">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  className={`${styles.field} ${styles.textarea}`}
                  placeholder="Ваше сообщение..."
                />
              </div>

              <div className={styles.formBottom}>
                <label className={styles.consent}>
                  <input
                    className={styles.consentInput}
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                  />
                  <span className={styles.consentBox} aria-hidden="true" />

                  <span className={styles.consentText}>
                    Отправляя сообщение вы подтверждаете, что ознакомились
                    <br />
                    с{" "}
                    <Link className={styles.consentLink} to="/privacy-policy">
                      политикой конфиденциальности
                    </Link>{" "}
                    и датете свое согласие на сбор и обработку персональных данных
                  </span>
                </label>

                <button
                  className={`${styles.sendBtn} ${consent ? styles.sendBtnEnabled : ""} ${
                    submitted ? styles.sendBtnSubmitted : ""
                  }`}
                  type="submit"
                  disabled={!consent || submitted}
                >
                  <span className={styles.sendBtnText}>Отправить</span>
                  {submitted && (
                    <img className={styles.sendBtnDoneIcon} src={doneIcon} alt="Отправлено" />
                  )}
                </button>
              </div>
            </form>
          </div>

          <section className={styles.faqSection}>
            <div className={styles.faqHeaderBlock}>
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
              <p className={styles.faqSubtitle}>
                Здесь есть все, что может помочь или понадобиться
                <br />
                в пользовании сервисами Feedodel
              </p>
            </div>

            <div className={styles.faqContent}>
              <aside className={styles.faqLeft}>
                <div className={styles.searchWrap}>
                  <div className={styles.searchLabel}>Поиск по ключевым словам</div>
                  <input className={styles.searchInput} type="text" placeholder="Ваш вопрос" />
                </div>

                <div className={styles.faqCategories}>
                  <button type="button" className={styles.categoryBtn}>
                    Вопросы о главном
                  </button>
                  <button type="button" className={styles.categoryBtn}>
                    О личном кабинете
                  </button>
                  <button type="button" className={styles.categoryBtn}>
                    Настройки и поддержка
                  </button>
                  <button type="button" className={styles.categoryBtn}>
                    Политика и Cookie
                  </button>
                </div>
              </aside>

              <div className={styles.faqList}>
                {FAQ_ITEMS.map((item) => {
                  const isOpen = item.id === openId;

                  return (
                    <article
                      key={item.id}
                      className={isOpen ? styles.faqItemOpen : styles.faqItem}
                    >
                      <div className={styles.faqItemHeader}>
                        <h3 className={styles.faqItemQuestion}>{item.question}</h3>

                        <button
                          className={styles.faqToggle}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-${item.id}`}
                          onClick={() => setOpenId((prev) => (prev === item.id ? "" : item.id))}
                        >
                          <img
                            className={styles.faqToggleIcon}
                            src={isOpen ? faqOpenIcon : faqClosedIcon}
                            alt=""
                          />
                        </button>
                      </div>

                      {isOpen && item.answer && (
                        <div className={styles.faqItemBody} id={`faq-${item.id}`}>
                          <div className={styles.faqItemAnswer}>
                            {item.answer.split("\n").map((line, idx) => (
                              <div key={idx}>{line}</div>
                            ))}
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </div>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}



