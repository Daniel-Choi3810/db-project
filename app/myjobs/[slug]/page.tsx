import React from "react";

export default async function MyJobsWithId({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      <header>
        <h1>My Job: {params.slug}</h1>
      </header>
    </div>
  );
}
