import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      <header>
        <h1>Welcome Page</h1>
      </header>
      {session?.user?.email ? (
        <div>{session.user.email}</div>
      ) : (
        <div>Not Logged In</div>
      )}
    </div>
  );
}
