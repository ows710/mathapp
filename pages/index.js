import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Math App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Math Teacher</h1>
        <div className={styles.links}>
          <Link href="/arithmetic" legacyBehavior>
            <a className={`${styles.link} ${styles.calculator}`}>사칙연산</a>
          </Link>
          <Link href="/shapes" legacyBehavior>
            <a className={`${styles.link} ${styles.shapes}`}>다각형</a>
          </Link>
          <Link href="/matrix" legacyBehavior>
            <a className={`${styles.link} ${styles.matrix}`}>행렬</a>
          </Link>
          <Link href="/sets" legacyBehavior>
            <a className={`${styles.link} ${styles.sets}`}>집합</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
