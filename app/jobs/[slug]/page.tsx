export default async function JobsWithId({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen overflow-hidden">
      <header>
        <h1>Job Description: {params.slug}</h1>
      </header>
    </div>
  );
}
