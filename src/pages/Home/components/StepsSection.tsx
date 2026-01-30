import styles from "../Home.module.css";

import step1Icon from "../../../assets/icons/step1_icon.svg";
import step2Icon from "../../../assets/icons/step2_icon.svg";
import step3Icon from "../../../assets/icons/step3_icon.svg";
import videoImg from "../../../assets/images/video.png";

export function StepsSection() {
  return (
    <section className={styles.stepsSection} aria-labelledby="steps-title">
      <header className={styles.stepsHeader}>
        <h2 className={styles.stepsTitle} id="steps-title">
          <span className={styles.stepsTitleAccent}>3 шага</span>{" "}
          <span className={styles.stepsTitleMain}>до идеального фида</span>
        </h2>

        <p className={styles.stepsSubtitle}>Простой и удобный в использовании</p>
      </header>

      <div className={styles.stepsContent}>
        {/* Левая колонка */}
        <div className={styles.stepsList}>
          <div className={`${styles.stepCard} ${styles.stepCardActive}`}>
            <img className={styles.stepIcon} src={step1Icon} alt="" />
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Шаг 1</div>
              <div className={styles.stepDesc}>
                Выберите платформу, настройте поля,
                <br />
                задайте свои параметры
              </div>
            </div>
          </div>

          <div className={styles.stepCard}>
            <img className={styles.stepIcon} src={step2Icon} alt="" />
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Шаг 2</div>
              <div className={styles.stepDesc}>
                Используйте систему драг&дроп,
                <br />
                или кнопку найти файл на своем устройстве
              </div>
            </div>
          </div>

          <div className={styles.stepCard}>
            <img className={styles.stepIcon} src={step3Icon} alt="" />
            <div className={styles.stepText}>
              <div className={styles.stepTitle}>Шаг 3</div>
              <div className={styles.stepDesc}>
                Получите готовый фид или настройте
                <br />
                автообновляемую ссылку как вам нужно
              </div>
            </div>
          </div>
        </div>

        {/* Правая колонка */}
        <div className={styles.stepsVideoBlock}>
          <img className={styles.stepsVideoImg} src={videoImg} alt="" />
          <div className={styles.stepsVideoText}>
            Просмотрите краткое видео-инструкцию
            <br />
            по использованию сервиса
          </div>
        </div>
      </div>
    </section>
  );
}

export function StepsOrDivider() {
  return (
    <div className={styles.stepsOr}>
      <span className={styles.stepsOrLine} />
      <span className={styles.stepsOrText}>или</span>
      <span className={styles.stepsOrLine} />
    </div>
  );
}
