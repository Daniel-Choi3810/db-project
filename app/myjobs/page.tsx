import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function MyJobs() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <header>
      <h1>My Jobs Page</h1>
    </header>
  );
}
