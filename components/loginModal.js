import styles from "./modal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
const classnames = require("classnames");

export default function LoginModal({ show, setShow, csrfToken }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const email = useRef(null);
  const password = useRef(null);
  const [userType, setUserType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  function modalHandler() {
    setShow(false);
  }

  function formValidator(userData) {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.userType === null
    ) {
      setErrorMessage("Please fill all the fields");
      return false;
    } else {
      return true;
    }
  }

  function loginHandler(e) {
    e.preventDefault();
    setErrorMessage(null);
    const userData = {
      email: email.current.value,
      password: password.current.value,
      userType: userType,
    };
    if (formValidator(userData)) {
      alert("Login Successful");
    }
  }

  function userTypeChangeHandler(e) {
    setUserType(e.target.value);
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
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
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
                  onChange={userTypeChangeHandler}
                  required
                />
                <label htmlFor="student">Student</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="faculty"
                  name="userType"
                  value="faculty"
                  onChange={userTypeChangeHandler}
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
