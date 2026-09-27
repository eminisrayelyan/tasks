import "./globals.css";
import styles from "./layout.module.css";
import Link from "next/link";

export const metadata = {
  title: "ToDo App",
  description: "By Emin",
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body className={styles.body}>
        <nav className={styles.nav}>
          <Link href='/' className={styles.link}>Home</Link>
          <Link href='/create' className={styles.link}>Create</Link>
        </nav>
        <main className={styles.main}>
          { children }
        </main>
      </body>
    </html>

  );
}
