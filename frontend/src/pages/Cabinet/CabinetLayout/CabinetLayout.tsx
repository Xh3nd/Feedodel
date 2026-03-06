import { Outlet } from "react-router-dom";
import styles from "./CabinetLayout.module.css";

// ✅ подставь свои реальные пути:
import Header from "../../../components/layout/Header/Header";
import Footer from "../../../components/layout/Footer/Footer";

import CabinetSidebar from "../CabinetSidebar/CabinetSidebar";

export default function CabinetLayout() {
  return (
    <div className={styles.page}>
      <Header />

      {/* контент ниже фиксированного header */}
      <div className={styles.pageInner}>
        <div className={styles.inner}>
          <CabinetSidebar />
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
