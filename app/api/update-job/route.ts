import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request: { json: () => any }) {
  const res = await request.json();
  console.log(res);
  const jobID = res.jobID;
  const companyID = res.companyID;
  const title = res.title;
  const description = res.description;
  const salary = res.salary;
  const jobPostURL = res.jobPostURL;
  const location = res.location;
  const experienceLevel = res.experienceLevel.join(", ");
  const workType = res.workType.join(", ");
  const result = await prisma.$executeRawUnsafe(
    `
    UPDATE JobPostings
    SET
        companyID = ?,
        title = ?,
        description = ?,
        salary = ?,
        jobPostURL = ?,
        location = ?,
        experienceLevel = ?,
        workType = ?
    WHERE
        jobID = ?
    `,
    companyID,
    title,
    description,
    salary,
    jobPostURL,
    location,
    experienceLevel,
    workType,
    jobID
  );
  console.log(result);
  return NextResponse.json({ result });
}
