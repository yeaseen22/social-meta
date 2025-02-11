import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";

interface ValidationRules {
  [key: string]: (value: any, formData?: any) => string;
}

export function useFormHandler<T extends Record<string, any>>(
  initialValues: T,
  validationRules: ValidationRules
) {
  const [formData, setFormData] = useState<T>(initialValues);
 const [errors, setErrors] = React.useState<{
    firstname: string;
    lastname: string;
    email: string;
    bio: string;
    title: string;
    gender: string;
    birthdate: string;
    profession: string;
    password: string;
    confirmPassword: string;
  }>({
    firstname: "",
    lastname: "",
    email: "",
    bio: "",
    title: "",
    gender: "",
    birthdate: "",
    profession: "",
    password: "",
    confirmPassword: "",
  });
  const validateField = (name: string, value: any): string => {
    if (validationRules[name]) {
      const errorMessage = validationRules[name](value, formData);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return errorMessage;
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
  
    let newValue: any = value;
  
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  
    // Optional live validation
    validateField(name, newValue);
  };
  

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
  
    // Handle file validation separately
    const newValue = type === "file" && files && files.length > 0 ? files[0] : value;
  
    // Validate only relevant fields
    if (name !== "profileImage" && validationRules[name]) {
      validateField(name, newValue);
    }
  };
  

  const validateForm = (): boolean => {
    let valid = true;
    Object.keys(validationRules).forEach((name) => {
      const value = formData[name];
      const errorMessage = validateField(name, value);
      console.log("Error:", errorMessage, name, value);
      if (errorMessage) valid = false;
    });
    console.log("Errors:", valid, errors);
    if (!valid) {
      toast.error("Please fix the errors in the form.");
    }

    return valid;
  };

  return { formData, errors, handleChange, handleBlur, validateForm, setFormData };
}
