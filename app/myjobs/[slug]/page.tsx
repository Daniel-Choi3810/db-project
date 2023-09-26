import React from "react";

export default async function MyJobsWithId({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <header>
      <h1>My Job: {params.slug}</h1>
    </header>
  );
}
