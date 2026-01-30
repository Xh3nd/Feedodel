import styles from "../Home.module.css";

export function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaText}>Уже разобрались? Тогда давайте начнем</div>

      <button className={styles.primaryBtnLarge} type="button">
        Начать
      </button>
    </section>
  );
}
