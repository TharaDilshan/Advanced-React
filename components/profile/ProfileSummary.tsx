'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import styles from './ProfileSummary.module.css';

export default function ProfileSummary() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const data = {
    name: searchParams.get('name'),
    email: searchParams.get('email'),
    country: searchParams.get('country'),
    gender: searchParams.get('gender'),
    interests: searchParams.get('interests')?.split(',') || [],
    bio: searchParams.get('bio'),
    dob: searchParams.get('dob')
  };

  return (
    <div className={styles.container}>
      <div className={styles.glassCard}>
        <div className={styles.checkIcon}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h1 className={styles.title}>Registration Successful!</h1>
        <p className={styles.subtitle}>Welcome aboard, {data.name}. Here is your profile summary:</p>

        <div className={styles.summaryBox}>
          <div className={styles.grid}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>{data.email}</span>
            
            <span className={styles.label}>Country:</span>
            <span className={styles.value}>{data.country}</span>
            
            <span className={styles.label}>Gender:</span>
            <span className={styles.value}>{data.gender}</span>
            
            <span className={styles.label}>Date of Birth:</span>
            <span className={styles.value}>{data.dob}</span>
            
            <span className={styles.label}>Interests:</span>
            <div>
              {data.interests.map(i => (
                <span key={i} className={styles.tag}>{i}</span>
              ))}
            </div>
            
            {data.bio && (
              <>
                <span className={styles.label}>Bio:</span>
                <span className={styles.value} style={{ fontStyle: 'italic' }}>"{data.bio}"</span>
              </>
            )}
          </div>
        </div>

        <button 
          onClick={() => router.push('/')} 
          className={styles.btnPrimary}
        >
          Create Another Profile
        </button>
      </div>
    </div>
  );
}
