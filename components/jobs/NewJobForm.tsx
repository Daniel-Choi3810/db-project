"use client";
import React, { useState } from "react";
import Select from "react-select"; // This should be installed with `npm install react-select` or `yarn add react-select`
import TextFormField from "./TextFormField";
import MultiFormField from "./MultiFormField";

const jobTypes = [
  { value: "FULL_TIME", label: "Full Time" },
  { value: "PART_TIME", label: "Part Time" },
  { value: "CONTRACT", label: "Contract" },
  { value: "INTERNSHIP", label: "Internship" },
  // ... other options
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
    salary: "",
    jobPostURL: "",
    location: [],
    experienceLevel: [],
    workType: [],
    company: "",
    jobSkills: [],
    benefits: [],
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic
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
    <form onSubmit={handleSubmit}>
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
      <TextFormField
        formData={formData}
        handleChange={handleChange}
        fieldName="Company"
      />
      {/* Example for a multi-select field */}
      <MultiFormField
        jobTypes={jobTypes}
        handleMultiChange={handleMultiChange}
        fieldName="workType"
      />
      <MultiFormField
        jobTypes={jobTypes}
        handleMultiChange={handleMultiChange}
        fieldName="experienceLevel"
      />
      {/* Repeat for location, experience level, jobSkills, benefits */}
      <button type="submit">Create Job Posting</button>
    </form>
  );
};

export default NewJobForm;
