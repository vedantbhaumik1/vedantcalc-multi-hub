
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { toast } from "sonner";

export const LoanEMICalculator: React.FC = () => {
  // Loan inputs
  const [loanAmount, setLoanAmount] = useState<string>('500000');
  const [interestRate, setInterestRate] = useState<string>('8.5');
  const [loanTerm, setLoanTerm] = useState<string>('5');
  
  // Results
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  
  // Chart data
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Color constants
  const COLORS = ['#0EA5E9', '#F97316'];

  // Calculate EMI whenever inputs change
  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateEMI = () => {
    try {
      const principal = parseFloat(loanAmount) || 0;
      const rate = (parseFloat(interestRate) || 0) / 100 / 12; // Monthly interest rate
      const time = (parseFloat(loanTerm) || 0) * 12; // Total months
      
      if (principal <= 0 || rate <= 0 || time <= 0) {
        setEmi(0);
        setTotalInterest(0);
        setTotalPayment(0);
        setChartData([]);
        return;
      }
      
      // Calculate EMI
      // Formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const emiValue = principal * rate * Math.pow(1 + rate, time) / (Math.pow(1 + rate, time) - 1);
      
      // Calculate total payment and interest
      const totalPaymentValue = emiValue * time;
      const totalInterestValue = totalPaymentValue - principal;
      
      setEmi(emiValue);
      setTotalInterest(totalInterestValue);
      setTotalPayment(totalPaymentValue);
      
      // Update chart data
      setChartData([
        { name: 'Principal', value: principal },
        { name: 'Interest', value: totalInterestValue }
      ]);
    } catch (error) {
      toast.error("Error calculating EMI. Please check your inputs.");
      console.error("EMI calculation error:", error);
    }
  };

  // Create amortization schedule
  const generateAmortizationSchedule = () => {
    const principal = parseFloat(loanAmount) || 0;
    const monthlyRate = (parseFloat(interestRate) || 0) / 100 / 12;
    const totalMonths = (parseFloat(loanTerm) || 0) * 12;
    
    if (principal <= 0 || monthlyRate <= 0 || totalMonths <= 0) {
      toast.error("Please enter valid loan details");
      return;
    }
    
    // Generate and display modal or detailed view (in a real app)
    // For this example, we'll just show a toast
    toast.success("Amortization schedule calculated. In a complete app, this would show a detailed payment schedule.");
  };

  // Handle slider value changes
  const handleAmountSlider = (values: number[]) => {
    setLoanAmount(values[0].toString());
  };
  
  const handleRateSlider = (values: number[]) => {
    setInterestRate(values[0].toFixed(2));
  };
  
  const handleTermSlider = (values: number[]) => {
    setLoanTerm(values[0].toString());
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Loan EMI Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Loan Amount Input */}
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                <span className="text-sm text-gray-500">₹{parseInt(loanAmount).toLocaleString()}</span>
              </div>
              <Input 
                id="loanAmount" 
                type="number"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                className="mb-2"
              />
              <Slider
                value={[parseFloat(loanAmount)]}
                onValueChange={handleAmountSlider}
                min={10000}
                max={10000000}
                step={10000}
              />
            </div>
            
            {/* Interest Rate Input */}
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                <span className="text-sm text-gray-500">{parseFloat(interestRate).toFixed(2)}%</span>
              </div>
              <Input 
                id="interestRate" 
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                className="mb-2"
                step="0.01"
              />
              <Slider
                value={[parseFloat(interestRate)]}
                onValueChange={handleRateSlider}
                min={1}
                max={25}
                step={0.1}
              />
            </div>
            
            {/* Loan Term Input */}
            <div>
              <div className="flex justify-between mb-1">
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <span className="text-sm text-gray-500">{loanTerm} years</span>
              </div>
              <Input 
                id="loanTerm" 
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                className="mb-2"
              />
              <Slider
                value={[parseFloat(loanTerm)]}
                onValueChange={handleTermSlider}
                min={1}
                max={30}
                step={1}
              />
            </div>
            
            {/* Calculate Button */}
            <div className="flex space-x-2">
              <Button 
                className="w-full"
                onClick={calculateEMI}
              >
                Calculate EMI
              </Button>
              <Button 
                variant="outline"
                className="w-full"
                onClick={generateAmortizationSchedule}
              >
                Show Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            {/* EMI Results */}
            <div className="space-y-6">
              {/* Monthly Payment */}
              <div className="text-center p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg">
                <h3 className="text-lg font-medium text-gray-600">Monthly Payment (EMI)</h3>
                <p className="text-3xl font-bold text-calculator-result">
                  ₹{emi.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
              
              {/* Chart */}
              {chartData.length > 0 && (
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `₹${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              )}
              
              {/* Summary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-md">
                  <p className="text-sm text-gray-600">Principal Amount</p>
                  <p className="text-lg font-bold">₹{parseFloat(loanAmount).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-md">
                  <p className="text-sm text-gray-600">Total Interest</p>
                  <p className="text-lg font-bold">₹{totalInterest.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
                </div>
              </div>
              
              <div className="p-3 bg-gradient-to-r from-blue-50 to-orange-50 rounded-md">
                <p className="text-sm text-gray-600">Total Payment</p>
                <p className="text-lg font-bold">₹{totalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
              </div>
              
              {/* Loan Info Summary */}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Annual Interest: {interestRate}%</p>
                <p>Total Payments: {parseFloat(loanTerm) * 12}</p>
                <p>Loan End Date: {new Date(new Date().setFullYear(new Date().getFullYear() + parseFloat(loanTerm))).toLocaleDateString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
