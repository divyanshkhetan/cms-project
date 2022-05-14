import Image from "next/image";
import styles from "./courseCard.module.css";

export default function CourseCard() {
  return (
    <div className={styles.courseCard}>
      <div className={styles.courseCardImage}>
        <Image src="/images/courseCover.jpg" alt="" height={300} width={300} />
      </div>
      <div className={styles.courseCardInfo}>
        <h3>Little Course to make you feel good</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisi vel consectetur iaculis, nisl nisi consectetur nisl,
          eget consectetur nisl nisi eget.
        </p>
      </div>
    </div>
  );
}
