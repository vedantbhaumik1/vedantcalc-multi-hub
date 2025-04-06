
import React from 'react';
import Navbar from './Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StandardCalculator } from './calculators/StandardCalculator';
import { ScientificCalculator } from './calculators/ScientificCalculator';
import { BMICalculator } from './calculators/BMICalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { PercentageCalculator } from './calculators/PercentageCalculator';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-calculator-result">
          MultiCalc Ultimate Hub
        </h1>
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="scientific">Scientific</TabsTrigger>
              <TabsTrigger value="bmi">BMI</TabsTrigger>
              <TabsTrigger value="converter">Converter</TabsTrigger>
              <TabsTrigger value="percentage">Percentage</TabsTrigger>
            </TabsList>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <TabsContent value="standard">
                <StandardCalculator />
              </TabsContent>
              
              <TabsContent value="scientific">
                <ScientificCalculator />
              </TabsContent>
              
              <TabsContent value="bmi">
                <BMICalculator />
              </TabsContent>
              
              <TabsContent value="converter">
                <UnitConverter />
              </TabsContent>
              
              <TabsContent value="percentage">
                <PercentageCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Layout;
