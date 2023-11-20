import React from "react";
import Select from "react-select"; // This should be installed with `npm install react-select` or `yarn add react-select`

type MultiFormFieldProps = {
  jobTypes: any[]; // You should replace 'any' with a more specific type
  handleMultiChange: (fieldName: string, value: any) => void;
  fieldName: string;
};

export default function MultiFormField({
  jobTypes,
  handleMultiChange,
  fieldName,
}: MultiFormFieldProps) {
  return (
    <div>
      <label>
        {fieldName.toUpperCase()}:
        <Select
          options={jobTypes}
          isMulti
          onChange={(options) => handleMultiChange(fieldName, options)}
        />
      </label>
    </div>
  );
}
