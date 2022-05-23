import styles from "./joincourse.module.css";
import NavBar from "../../components/navbar";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function JoinCourse() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (session.user.userType !== "student") {
    return (
      <div>
        <NavBar />
        <div className={styles.container}>
          <h1>You are not authorized to view this page</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <NavBar joincourse={false} />
      <div className={styles.container}>Under Construction</div>
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
