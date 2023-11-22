import UpdateJobForm from "@/components/jobs/updateForm/UpdateJobForm";
import prisma from "@/lib/prisma";
import React from "react";

export default async function UpdatePage({
  params,
}: {
  params: { slug: number };
}) {
  const jobDetails: any = await prisma.$queryRaw`
    SELECT 
      JobPostings.*, 
      Company.name AS companyName
    FROM

        JobPostings
    JOIN
        Company ON JobPostings.companyID = Company.companyID
    WHERE
        JobPostings.jobID = ${params.slug}
    `;
  const job = jobDetails[0];
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 mt-20">
      <UpdateJobForm job={job} jobID={params.slug} />
    </div>
  );
}
