import { useRouter } from "next/router";
import NavBar from "../../components/navbar";
import useSWR from "swr";
import axios from "axios";
import styles from "./[courseId].module.css";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function CoursePage() {
  const router = useRouter();
  const { courseId } = router.query;
  const queryurl = `/api/courses/${courseId}`;
  const { data, error } = useSWR(queryurl, fetcher);

  return (
    <>
      <NavBar />
      <div>
        {error && (
          <div className={styles.container}>
            Error:500 - Internal Server Error{" "}
          </div>
        )}
        {data && (
          <>
            <div className={styles.container}>
              <div className={styles.courseName}>{data.course.name}</div>
              <div className={styles.detailContainer}>
                <div>About the Course</div>
                <p>{data.course.description}</p>
              </div>
              <div className={styles.detailContainer}>
                <p>
                  <span>Price: ₹</span>
                  {data.course.price === null ? 0 : data.course.price}
                </p>
              </div>
              <div className={styles.detailContainer}>
                <p>
                  <span>Students Enrolled: </span>
                  {data.course.enrolled}{" "}
                </p>
              </div>
              <div className={styles.detailContainer}>
                <p>
                  <span>Course Duration: </span>
                  {data.course.duration}
                </p>
              </div>
              <div className={styles.detailContainer}>
                <p>
                  <span>Instructor Name: </span>
                  {data.course.instructorName} ({data.course.instructorRollno})
                </p>
              </div>
              <div className={styles.detailContainer}>
                <p>
                  <span>Instructor Email: </span>
                  <a href={`mailto:${data.course.instructorEmail}`}>
                    {data.course.instructorEmail}
                  </a>
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
