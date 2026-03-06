import styles from "./RegisterSuccess.module.css";
import logo from "../../../assets/icons/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuthenticated } from "../../../utils/Auth";

export default function RegisterSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // на всякий случай: если вдруг сюда попали без "авторизации"
    // можно отправить на /register или /login — но я просто пущу на главную
    // (если хочешь — поменяем поведение)
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* LEFT */}
        <div className={styles.left}>
          <img className={styles.logo} src={logo} alt="Feedodel" />

          <div className={styles.textBlock}>
            <div className={styles.title}>Регистрация прошла успешна</div>

            <div className={styles.subtitle}>
              <span>
                Через несколько секунд будет переход на главную страницу, если
                этого не произошло, перейдите по{" "}
              </span>
              <Link className={styles.link} to="/">
                ссылке
              </Link>
            </div>

            {/* маленькая подсказка (можно убрать) */}
            <div className={styles.hint}>
              Статус авторизации: {isAuthenticated() ? "включён" : "выключен"}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.rules}>
            <div className={styles.ruleMuted}>
              <div className={styles.ruleTitleMuted}>Name</div>
              <div className={styles.ruleTextMuted}>
                Должен состоять из ... или не допускаются ...
              </div>
            </div>

            <div className={styles.ruleMuted}>
              <div className={styles.ruleTitleMuted}>Passwoerd</div>
              <div className={styles.ruleTextMuted}>
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
