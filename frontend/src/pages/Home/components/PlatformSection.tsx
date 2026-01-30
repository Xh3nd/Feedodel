import styles from "../Home.module.css";

export function PlatformSection() {
  return (
    <section className={styles.platformSection} aria-labelledby="platform-title">
      <div className={styles.platformTopGlow} />

      <div className={styles.platformIntro}>
        <h2 className={styles.platformTitle} id="platform-title">
          Мы строим платформу, которая станет
          <br />
          больше, чем конвертер
        </h2>

        <p className={styles.platformSubtitle}>
          Сегодня — удобная генерация фидов. Завтра — аналитика, интеграции, автоматизация
          <br />
          и управление товарными данными на новом уровне. Feedodel растёт вместе с вашим бизнесом
        </p>
      </div>

      <div className={styles.platformContent}>
        <div className={styles.platformGroup}>
          <div className={styles.platformGroupHeader}>
            <div className={styles.platformGroupTitle}>Наши сервисы сейчас:</div>
          </div>

          <div className={styles.platformCardsRow}>
            <div className={styles.platformCardDefault}>
              <div className={styles.platformCardText}>
                <div className={styles.platformCardTitle}>Генератор Фидов</div>
                <div className={styles.platformCardDesc}>
                  Конвертируйте Excel в готовые фиды
                  <br />
                  за секунды.
                </div>
              </div>

              <button className={styles.platformCardBtn} type="button">
                Начать
              </button>
            </div>

            <div className={styles.platformCardPlaceholder} />
            <div className={styles.platformCardPlaceholder} />
          </div>
        </div>

        <div className={styles.platformGroup}>
          <div className={styles.platformGroupHeaderWide}>
            <div className={styles.platformGroupTitle}>Скоро запустим:</div>
          </div>

          <div className={styles.platformCardsRow}>
            <div className={styles.platformCardPlaceholder} />
            <div className={styles.platformCardPlaceholder} />
            <div className={styles.platformCardPlaceholder} />
          </div>
        </div>
      </div>
    </section>
  );
}
