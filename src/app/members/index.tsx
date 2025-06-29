import { getSession } from "next-auth/react";
import MembersArea from "src/components/MembersArea";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login", // or your password entry page
        permanent: false,
      },
    };
  }

  return {
    props: {}, // you can pass data to MembersArea if needed
  };
}

export default function MembersPage() {
  return <MembersArea />;
}
