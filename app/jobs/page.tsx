import prisma from "@/lib/prisma";
import React from "react";

export default async function Jobs() {
  const jobPostings: any = await prisma.$queryRaw`
    SELECT 
      JobPostings.*, 
      Company.name AS companyName 
    FROM 
      JobPostings 
    JOIN 
      Company ON JobPostings.companyID = Company.companyID 
    LIMIT 50;
  `;

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
    </div>
  );
}
