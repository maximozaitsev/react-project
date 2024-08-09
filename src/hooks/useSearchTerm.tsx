import { useState, useEffect } from 'react';

const useSearchTerm = () => {
  const [term, setTerm] = useState<string>('');

  useEffect(() => {
    const savedTerm = localStorage.getItem('searchTerm');
    if (savedTerm) {
      setTerm(savedTerm);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchTerm', term);
  }, [term]);

  return [term, setTerm] as const;
};

export default useSearchTerm;
