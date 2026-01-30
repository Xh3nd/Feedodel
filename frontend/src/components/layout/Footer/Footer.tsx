import styles from "./Footer.module.css";

import logoLight from "../../../assets/icons/logo_light.svg";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <img className={styles.footerLogo} src={logoLight} alt="Feedodel" />
          <div className={styles.footerTagline}>
            Фундамент для будущих<br />
            e-commerce решений
          </div>
        </div>

        <div className={styles.footerRight}>
          <div className={styles.footerTitle}>Site map</div>

          <div className={styles.footerCols}>
            <div className={styles.footerCol}>
              <a className={styles.footerLink} href="#">Home</a>
              <a className={styles.footerLink} href="#">Blog</a>
              <a className={styles.footerLink} href="#">Contact Us</a>
              <a className={styles.footerLink} href="#">FAQ’s</a>
            </div>

            <div className={styles.footerCol}>
              <a className={styles.footerLink} href="#">Personal account</a>
              <a className={styles.footerLink} href="#">Feeds</a>
              <a className={styles.footerLink} href="#">Generation Feed</a>
              <a className={styles.footerLink} href="#">Subscription</a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <a className={styles.footerPolicy} href="#">Privacy policy</a>
      </div>
    </footer>
  );
}
