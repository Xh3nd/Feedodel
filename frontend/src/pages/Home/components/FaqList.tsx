import { useState } from "react";
import styles from "../Home.module.css";

import faqOpenIcon from "../../../assets/icons/showdown_shown_icon.svg";
import faqClosedIcon from "../../../assets/icons/showdown_unshown_icon.svg";

type FaqItem = { id: string; q: string; a: string };

const DEFAULT_FAQ: FaqItem[] = [
  {
    id: "formats",
    q: "Какие форматы поддерживаются?",
    a:
      "На данный момент нашим сервисом поддерживаются следующие форматы:\n" +
      "CSV / TSV — любые разделители\n" +
      "XML — Яндекс.Маркет, Google Merchant, VK Каталог, Facebook\n" +
      "JSON — стандартный и кастомные схемы\n" +
      "Excel — XLS, XLSX",
  },
  {
    id: "sku",
    q: "Какое SKU максимально я могу загрузить?",
    a:
      "На данный момент нашим сервисом поддерживаются следующие форматы:\n" +
      "CSV / TSV — любые разделители\n" +
      "XML — Яндекс.Маркет, Google Merchant, VK Каталог, Facebook\n" +
      "JSON — стандартный и кастомные схемы\n" +
      "Excel — XLS, XLSX",
  },
  {
    id: "sku2",
    q: "Какое SKU максимально я могу загрузить?",
    a:
      "На данный момент нашим сервисом поддерживаются следующие форматы:\n" +
      "CSV / TSV — любые разделители\n" +
      "XML — Яндекс.Маркет, Google Merchant, VK Каталог, Facebook\n" +
      "JSON — стандартный и кастомные схемы\n" +
      "Excel — XLS, XLSX",
  },
];

export function FaqList({ items = DEFAULT_FAQ }: { items?: FaqItem[] }) {
  const [openId, setOpenId] = useState<string>(items[0]?.id ?? "");

  return (
    <div className={styles.faqList}>
      {items.map((it) => {
        const isOpen = it.id === openId;

        return (
          <div
            key={it.id}
            className={isOpen ? styles.faqItemOpen : styles.faqItem}
          >
            <div className={styles.faqHeader}>
              <div className={styles.faqQuestion}>{it.q}</div>

              <button
                className={styles.faqToggle}
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${it.id}`}
                onClick={() => setOpenId((prev) => (prev === it.id ? "" : it.id))}
              >
                <img
                  className={styles.faqToggleIcon}
                  src={isOpen ? faqOpenIcon : faqClosedIcon}
                  alt=""
                />
              </button>
            </div>

            {isOpen && (
              <div className={styles.faqBody} id={`faq-${it.id}`}>
                <div className={styles.faqAnswer}>
                  {it.a.split("\n").map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
