
import React from 'react';
import { Calculator } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-calculator-primary shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="h-6 w-6 text-white" />
            <span className="text-white font-bold text-xl">MultiCalc</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
