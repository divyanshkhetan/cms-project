import styles from "./modal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
const classnames = require("classnames");

export default function SignupModal({ show, setShow }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const name = useRef(null);
  const email = useRef(null);
  const rollno = useRef(null);
  const password = useRef(null);
  const userType = useRef(null);
  const [errorMessage, setErrorMessage] = useState("Password incorrect");

  function modalHandler() {
    setShow(false);
  }

  function signupHandler(e) {
    e.preventDefault();
    const userData = {
      name: name.current.value,
      email: email.current.value,
      rollno: rollno.current.value,
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
              <h1>Sign Up</h1>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Enter your name"
                className={styles.formField}
                ref={name}
                required
              />
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
              <label htmlFor="rollno">Roll No</label>
              <input
                type="text"
                id="rollno"
                placeholder="Enter your roll no"
                className={styles.formField}
                ref={rollno}
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
            <button className={styles.submitButton} onClick={signupHandler}>
              Sign Up
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
