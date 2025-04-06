
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

export const MortgageCalculator: React.FC = () => {
  const [homePrice, setHomePrice] = useState<string>('300000');
  const [downPayment, setDownPayment] = useState<string>('60000');
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTerm, setLoanTerm] = useState<string>('30');
  const [interestRate, setInterestRate] = useState<string>('4.5');
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  useEffect(() => {
    // Update down payment percentage when down payment or home price changes
    const price = parseFloat(homePrice) || 0;
    const payment = parseFloat(downPayment) || 0;
    if (price > 0) {
      setDownPaymentPercent((payment / price) * 100);
    }
  }, [downPayment, homePrice]);

  useEffect(() => {
    calculateMortgage();
  }, [homePrice, downPayment, loanTerm, interestRate]);

  const handleDownPaymentSlider = (values: number[]) => {
    const newPercent = values[0];
    setDownPaymentPercent(newPercent);
    const price = parseFloat(homePrice) || 0;
    setDownPayment(((price * newPercent) / 100).toFixed(0));
  };

  const calculateMortgage = () => {
    const price = parseFloat(homePrice) || 0;
    const payment = parseFloat(downPayment) || 0;
    const term = parseFloat(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;
    
    // Calculate loan amount
    const loanAmount = price - payment;
    
    if (loanAmount <= 0 || rate <= 0 || term <= 0) {
      setMonthlyPayment(0);
      setTotalPayment(0);
      setTotalInterest(0);
      return;
    }
    
    // Monthly interest rate (annual rate divided by 12 months then converted to decimal)
    const monthlyRate = rate / 100 / 12;
    
    // Total number of payments (years * 12 months)
    const numberOfPayments = term * 12;
    
    // Calculate monthly payment using the mortgage formula
    const monthlyPaymentValue = loanAmount * (
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    );
    
    const totalPaymentValue = monthlyPaymentValue * numberOfPayments;
    const totalInterestValue = totalPaymentValue - loanAmount;
    
    setMonthlyPayment(monthlyPaymentValue);
    setTotalPayment(totalPaymentValue);
    setTotalInterest(totalInterestValue);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Mortgage Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <Label htmlFor="homePrice">Home Price ($)</Label>
                <Input 
                  id="homePrice" 
                  type="number"
                  value={homePrice}
                  onChange={(e) => setHomePrice(e.target.value)}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label htmlFor="downPayment">Down Payment ($)</Label>
                  <span className="text-sm text-gray-500">{downPaymentPercent.toFixed(0)}%</span>
                </div>
                <Input 
                  id="downPayment" 
                  type="number"
                  value={downPayment}
                  onChange={(e) => setDownPayment(e.target.value)}
                  className="mb-2"
                />
                <Slider
                  value={[downPaymentPercent]}
                  onValueChange={handleDownPaymentSlider}
                  min={0}
                  max={50}
                  step={1}
                />
              </div>
              
              <div>
                <Label htmlFor="loanTerm">Loan Term (years)</Label>
                <Input 
                  id="loanTerm" 
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <Input 
                  id="interestRate" 
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  step="0.1"
                />
              </div>
              
              <Button 
                className="w-full"
                onClick={calculateMortgage}
              >
                Calculate
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Results</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600">Loan Amount</p>
                    <p className="text-xl font-bold">${(parseFloat(homePrice) - parseFloat(downPayment)).toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Monthly Payment</p>
                    <p className="text-2xl font-bold text-calculator-result">${monthlyPayment.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Total Payment</p>
                    <p className="text-xl font-bold">${totalPayment.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-600">Total Interest</p>
                    <p className="text-xl font-bold">${totalInterest.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Payment Breakdown</h3>
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-calculator-primary"
                    style={{ 
                      width: `${(((parseFloat(homePrice) - parseFloat(downPayment)) / totalPayment) * 100).toFixed(0)}%` 
                    }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">Principal</span>
                  <span className="text-xs text-gray-500">Interest</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm">
                  This is an estimate based on the information provided. 
                  Actual mortgage rates and terms may vary. Consult a mortgage 
                  professional for accurate information.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
