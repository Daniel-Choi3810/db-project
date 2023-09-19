import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function JobsWithId({
  params,
}: {
  params: { slug: string };
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <header>
      <h1>Job Description: {params.slug}</h1>
    </header>
  );
}
