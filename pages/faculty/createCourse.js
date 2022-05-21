import NavBar from "../../components/navbar";
import styles from "./createCourse.module.css";
import { useSession, getSession } from "next-auth/react";
import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CreateCourse() {
  const courseName = useRef(null);
  const courseDescription = useRef(null);
  const coursePrice = useRef(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      name: courseName.current.value,
      description: courseDescription.current.value,
      price: coursePrice.current.value === null ? 0 : coursePrice.current.value,
      instructor: session.user.rollno,
    };
    console.log(data);
    axios
      .post("/api/courses/create", data)
      .then((res) => {
        console.log(res);
        if (res.status && res.data.message == "Course created successfully") {
          router.push(`/course/${res.data.course.courseId}`);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

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
              ref={courseName}
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
              ref={courseDescription}
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
              ref={coursePrice}
            />
          </div>
          <button
            type="submit"
            className={styles.submit}
            onClick={submitHandler}
          >
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
