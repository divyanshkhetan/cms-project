import styles from "./modal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
const classnames = require("classnames");

export default function LoginModal({ show, setShow }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const email = useRef(null);
  const password = useRef(null);
  const userType = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function modalHandler() {
    setShow(false);
  }

  function loginHandler(e) {
    e.preventDefault();
    const userData = {
      email: email.current.value,
      password: password.current.value,
      userType: userType.current.value,
    };
    console.log(userData);
  }

  return (
    <div className={classnames(styles.modal, showHideClassName)}>
      <section className={styles.modalMain}>
        <div className={styles.closeButton}>
          <Image
            alt="close the modal"
            src="/images/icons8-close-30.png"
            width={20}
            height={20}
            onClick={modalHandler}
          />
        </div>

        <div className={styles.modalContent}>
          <form>
            <div className={styles.headingPanel}>
              <h1>Login</h1>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={styles.formField}
                ref={email}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={styles.formField}
                ref={password}
                required
              />
            </div>
            <div className={styles.formGroupRadio}>
              <div>
                <input
                  type="radio"
                  id="student"
                  name="userType"
                  value="student"
                  ref={userType}
                />
                <label htmlFor="student">Student</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="faculty"
                  name="userType"
                  value="faculty"
                  ref={userType}
                />
                <label htmlFor="faculty">Faculty</label>
              </div>
            </div>
            {errorMessage === null ? null : (
              <div className={styles.errorMessage}>
                <span>
                  <Image
                    className={styles.errorImage}
                    alt="Error!"
                    src="/images/warning-sign-9747.png"
                    width={14}
                    height={14}
                  />
                </span>
                <span>{errorMessage}</span>
              </div>
            )}
            <button className={styles.submitButton} onClick={loginHandler}>
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
