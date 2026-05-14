/**
 * Reusable validation utilities.
 * Extract validation logic here so it can be used across
 * different forms and components without duplication.
 */

import { RegistrationFormData, ValidationErrors } from '@/types/form.types';

/** Validates an email string format */
export function isValidEmail(email: string): boolean {
  return /\S+@\S+\.\S+/.test(email);
}

/** Validates minimum password length */
export function isValidPassword(password: string, minLength: number = 6): boolean {
  return password.length >= minLength;
}

/** Validates the entire registration form and returns error messages */
export function validateRegistrationForm(formData: RegistrationFormData): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!formData.name) errors.name = 'Name is required';

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Email is invalid';
  }

  if (!formData.password) {
    errors.password = 'Password is required';
  } else if (!isValidPassword(formData.password)) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!formData.country) errors.country = 'Please select a country';
  if (!formData.gender) errors.gender = 'Please select your gender';
  if (formData.interests.length === 0) errors.interests = 'Select at least one interest';
  if (!formData.dob) errors.dob = 'Date of birth is required';
  if (!formData.terms) errors.terms = 'You must accept the terms';

  return errors;
}
