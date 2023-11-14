// app/jobs/[slug]/+page.tsx
"use server";

import React from "react";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/common/BackButton";

type JobPosting = {
  jobID: number;
  jobPostURL: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  workType: string;
  companyName: string;
};

export default async function JobsWithId({
  params,
}: {
  params: { slug: number };
}) {
  // Fetch the specific job data using the `slug` with a raw SQL query
  const jobs = await prisma.$queryRaw<JobPosting[]>`
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

  if (!jobs) {
    // Handle the case where the job is not found
    return <p>Job not found</p>;
  }

  // Assume job is the first element if found
  const jobDetails = jobs[0];

  // Render the job details with the layout from the image
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-[height_of_navbar] pb-[bottom_padding]">
      <div className="border p-6 rounded-md w-full max-w-4xl">
        <div className="flex items-center mb-4">
          <BackButton className="mr-4">Back</BackButton>
          <h1 className="text-3xl font-bold">
            {jobDetails.title} at {jobDetails.companyName}
          </h1>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg">{jobDetails.workType}</p>
            <p className="text-lg">{jobDetails.jobPostURL}</p>
          </div>
          <div>
            <p className="text-lg bg-green-200 rounded px-4 py-1">
              {jobDetails.salary}
            </p>
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p>{jobDetails.description}</p>
        {/* ... Additional sections like Key Qualifications ... */}
      </div>
    </div>
  );
}
