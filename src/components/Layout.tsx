import React from 'react';
import Navbar from './Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StandardCalculator } from './calculators/StandardCalculator';
import { ScientificCalculator } from './calculators/ScientificCalculator';
import { BMICalculator } from './calculators/BMICalculator';
import { UnitConverter } from './calculators/UnitConverter';
import { PercentageCalculator } from './calculators/PercentageCalculator';
import { FinanceCalculator } from './calculators/FinanceCalculator';
import { ExerciseCalculator } from './calculators/ExerciseCalculator';
import { MortgageCalculator } from './calculators/MortgageCalculator';
import { CurrencyConverter } from './calculators/CurrencyConverter';
import { VedicCalculator } from './calculators/VedicCalculator';
import { LoanEMICalculator } from './calculators/LoanEMICalculator';
import { DateCalculator } from './calculators/DateCalculator';
import { TipCalculator } from './calculators/TipCalculator';
import { Toaster } from "@/components/ui/sonner";
const Layout: React.FC = () => {
  return <div className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50 to-white">
      <Navbar />
      <main className="container mx-auto py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-calculator-result bg-clip-text text-transparent bg-gradient-to-r from-calculator-result to-calculator-primary">VedantCalc multi Hub</h1>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Your all-in-one calculator suite for everyday calculations and conversions
          </p>
          
          <Tabs defaultValue="standard" className="w-full">
            <div className="mb-8 bg-white p-2 rounded-lg shadow-md overflow-x-auto">
              <TabsList className="inline-flex min-w-full md:grid md:grid-cols-5 lg:grid-cols-7 w-full">
                <TabsTrigger value="standard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Standard</TabsTrigger>
                <TabsTrigger value="scientific" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Scientific</TabsTrigger>
                <TabsTrigger value="bmi" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">BMI</TabsTrigger>
                <TabsTrigger value="converter" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Units</TabsTrigger>
                <TabsTrigger value="percentage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Percentage</TabsTrigger>
                <TabsTrigger value="finance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Finance</TabsTrigger>
                <TabsTrigger value="exercise" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Exercise</TabsTrigger>
                <TabsTrigger value="mortgage" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Mortgage</TabsTrigger>
                <TabsTrigger value="currency" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Currency</TabsTrigger>
                <TabsTrigger value="vedic" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Vedic</TabsTrigger>
                <TabsTrigger value="loan" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Loan EMI</TabsTrigger>
                <TabsTrigger value="date" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Date</TabsTrigger>
                <TabsTrigger value="tip" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">Tip</TabsTrigger>
              </TabsList>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <TabsContent value="standard" className="animate-fade-in">
                <StandardCalculator />
              </TabsContent>
              
              <TabsContent value="scientific" className="animate-fade-in">
                <ScientificCalculator />
              </TabsContent>
              
              <TabsContent value="bmi" className="animate-fade-in">
                <BMICalculator />
              </TabsContent>
              
              <TabsContent value="converter" className="animate-fade-in">
                <UnitConverter />
              </TabsContent>
              
              <TabsContent value="percentage" className="animate-fade-in">
                <PercentageCalculator />
              </TabsContent>
              
              <TabsContent value="finance" className="animate-fade-in">
                <FinanceCalculator />
              </TabsContent>
              
              <TabsContent value="exercise" className="animate-fade-in">
                <ExerciseCalculator />
              </TabsContent>
              
              <TabsContent value="mortgage" className="animate-fade-in">
                <MortgageCalculator />
              </TabsContent>
              
              <TabsContent value="currency" className="animate-fade-in">
                <CurrencyConverter />
              </TabsContent>
              
              <TabsContent value="vedic" className="animate-fade-in">
                <VedicCalculator />
              </TabsContent>
              
              <TabsContent value="loan" className="animate-fade-in">
                <LoanEMICalculator />
              </TabsContent>
              
              <TabsContent value="date" className="animate-fade-in">
                <DateCalculator />
              </TabsContent>
              
              <TabsContent value="tip" className="animate-fade-in">
                <TipCalculator />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
      <Toaster position="bottom-right" />
    </div>;
};
export default Layout;