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
    title: "",
    description: "",
    companyName: "",
    salary: 0,
    jobPostURL: "",
    location: "",
    experienceLevel: [],
    workType: [],
    jobSkills: [],
    benefits: [],
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    alert("Job posting updated!");
    // console.log(formData);
    try {
      fetch(`/api/update-job`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (error) {
      console.error(error);
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
