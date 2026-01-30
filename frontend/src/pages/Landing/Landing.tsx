import { Header } from "../../components/layout";
import styles from "./Landing.module.css"
import heroImg from "/src/assets/images/hero-img.png"

export default function Landing() {
  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <img src={heroImg} className={styles.heroImg} />

        <div className={styles.heroContent}>
          <h1>
            Фундамент для будущих <br />
            <span>e-commerce</span> решений
          </h1>

          <p>
            Конвертируйте Excel в готовые фиды <br />
            для маркетплейсов за секунды.
          </p>

          <button className={styles.cta}>Начать</button>
        </div>
      </section>
    </div>
  )
}
