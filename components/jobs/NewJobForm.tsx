"use client";
import React, { useState } from "react";
import TextFormField from "./TextFormField";
import MultiFormField from "./MultiFormField";
import { Button } from "../ui/button";

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
  { value: "Associate", label: "associate" },
  { value: "Executive", label: "Executive" },
];

const NewJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
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
    try {
      fetch("/api/add-job", {
        method: "POST",
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
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="title"
      />
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="description"
      />
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="company"
      />
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="salary"
      />
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="jobPostURL"
      />
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="location"
      />
      <MultiFormField
        jobTypes={jobTypes}
        handleMultiChange={handleMultiChange}
        fieldName="workType"
      />
      <MultiFormField
        jobTypes={experienceLevels}
        handleMultiChange={handleMultiChange}
        fieldName="experienceLevel"
      />

      <Button variant="secondary" className="submit">
        Create Job Posting
      </Button>
    </form>
  );
};

export default NewJobForm;
