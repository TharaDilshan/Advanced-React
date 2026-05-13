'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegistrationForm.module.css';

export default function RegistrationForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    interests: [] as string[],
    bio: '',
    dob: '',
    terms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countries = ['USA', 'UK', 'Canada', 'Australia', 'Germany', 'Japan'];
  const interestsList = ['Technology', 'Design', 'Business', 'Art', 'Sports'];

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.gender) newErrors.gender = 'Please select your gender';
    if (formData.interests.length === 0) newErrors.interests = 'Select at least one interest';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.terms) newErrors.terms = 'You must accept the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, terms: checkbox.checked }));
      } else {
        const interest = value;
        setFormData(prev => ({
          ...prev,
          interests: checkbox.checked 
            ? [...prev.interests, interest] 
            : prev.interests.filter(i => i !== interest)
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => {
        const queryParams = new URLSearchParams({
          ...formData,
          interests: formData.interests.join(','),
          terms: formData.terms.toString()
        }).toString();
        
        router.push(`/success?${queryParams}`);
      }, 1000);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <h1 className={styles.title}>Create Profile</h1>
        <p className={styles.subtitle}>Join our community of innovators today.</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            {/* Name */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Full Name</label>
              <input 
                type="text" 
                name="name" 
                className={styles.inputField} 
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className={styles.errorText}><span>⚠</span> {errors.name}</p>}
            </div>

            {/* Email */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                className={styles.inputField} 
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className={styles.errorText}><span>⚠</span> {errors.email}</p>}
            </div>

            {/* Password */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Password</label>
              <input 
                type="password" 
                name="password" 
                className={styles.inputField} 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className={styles.errorText}><span>⚠</span> {errors.password}</p>}
            </div>

            {/* Date of Birth */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Date of Birth</label>
              <input 
                type="date" 
                name="dob" 
                className={styles.inputField} 
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <p className={styles.errorText}><span>⚠</span> {errors.dob}</p>}
            </div>

            {/* Country */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Country</label>
              <select 
                name="country" 
                className={styles.inputField} 
                value={formData.country}
                onChange={handleChange}
              >
                <option value="" style={{ color: 'black' }}>Select Country</option>
                {countries.map(c => <option key={c} value={c} style={{ color: 'black' }}>{c}</option>)}
              </select>
              {errors.country && <p className={styles.errorText}><span>⚠</span> {errors.country}</p>}
            </div>

            {/* Gender */}
            <div className={styles.formGroup}>
              <label className={styles.label}>Gender</label>
              <div className={styles.radioContainer}>
                {['Male', 'Female', 'Other'].map(g => (
                  <label key={g} className={styles.radioGroup}>
                    <input 
                      type="radio" 
                      name="gender" 
                      value={g} 
                      checked={formData.gender === g}
                      onChange={handleChange}
                      style={{ accentColor: '#4f46e5' }}
                    />
                    <span>{g}</span>
                  </label>
                ))}
              </div>
              {errors.gender && <p className={styles.errorText}><span>⚠</span> {errors.gender}</p>}
            </div>

            {/* Interests */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Interests</label>
              <div className={styles.interestsGrid}>
                {interestsList.map(interest => (
                  <label key={interest} className={styles.checkboxGroup}>
                    <input 
                      type="checkbox" 
                      name="interests" 
                      value={interest} 
                      checked={formData.interests.includes(interest)}
                      onChange={handleChange}
                      style={{ accentColor: '#4f46e5' }}
                    />
                    <span>{interest}</span>
                  </label>
                ))}
              </div>
              {errors.interests && <p className={styles.errorText}><span>⚠</span> {errors.interests}</p>}
            </div>

            {/* Bio */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.label}>Short Bio</label>
              <textarea 
                name="bio" 
                className={styles.inputField} 
                rows={3} 
                placeholder="Tell us about yourself..."
                value={formData.bio}
                onChange={handleChange}
              />
            </div>

            {/* Terms */}
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.checkboxGroup} style={{ background: 'transparent', border: 'none', padding: 0 }}>
                <input 
                  type="checkbox" 
                  name="terms" 
                  checked={formData.terms}
                  onChange={handleChange}
                  style={{ accentColor: '#4f46e5', width: '20px', height: '20px' }}
                />
                <span style={{ fontSize: '1rem', fontWeight: '500', color: '#64748b' }}>
                  I agree to the <span style={{ color: '#4f46e5', fontWeight: '700' }}>Terms and Conditions</span>
                </span>
              </label>
              {errors.terms && <p className={styles.errorText}><span>⚠</span> {errors.terms}</p>}
            </div>
          </div>

          <button 
            type="submit" 
            className={styles.btnPrimary} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Get Started Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
