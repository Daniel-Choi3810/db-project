import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function MyJobsWithId({
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
      <h1>My Job: {params.slug}</h1>
    </header>
  );
}
