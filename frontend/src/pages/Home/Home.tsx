import styles from "./Home.module.css";

import { Header, Footer } from "../../components/layout";
import { HeroSection } from "./components/HeroSection";
import { InfoCards } from "./components/InfoCards";
import { FeaturesSection } from "./components/FeaturesSection";
import { StepsOrDivider, StepsSection } from "./components/StepsSection";
import { CtaSection } from "./components/CtaSection";
import { PlatformSection } from "./components/PlatformSection";
import { QaSection } from "./components/QaSection";

export default function Home() {
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
    </div>
  );
}
