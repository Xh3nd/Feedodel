import styles from "./Login.module.css";
import logo from "../../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <img className={styles.logo} src={logo} alt="Feedodel" />

          <div className={styles.titleBlock}>
            <div className={styles.title}>Вход</div>
            <div className={styles.subtitle}>
              <span>Войдите в учетную запись</span>
              <br />
              <span>или пройдите </span>
              <Link className={styles.link} to="/register">
                регистрацию
              </Link>
            </div>
          </div>

          <div className={styles.form}>
            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.fieldLabel}>Email:</div>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="enter your email"
                  autoComplete="email"
                />
              </label>

              <label className={styles.field}>
                <div className={styles.fieldLabel}>Password:</div>
                <input
                  className={styles.input}
                  type="password"
                  placeholder="enter your password"
                  autoComplete="current-password"
                />
              </label>
            </div>

            <label className={styles.checkboxRow}>
              <input className={styles.checkbox} type="checkbox" />
              <span className={styles.checkboxText}>Оставаться в сети? </span>
            </label>
          </div>

          <button className={styles.button} type="button">
            Войти
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.rightTop}>
            <div className={styles.rightTitle}>А вы знали?</div>
            <div className={styles.rightText}>Интересный факт о фидах</div>
          </div>

          <div className={styles.rightBottom}>
            <div className={styles.policy}>
              Пользуясь нашим сервисом feedodle.com, вы соглашаетесь с{" "}
              <a className={styles.policyLink} href="#">
                нашей политикой конфиденциальности
              </a>{" "}
              и даете согласие на{" "}
              <a className={styles.policyLink} href="#">
                обработку персональных данных
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
