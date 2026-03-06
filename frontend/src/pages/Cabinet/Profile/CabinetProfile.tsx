import { useMemo, useState } from "react";
import styles from "./CabinetProfile.module.css";

import homeIcon from "../../../assets/icons/home_icon.svg";

type ProfileForm = {
  name: string;
  email: string;
  password: string; // новый пароль (в UI будет заменять ************)
};

export default function CabinetProfile() {
  // TODO: позже подставим реальные данные из твоего auth/store
  const initial = useMemo<ProfileForm>(
    () => ({
      name: "Druzyanov Yan",
      email: "yandruzyanov@gmail.com",
      password: "",
    }),
    []
  );

  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState<ProfileForm>(initial);
  const [draft, setDraft] = useState<ProfileForm>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileForm, string>>>(
    {}
  );

  const onEdit = () => {
    setDraft(form);
    setErrors({});
    setIsEdit(true);
  };

  const onCancel = () => {
    setDraft(form);
    setErrors({});
    setIsEdit(false);
  };

  const validate = (data: ProfileForm) => {
    const next: Partial<Record<keyof ProfileForm, string>> = {};

    if (!data.name.trim()) next.name = "Введите имя";

    // простая проверка email
    if (!data.email.trim()) next.email = "Введите email";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Некорректный email";

    // пароль можно не менять (пусто = не менять)
    if (data.password && data.password.length < 8) {
      next.password = "Минимум 8 символов";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSave = () => {
    if (!validate(draft)) return;

    // TODO: тут будет запрос на бэк / обновление профиля
    setForm({
      name: draft.name.trim(),
      email: draft.email.trim(),
      password: "", // не храним пароль в стейте
    });

    setIsEdit(false);
  };

  const onChange =
    (key: keyof ProfileForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setDraft((p) => ({ ...p, [key]: e.target.value }));
    };

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.h1}>Параметры профиля</div>
        <div className={styles.breadcrumbs}>
          <img src={homeIcon} alt="" className={styles.homeIcon} />
          <div className={styles.sep}>/</div>
          <div className={styles.crumb}>Profile</div>
        </div>
      </div>

      {/* Основные данные */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Основные данные</div>

          {!isEdit ? (
            <button className={styles.btnGhost} onClick={onEdit}>
              Изменить
            </button>
          ) : (
            <div className={styles.actions}>
              <button className={styles.btnGhost} onClick={onCancel}>
                Отмена
              </button>
              <button className={styles.btnPrimary} onClick={onSave}>
                Сохранить
              </button>
            </div>
          )}
        </div>

        <div className={styles.cardCol}>
          {/* Name */}
          <div className={styles.rowCard}>
            <div className={styles.rowLabel}>Name</div>

            {!isEdit ? (
              <div className={styles.valueBox}>
                <div className={styles.valueText}>{form.name}</div>
              </div>
            ) : (
              <div className={styles.fieldCol}>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                  value={draft.name}
                  onChange={onChange("name")}
                  placeholder="Введите имя"
                />
                {errors.name && <div className={styles.errorText}>{errors.name}</div>}
              </div>
            )}
          </div>

          {/* Email */}
          <div className={styles.rowCard}>
            <div className={styles.rowLabel}>Email</div>

            {!isEdit ? (
              <div className={styles.valueBox}>
                <div className={styles.valueText}>{form.email}</div>
              </div>
            ) : (
              <div className={styles.fieldCol}>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  value={draft.email}
                  onChange={onChange("email")}
                  placeholder="email@example.com"
                />
                {errors.email && <div className={styles.errorText}>{errors.email}</div>}
              </div>
            )}
          </div>

          {/* Password */}
          <div className={styles.rowCard}>
            <div className={styles.rowLabel}>Password</div>

            {!isEdit ? (
              <div className={styles.valueBox}>
                <div className={styles.valueText}>**************</div>
              </div>
            ) : (
              <div className={styles.fieldCol}>
                <input
                  className={`${styles.input} ${
                    errors.password ? styles.inputError : ""
                  }`}
                  value={draft.password}
                  onChange={onChange("password")}
                  placeholder="Новый пароль (если нужно)"
                  type="password"
                />
                {errors.password && (
                  <div className={styles.errorText}>{errors.password}</div>
                )}
                <div className={styles.hintText}>
                  Оставь пустым, если не хочешь менять пароль
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Уведомления */}
      <section className={styles.section}>
        <div className={styles.sectionTop}>
          <div className={styles.sectionTitle}>Уведомления</div>
        </div>

        <div className={styles.notifyCard}>
          <div className={styles.notifyTop}>
            <div className={styles.checkbox} />
            <div className={styles.notifyTitle}>Notifications to your email</div>
          </div>
          <div className={styles.notifyDesc}>
            Permission to send feed status notifications by email
          </div>
        </div>
      </section>

      {/* Удаление аккаунта */}
      <div className={styles.deleteRow}>
        <div className={styles.sectionTitle}>Удаление аккаунта</div>
        <button className={styles.btnGhost}>Удалить аккаунт</button>
      </div>
    </div>
  );
}
