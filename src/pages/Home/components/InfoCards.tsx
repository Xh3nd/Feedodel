import styles from "../Home.module.css";

import arrowIcon from "../../../assets/icons/arrow_hero-button_icon.svg";

export function InfoCards() {
  return (
    <>
      {/* infoCard2 */}
      <div className={styles.infoCard2}>
        <div className={styles.infoText}>
          <div className={styles.infoTitle}>Будущее с нами это:</div>
          <div className={styles.infoSub}>
            Простой инструмент сегодня
            <br />— основа масштабируемой
            <br />
            маркетинговой платформы завтра.
          </div>
        </div>

        <button className={styles.infoArrowBtn} type="button" aria-label="Open">
          <img className={styles.arrowIcon} src={arrowIcon} alt="" />
        </button>
      </div>

      {/* infoCard1 */}
      <div className={styles.infoCard1}>
        <div className={styles.infoText}>
          <div className={styles.infoTitle}>Три шага до цели</div>
          <div className={styles.infoSub}>или краткое видео</div>
        </div>

        <button className={styles.infoArrowBtn} type="button" aria-label="Open">
          <img className={styles.arrowIcon} src={arrowIcon} alt="" />
        </button>
      </div>
    </>
  );
}
