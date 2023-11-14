import PaginationControls from "@/components/common/PaginationControls";
import prisma from "@/lib/prisma";
import React from "react";

export default async function Jobs({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const page = parseInt(searchParams?.page as string) || 1;
  const perPage = parseInt(searchParams?.per_page as string) || 50;

  // Calculate the number of job postings to skip (offset)
  const offset = (page - 1) * perPage;

  // Fetch the paginated job postings directly from the database
  const jobPostings: any[] = await prisma.$queryRaw`
    SELECT 
      JobPostings.*, 
      Company.name AS companyName 
    FROM 
      JobPostings 
    JOIN 
      Company ON JobPostings.companyID = Company.companyID
    LIMIT ${perPage} OFFSET ${offset};
  `;

  // Fetch the total count of job postings for pagination controls
  const totalPostings: any[] =
    await prisma.$queryRaw`SELECT COUNT(*) as count FROM JobPostings;`;
  const total = totalPostings[0].count;

  if (page < 1 || page > Math.ceil(Number(BigInt(total) / BigInt(perPage)))) {
    // Return a 404 response or redirect to a valid page
    return {
      notFound: true, // This will return a 404 page
      // Alternatively, you could redirect to the last valid page
      // redirect: {
      //   destination: `/?page=${Math.ceil(total / perPage)}&per_page=${perPage}`,
      //   permanent: false,
      // },
    };
  }

  return (
    <div className="relative flex flex-col justify-center items-center mt-20">
      <header>
        <h1>Jobs Page</h1>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {jobPostings.map((jobPosting: any) => (
          <div className="card w-80 bg-white rounded-lg shadow-md m-4 p-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <h2 className="text-black font-bold text-xl">
                {jobPosting.title}
              </h2>
              <p className="text-gray-500">{jobPosting.jobPostURL}</p>
            </div>

            <div className="flex justify-between mt-2">
              <p className="text-gray-700 font-medium">
                {jobPosting.companyName}
              </p>
              <div className="flex space-x-2">
                <span className="bg-green-500 text-white py-1 px-2 rounded">{`$${jobPosting.salary}`}</span>
                <span className="bg-blue-500 text-white py-1 px-2 rounded">
                  {jobPosting.workType}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PaginationControls
        hasNextPage={page * perPage < total}
        hasPrevPage={page > 1}
        currentPage={page}
        total={total}
        perPage={perPage}
      />
    </div>
  );
}
