import Head from "next/head";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import LoginModal from "../components/loginModal";
import SignupModal from "../components/signupModal";
import { useState } from "react";
import { signIn, useSession, getSession } from "next-auth/react";

export default function Home() {
  const [signupModal, setSignupModal] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  function toggleSignupModal() {
    setSignupModal(!signupModal);
  }

  function toggleLoginModal() {
    setLoginModal(!loginModal);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>CMS | Learn Something New</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.container}>
        <div className={styles.headerContainer}>
          <div className="banner">CMS</div>
          <div className={styles.loginSection}>
            <button className={styles.signup} onClick={toggleSignupModal}>
              Sign Up
            </button>
            <button
              className={styles.login}
              onClick={() => signIn(undefined, { callbackUrl: "/dashboard" })}
            >
              Login
            </button>
          </div>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.vectorContainer}>
            <div className={styles.vectorText}>
              <div>
                <div className={styles.lsnText}>Learn</div>
                <div className={styles.lsnText}>Something</div>
                <div className={styles.lsnText}>New</div>
              </div>
            </div>
            <div className={styles.vector}>
              <Image
                alt="online education"
                src="/images/pablo-book-lover.png"
                width={800}
                height={600}
              />
            </div>
          </div>

          <div className={styles.featureList}>
            <div className={styles.feature}>
              <Image
                src="/images/icons8-quiz-100.png"
                alt=""
                width={75}
                height={75}
              />
              <div className={styles.featureText}>
                {" "}
                <div>Automated</div>
                <div>Assessment </div>{" "}
              </div>
            </div>
            <div className={styles.feature}>
              <Image
                src="/images/icons8-coaching-96.png"
                alt=""
                width={75}
                height={75}
              />
              <div className={styles.featureText}>
                {" "}
                <div>Mentor</div>
                <div>Support </div>{" "}
              </div>
            </div>
            <div className={styles.feature}>
              <Image
                src="/images/icons8-chat-96.png"
                alt=""
                width={75}
                height={75}
              />
              <div className={styles.featureText}>
                {" "}
                <div>Live</div>
                <div>Chatting </div>
              </div>
            </div>
          </div>
        </div>
        <SignupModal show={signupModal} setShow={setSignupModal} />
        <LoginModal show={loginModal} setShow={setLoginModal} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
