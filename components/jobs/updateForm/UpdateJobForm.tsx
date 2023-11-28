"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormField from "./FormField";
import MultiField from "./MultiField";
import { Button } from "@/components/ui/button";
import { CoinsIcon } from "lucide-react";

const jobTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
];

const experienceLevels = [
  { value: "Entry level", label: "Entry Level" },
  { value: "Mid-Senior level", label: "Mid-Senior Level" },
  { value: "Director", label: "Director" },
  { value: "Associate", label: "Associate" },
  { value: "Executive", label: "Executive" },
];

interface UpdateJobFormProps {
  job: {
    title: string;
    description: string;
    companyID: number;
    companyName: string;
    salary: number;
    jobPostURL: string;
    location: string;
    experienceLevel: string[];
    workType: string[];
    jobSkills: string[];
    benefits: string[];
  };
  jobID: number;
}

// add jobID parameter
const UpdateJobForm = ({ job, jobID }: UpdateJobFormProps) => {
  // router
  const router = useRouter();
  const [formData, setFormData] = useState({
    jobID: jobID,
    companyID: job.companyID,
    title: job.title,
    description: job.description,
    companyName: job.companyName,
    salary: job.salary,
    jobPostURL: job.location,
    location: job.jobPostURL,
    experienceLevel: job.experienceLevel,
    workType: job.workType,
    jobSkills: job.jobSkills,
    benefits: job.benefits,
  });

  // console.log("jobID: ", jobID);
  // console.log("companyID: ", job.companyID);
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const safeFormData = {
      ...formData,
      companyID: String(formData.companyID), // Assuming companyID is the BigInt
      // Add any other BigInt conversions here if necessary
    };
    try {
      fetch(`/api/update-job`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(safeFormData),
      });
      alert("Job posting updated!");
    } catch (error) {
      console.error("Handle form submit error: ", error);
    }
  };

  const handleChange = (name: any, value: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // For multi-select inputs
  const handleMultiChange = (name: any, options: any) => {
    const values = options.map((option: any) => option.value);
    handleChange(name, values);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormField
        jobInfo={job.title}
        formData={formData}
        handleChange={handleChange}
        fieldName="title"
      />
      <FormField
        jobInfo={job.description}
        formData={formData}
        handleChange={handleChange}
        fieldName="description"
      />
      <FormField
        jobInfo={job.companyName}
        formData={formData}
        handleChange={handleChange}
        fieldName="company"
      />
      <FormField
        jobInfo={job.salary}
        formData={formData}
        handleChange={handleChange}
        fieldName="salary"
      />
      <FormField
        jobInfo={job.location}
        formData={formData}
        handleChange={handleChange}
        fieldName="jobPostURL"
      />
      <FormField
        jobInfo={job.jobPostURL}
        formData={formData}
        handleChange={handleChange}
        fieldName="location"
      />
      <MultiField
        jobInfo={job.workType}
        jobTypes={jobTypes}
        handleMultiChange={handleMultiChange}
        fieldName="workType"
      />
      <MultiField
        jobInfo={job.experienceLevel}
        jobTypes={experienceLevels}
        handleMultiChange={handleMultiChange}
        fieldName="experienceLevel"
      />
      <Button
        variant="secondary"
        className="submit"
        onClick={() => router.push("/jobs")}
      >
        Update Job Posting
      </Button>
    </form>
  );
};

export default UpdateJobForm;
