'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from './Loader';

const LoaderOverlay: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 600); // Show loader for 600ms on route change
    return () => clearTimeout(timeout);
  }, [pathname]);

  return loading ? <Loader /> : null;
};

export default LoaderOverlay; 