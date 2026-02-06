import styles from "./Register.module.css";
import logo from "../../../assets/icons/logo.svg";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <img className={styles.logo} src={logo} alt="Feedodel" />

          <div className={styles.titleBlock}>
            <div className={styles.title}>Регистрация</div>
            <div className={styles.subtitle}>
              <span>Вы уже зарегистрированы? </span>
              <Link className={styles.link} to="/login">
                Войти
              </Link>
            </div>
          </div>

          <div className={styles.form}>
            <div className={styles.fields}>
              <label className={styles.field}>
                <div className={styles.fieldLabel}>Name:</div>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="enter your name"
                  autoComplete="name"
                />
              </label>

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
                  autoComplete="new-password"
                />
              </label>
            </div>

            <div className={styles.checkboxes}>
              <label className={styles.checkboxRow}>
                <input className={styles.checkbox} type="checkbox" />
                <span className={styles.checkboxText}>
                  Хотите получать уведомления об изменении фидов на ваш email?
                </span>
              </label>

              <label className={styles.checkboxRow}>
                <input className={styles.checkbox} type="checkbox" />
                <span className={styles.checkboxText}>Оставаться в сети?</span>
              </label>
            </div>
          </div>

          <button className={styles.button} type="button">
            Зарегистрироваться
          </button>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.rules}>
            <div className={styles.rule}>
              <div className={styles.ruleTitle}>Name</div>
              <div className={styles.ruleText}>
                Должен состоять из ... или не допускаются ...
              </div>
            </div>

            <div className={styles.rule}>
              <div className={styles.ruleTitle}>Password</div>
              <div className={styles.ruleText}>
                Должен состоять из ... или не допускаются ...
              </div>
            </div>

            <div className={styles.rule}>
              <div className={styles.ruleTitle}>Email</div>
              <div className={styles.ruleText}>
                Подтвердите свою учётную запись в течении 72 часов. Вам на Email
                будет отправлено письмо с вашими данными и ссылкой для
                подтверждения. Если этого не сделать, аккаунт будет не
                действителен и будет заморожен до подтверждения
              </div>
            </div>
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
