import { useState } from "react";

// Custom hook for form management
export function useForm(initialState) {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const validateForm = () => {
        if (!formData.firstName || !formData.email || !formData.password) {
            toaster.error("Please fill out all required fields.");
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            toaster.error("Passwords do not match.");
            return false;
        }
        return true;
    };

    const resetForm = () => setFormData(initialState);

    return { formData, handleChange, validateForm, resetForm };
}

// Custom hook for step management
export function useStep() {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (newValue) => setCurrentTab(newValue);

    return { currentTab, handleTabChange };
}
