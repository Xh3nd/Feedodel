import { Navigate, useParams } from "react-router-dom";
import { Header, Footer } from "../../components/layout";
import styles from "./BlogPost.module.css";

import headerTopImg from "../../assets/images/header-top_img.png";
import heroArrowIcon from "../../assets/icons/arrow_hero-button_icon.svg";
import homeIcon from "../../assets/icons/home_icon.svg";
import { BLOG_POSTS } from "./blogData";

export default function BlogPost() {
  const { postId } = useParams();
  const post = BLOG_POSTS.find((item) => String(item.id) === postId);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

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
                — основа масштабируемой
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
            <h1 className={styles.heading}>{post.fullTitle}</h1>
            <div className={styles.breadcrumbs}>
              <img className={styles.breadcrumbHomeIcon} src={homeIcon} alt="" />
              <span>/</span>
              <span>Blog</span>
              <span>/</span>
              <span>{post.fullTitle}</span>
            </div>
          </div>

          <section className={styles.articleLayout}>
            <aside className={styles.mediaColumn}>
              <div className={styles.mainImageStub} />
              <div className={styles.previewRow}>
                <div className={styles.previewItem} />
                <div className={styles.previewItem} />
                <div className={styles.previewItem} />
              </div>
            </aside>

            <article className={styles.textColumn}>
              <div className={styles.textTitle}>{post.fullTextTitle}</div>
              <div className={styles.textBody}>
                {post.fullText.split("\n").map((line, idx) => (
                  <p key={idx} className={styles.textParagraph}>
                    {line}
                  </p>
                ))}
              </div>
            </article>
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}
