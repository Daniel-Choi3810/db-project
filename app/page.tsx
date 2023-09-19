import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return (
    <>
      <header>
        <h1>Authentication Page</h1>
      </header>
      {session?.user?.name ? (
        <div>{session.user.name}</div>
      ) : (
        <div>Not Logged In</div>
      )}
    </>
  );
}
