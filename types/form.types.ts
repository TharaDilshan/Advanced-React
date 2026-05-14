/**
 * Shared TypeScript types for forms and user profiles.
 * Centralizing types here ensures consistency across components.
 */

/** Shape of the registration form data */
export interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  country: string;
  gender: string;
  interests: string[];
  bio: string;
  dob: string;
  terms: boolean;
}

/** Shape of the user profile (after registration) */
export interface UserProfile {
  name: string | null;
  email: string | null;
  country: string | null;
  gender: string | null;
  interests: string[];
  bio: string | null;
  dob: string | null;
}

/** Generic validation errors map */
export type ValidationErrors = Record<string, string>;
