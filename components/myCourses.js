import styles from "./myCourses.module.css";

import CourseCard from "./courseCard";

export default function MyCourses() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>My Courses</div>
      <hr className={styles.horizontalLine} />
      <div className={styles.gridContainer}>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        TODO: carousel for cards
      </div>
    </div>
  );
}
