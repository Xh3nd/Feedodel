import styles from "../Home.module.css";

import heroImg from "../../../assets/images/hero-img.png";

export function HeroSection() {
  return (
    <>
      {/* HERO IMG (в плагине картинки нет, но у тебя в макете она есть — кладем под всё) */}
      <img className={styles.heroImg} src={heroImg} alt="" />

      {/* HERO блок (как в плагине) */}
      <div className={styles.heroHighlight} />

      <div className={styles.heroTitle}>
        Фундамент для будущих<br />
        e-commerce решений
      </div>

      <div className={styles.heroRow}>
        <div className={styles.heroDesc}>
          Конвертируйте Excel в готовые фиды
          <br />
          для маркетплейсов за секунды.
        </div>

        <button className={styles.primaryBtn} type="button">
          Начать
        </button>
      </div>
    </>
  );
}
