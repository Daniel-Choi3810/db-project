export default async function JobsWithId({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <header>
      <h1>Job Description: {params.slug}</h1>
    </header>
  );
}
