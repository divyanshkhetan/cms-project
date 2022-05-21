import styles from "./navbar.module.css";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function NavBar({ createcourse = true }) {
  const { data: session, status } = useSession();

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.navbarContent}>
          <Link href="/">
            <div className="banner">CMS</div>
          </Link>
          <div className={styles.loginSection}>
            {session && session.user.userType == "faculty" && createcourse ? (
              <div className={styles.createCourse}>
                <Link href="/faculty/createCourse">
                  <button className={styles.createCourseBtn}>
                    Create Course
                  </button>
                </Link>
              </div>
            ) : null}
            {status === "authenticated" ? (
              <>
                <div className={styles.dropdown}>
                  <button className={styles.dropbtn}>
                    <div className={styles.userName}>{session.user.name}</div>
                    <div className={styles.dropdownicon}>
                      <Image
                        alt=""
                        src="/images/icons8-down-24.png"
                        width={10}
                        height={10}
                      />
                    </div>
                  </button>
                  <div className={styles.dropdownContent}>
                    <Link href="#">
                      <a>
                        <div className={styles.dropdownicon1}>
                          <Image
                            alt=""
                            src="/images/icons8-settings-50.png"
                            width={20}
                            height={20}
                          />
                          <span>Edit Profile</span>
                        </div>
                      </a>
                    </Link>
                    <a href="#">
                      <div onClick={() => signOut()}>
                        <div className={styles.dropdownicon1}>
                          <Image
                            alt=""
                            src="/images/icons8-logout-26.png"
                            width={20}
                            height={20}
                          />
                          <span>Logout</span>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
}
