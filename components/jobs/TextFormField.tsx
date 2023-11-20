import React from "react";

type TextFormFieldProps = {
  formData: any; // You should replace 'any' with a more specific type
  handleChange: (fieldName: string, value: string) => void;
  fieldName: string;
};

export default function TextFormField({
  formData,
  handleChange,
  fieldName,
}: TextFormFieldProps) {
  return (
    <div>
      <label>
        {fieldName.toUpperCase()}:
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleChange(fieldName, e.target.value)}
          required
        />
      </label>
    </div>
  );
}
