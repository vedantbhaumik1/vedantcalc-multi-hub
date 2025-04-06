
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);
  
  return (
    <div className="animate-fade-in">
      <Layout />
    </div>
  );
};

export default Index;
