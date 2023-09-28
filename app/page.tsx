import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      {session?.user?.email ? (
        <div>Welcome back {session.user.email}, view jobs!</div>
      ) : (
        <div>Log in to view jobs</div>
      )}
    </div>
  );
}
