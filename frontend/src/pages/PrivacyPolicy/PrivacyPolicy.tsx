import { Header, Footer } from "../../components/layout";
import styles from "./PrivacyPolicy.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";

export default function PrivacyPolicy() {
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
            <h1 className={styles.heading}>Privacy policy</h1>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumbLine} />
              <span>/</span>
              <span>Contact Us &amp; FAQ&apos;s</span>
              <span>/</span>
              <span>Privacy policy</span>
            </div>
          </div>

          <section className={styles.policySection}>
            <article className={styles.policyItem}>
              <h2 className={styles.policyTitle}>Какие форматы поддерживаются?</h2>
              <div className={styles.policyText}>
                На данный момент нашим сервисом поддерживаются следующие форматы:
                <br />
                CSV / TSV - любые разделители
                <br />
                XML - Яндекс.Маркет, Google Merchant, VK Каталог, Facebook
                <br />
                JSON - стандартный и кастомные схемы
                <br />
                Excel - XLS, XLSX
              </div>
            </article>

            <article className={styles.policyItem}>
              <h2 className={styles.policyTitle}>Какое SKU максимально я могу загрузить?</h2>
              <div className={styles.policyTextLarge}>
                На данный момент нашим сервисом поддерживаются следующие форматы:
                <br />
                CSV / TSV - любые разделители
                <br />
                XML - Яндекс.Маркет, Google Merchant, VK Каталог, Facebook
                <br />
                JSON - стандартный и кастомные схемы
                <br />
                Excel - XLS, XLSX
              </div>
            </article>

            <article className={styles.policyItem}>
              <h2 className={styles.policyTitle}>Какое SKU максимально я могу загрузить?</h2>
              <div className={styles.policyTextLarge}>
                На данный момент нашим сервисом поддерживаются следующие форматы:
                <br />
                CSV / TSV - любые разделители
                <br />
                XML - Яндекс.Маркет, Google Merchant, VK Каталог, Facebook
                <br />
                JSON - стандартный и кастомные схемы
                <br />
                Excel - XLS, XLSX
              </div>
            </article>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
