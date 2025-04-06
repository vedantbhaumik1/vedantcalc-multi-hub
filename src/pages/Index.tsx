
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Add page transition effect
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.classList.add('animate-fade-in');
    }
    
    return () => {
      document.documentElement.style.scrollBehavior = '';
      if (mainElement) {
        mainElement.classList.remove('animate-fade-in');
      }
    };
  }, []);
  
  return (
    <div className="animate-fade-in">
      <Layout />
    </div>
  );
};

export default Index;
