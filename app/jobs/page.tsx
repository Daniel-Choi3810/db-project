import PaginationControls from "@/components/common/PaginationControls";
import JobCard from "@/components/jobs/JobCard";
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

  return (
    <div className="relative flex flex-col justify-center items-center mt-20">
      <header>
        <h1>Jobs Page</h1>
      </header>
      <div className="grid grid-cols-3 gap-4">
        {jobPostings.map((jobPosting: any) => (
          <JobCard
            key={jobPosting.jobID}
            jobID={jobPosting.jobID}
            title={jobPosting.title}
            jobPostURL={jobPosting.jobPostURL}
            companyName={jobPosting.companyName}
            salary={jobPosting.salary}
            workType={jobPosting.workType}
          />
        ))}
      </div>
      <PaginationControls currentPage={page} total={total} perPage={perPage} />
    </div>
  );
}
