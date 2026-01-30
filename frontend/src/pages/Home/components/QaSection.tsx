import { useMemo, useState } from "react";
import styles from "../Home.module.css";
import { FaqList } from "./FaqList";

export function QaSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const canSend = useMemo(() => {
    const okName = name.trim().length > 0;
    const okEmail = email.trim().length > 0; // если захочешь — добавим простую email-валидацию
    const okMsg = message.trim().length > 0;
    return okName && okEmail && okMsg && consent;
  }, [name, email, message, consent]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSend) return;

    // пока просто тест — потом подключишь отправку
    console.log({ name, email, message, consent });
  };

  return (
    <section className={styles.qaSection} aria-labelledby="qa-title">
      <h2 className={styles.qaTitle} id="qa-title">
        Задайте свой вопрос
      </h2>

      <div className={styles.qaRightTitle}>
        <span className={styles.qaRightTitleMain}>Часто задаваемые вопросы</span>
        <br />
        <a
          className={styles.qaRightLink}
          href="#"
          onClick={(e) => e.preventDefault()}
        >
          Больше задваемых вопросов по ссылке
        </a>
      </div>

      <form className={styles.qaForm} onSubmit={onSubmit}>
        <label className={styles.qaField}>
          <span className={styles.qaSrOnly}>Имя</span>
          <input
            className={styles.qaControl}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя: Иавн Иванов"
          />
        </label>

        <label className={styles.qaField}>
          <span className={styles.qaSrOnly}>Email</span>
          <input
            className={styles.qaControl}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email: ivan.ivanov@gmail.com"
          />
        </label>

        <label className={styles.qaField}>
          <span className={styles.qaSrOnly}>Сообщение</span>
          <textarea
            className={`${styles.qaControl} ${styles.qaTextareaControl}`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ваше сообщение..."
          />
        </label>

        <div className={styles.qaConsent}>
          <label className={styles.qaConsentRow}>
            <input
              className={styles.qaCheckboxNative}
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />

            <span className={styles.qaCheckboxVisual} aria-hidden="true" />

            <span className={styles.qaConsentText}>
              Оправляя сообщение вы подтверждаете, что ознакомились
              <br />с <span className={styles.qaConsentLink}>политикой конфиденциальности</span> и датете свое согласие на сбор
              <br />и обработку персональных данных
            </span>
          </label>

          <button
            className={`${styles.qaSendBtn} ${canSend ? styles.qaSendBtnEnabled : ""}`}
            type="submit"
            disabled={!canSend}
          >
            Отправить
          </button>
        </div>
      </form>

      <FaqList />
    </section>
  );
}
