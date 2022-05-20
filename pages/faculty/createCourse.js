import NavBar from "../../components/navbar";
import styles from "./createCourse.module.css";
import { getSession } from "next-auth/react";

export default function CreateCourse() {
  return (
    <>
      <NavBar createcourse={false} />
      <div className={styles.container}>
        <h1>Create Course</h1>
        <form>
          <div className={styles.formGroup}>
            <label htmlFor="courseName">Course Name</label>
            <input
              type="text"
              className={styles.formControl}
              id="courseName"
              placeholder="Enter Course Name"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              type="text"
              className={styles.formControl}
              id="courseDescription"
              placeholder="Enter Course Description"
              rows={5}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="coursePrice">Course Price (in ₹)</label>
            <input
              type="number"
              className={styles.formControl}
              id="coursePrice"
              placeholder="Enter Course Price"
            />
          </div>
          <button type="submit" className={styles.submit}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (session) {
    return { props: { session } };
  } else {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
}
