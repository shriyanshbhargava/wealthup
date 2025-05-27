'use client'

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Storage from '@/utils/storage';

export function ReferralTracker() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    if (searchParams) {
      const ref = searchParams.get('ref');
      if (ref) {
        Storage.storeReferral(ref);
      }
    }
  }, [searchParams]);

  return null; 
}