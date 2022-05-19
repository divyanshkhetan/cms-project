import styles from "./modal.module.css";
import Image from "next/image";
import { useRef, useState } from "react";
const classnames = require("classnames");
const axios = require("axios");

export default function SignupModal({ show, setShow }) {
  const showHideClassName = show ? "display-block" : "display-none";
  const name = useRef(null);
  const email = useRef(null);
  const rollno = useRef(null);
  const password = useRef(null);
  const [userType, setUserType] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function modalHandler() {
    setShow(false);
  }

  function passwordValidator(password) {
    if (password.length < 8) {
      setErrorMessage("Password must be atleast 8 characters");
      return false;
    } else if (password.search(/[a-z]/i) < 0) {
      setErrorMessage("Password must contain atleast one lowercase letter");
      return false;
    } else if (password.search(/[A-Z]/i) < 0) {
      setErrorMessage("Password must contain atleast one uppercase letter");
      return false;
    } else if (password.search(/[0-9]/) < 0) {
      setErrorMessage("Password must contain atleast one number");
      return false;
    } else {
      return true;
    }
  }

  function formValidator(userData) {
    if (userData.name === "") {
      setErrorMessage("Name cannot be empty");
      return false;
    } else if (userData.email === "") {
      setErrorMessage("Email cannot be empty");
      return false;
    } else if (userData.rollno === "") {
      setErrorMessage("Roll No cannot be empty");
      return false;
    } else if (userData.password === "") {
      setErrorMessage("Password cannot be empty");
      return false;
    } else if (userData.userType === null) {
      setErrorMessage("Please select user type");
      return false;
    } else if (!passwordValidator(userData.password)) {
      return false;
    } else {
      return true;
    }
  }

  function userTypeChangeHandler(e) {
    setUserType(e.target.value);
  }

  function signupHandler(e) {
    e.preventDefault();
    setErrorMessage(null);
    const userData = {
      name: name.current.value,
      email: email.current.value,
      rollno: rollno.current.value,
      password: password.current.value,
      userType: userType,
    };
    if (formValidator(userData)) {
      axios
        .post("/api/signup", userData)
        .then((res) => {
          if (res.data.success) {
            setSuccessMessage(res.data.message);
          } else {
            setErrorMessage(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMessage(err.response.data.message);
        });
    }
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
            {successMessage === null ? null : (
              <div className={styles.successMessage}>
                <span>
                  <Image
                    className={styles.successImage}
                    alt="Success!"
                    src="/images/icons8-ok-40.png"
                    width={20}
                    height={20}
                  />
                </span>
                <span>{successMessage}</span>
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
