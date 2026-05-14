/**
 * Custom hook for form state management.
 * Encapsulates form state, change handling, and validation logic
 * so components stay clean and focused on rendering.
 */

'use client';

import { useState } from 'react';
import { RegistrationFormData, ValidationErrors } from '@/types/form.types';
import { validateRegistrationForm } from '@/lib/validators';

const initialFormData: RegistrationFormData = {
  name: '',
  email: '',
  password: '',
  country: '',
  gender: '',
  interests: [],
  bio: '',
  dob: '',
  terms: false,
};

export function useFormHandler() {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  /** Handle input changes for text, select, radio, and checkbox fields */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, terms: checkbox.checked }));
      } else {
        setFormData(prev => ({
          ...prev,
          interests: checkbox.checked
            ? [...prev.interests, value]
            : prev.interests.filter(i => i !== value),
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  /** Validate the form and return whether it's valid */
  const validate = (): boolean => {
    const newErrors = validateRegistrationForm(formData);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Reset form to initial state */
  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    setIsSubmitting,
    handleChange,
    validate,
    resetForm,
  };
}
