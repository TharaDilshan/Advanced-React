import ProfileSummary from '@/components/profile/ProfileSummary';
import { Suspense } from 'react';

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ color: 'white', textAlign: 'center', marginTop: '100px' }}>Loading...</div>}>
      <ProfileSummary />
    </Suspense>
  );
}
