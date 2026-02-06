import styles from "./Home.module.css";

import { Header, Footer } from "../../components/layout";
import { HeroSection } from "./components/HeroSection";
import { InfoCards } from "./components/InfoCards";
import { FeaturesSection } from "./components/FeaturesSection";
import { StepsOrDivider, StepsSection } from "./components/StepsSection";
import { CtaSection } from "./components/CtaSection";
import { PlatformSection } from "./components/PlatformSection";
import { QaSection } from "./components/QaSection";

import { useEffect, useState } from "react";
import arrowIcon from "../../assets/icons/arrow_back-to-top_icon.svg";

export default function Home() {
  const [showUp, setShowUp] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowUp(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.heroSection}>
        <HeroSection />
        <InfoCards />
      </section>

      <section className={styles.whySection}>
        <FeaturesSection />
      </section>

      <section className={styles.stepsSectionWrapper}>
        <StepsSection />
        <StepsOrDivider />
      </section>

      <section className={styles.ctaSectionWrapper}>
        <CtaSection />
      </section>

      <section className={styles.platformSectionWrapper}>
        <PlatformSection />
      </section>

      <section className={styles.qaSectionWrapper}>
        <QaSection />
      </section>

      <Footer />

      {/* ⬆️ кнопка наверх */}
      <button
        type="button"
        className={`${styles.upBtn} ${showUp ? styles.upBtnShow : ""}`}
        onClick={scrollToTop}
        aria-label="Наверх"
      >
        <img className={styles.upBtnIcon} src={arrowIcon} alt="" />
      </button>
    </div>
  );
}
