import { Suspense } from 'react';
import ResetPasswordClient from './ResetPasswordClient';

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="text-white text-center p-8">Loading reset form...</div>}>
      <ResetPasswordClient />
    </Suspense>
  );
}
