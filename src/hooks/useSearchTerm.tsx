import { useState, useEffect } from 'react';

const useSearchTerm = () => {
  const [term, setTerm] = useState<string>(() => {
    return localStorage.getItem('searchTerm') || '';
  });

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', term);
    };
  }, [term]);

  return [term, setTerm] as const;
};

export default useSearchTerm;
