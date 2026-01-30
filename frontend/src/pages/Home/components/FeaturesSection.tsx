import styles from "../Home.module.css";

import feature1Icon from "../../../assets/icons/feature1_icon.svg";
import feature2Icon from "../../../assets/icons/feature2_icon.svg";
import feature3Icon from "../../../assets/icons/feature3_icon.svg";
import feature4Icon from "../../../assets/icons/feature4_icon.svg";

export function FeaturesSection() {
  return (
    <>
      {/* Заголовок "Почему маркетологи..." */}
      <div className={styles.whyTitle}>
        Почему маркетологи
        <br />
        выбирают Feedodel?
      </div>

      {/* FEATURE CARDS */}
      <div className={styles.features}>
        <div className={styles.featureCardLarge}>
          <img src={feature1Icon} className={styles.featureIcon} alt="" />
          <div className={styles.featureText}>
            Создан
            <br />для масштабирования
          </div>
        </div>

        <div className={styles.featureCardLarge}>
          <img src={feature2Icon} className={styles.featureIcon} alt="" />
          <div className={styles.featureText}>
            Универсальная
            <br />конвертация
          </div>
        </div>

        <div className={styles.featureCardSmall}>
          <img src={feature3Icon} className={styles.featureIconSmall} alt="" />
          <div className={styles.featureText}>
            Поддержка
            <br />сложных фидов
          </div>
        </div>

        <div className={styles.featureCardSmall}>
          <img src={feature4Icon} className={styles.featureIconSmall} alt="" />
          <div className={styles.featureText}>
            Умный маппинг
            <br />полей
          </div>
        </div>
      </div>
    </>
  );
}
