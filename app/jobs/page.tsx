import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import NavMenu from "../common/NavMenu";

export default async function Jobs() {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/api/auth/signin");
  }
  return (
    <header>
      <h1>Jobs Page</h1>
    </header>
  );
}
