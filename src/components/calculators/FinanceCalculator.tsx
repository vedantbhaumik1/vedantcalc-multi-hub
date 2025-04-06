
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const FinanceCalculator: React.FC = () => {
  // Investment Calculator State
  const [principal, setPrincipal] = useState<string>('1000');
  const [rate, setRate] = useState<string>('5');
  const [time, setTime] = useState<string>('10');
  const [compoundFrequency, setCompoundFrequency] = useState<string>('annual');
  const [investmentResult, setInvestmentResult] = useState<string>('');
  
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState<string>('10000');
  const [loanRate, setLoanRate] = useState<string>('6');
  const [loanTerm, setLoanTerm] = useState<string>('36');
  const [loanResult, setLoanResult] = useState<string>('');

  // ROI Calculator State
  const [initialCost, setInitialCost] = useState<string>('5000');
  const [finalValue, setFinalValue] = useState<string>('7500');
  const [roiResult, setRoiResult] = useState<string>('');

  const calculateInvestment = () => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    let n = 1;
    
    switch (compoundFrequency) {
      case 'annual':
        n = 1;
        break;
      case 'semiannual':
        n = 2;
        break;
      case 'quarterly':
        n = 4;
        break;
      case 'monthly':
        n = 12;
        break;
      case 'daily':
        n = 365;
        break;
      default:
        n = 1;
    }
    
    const amount = p * Math.pow(1 + (r / n), n * t);
    const interest = amount - p;
    
    setInvestmentResult(`Future Value: $${amount.toFixed(2)}\nInterest Earned: $${interest.toFixed(2)}`);
  };

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(loanRate) / 100 / 12;
    const term = parseFloat(loanTerm);
    
    const monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;
    
    setLoanResult(`Monthly Payment: $${monthlyPayment.toFixed(2)}\nTotal Payment: $${totalPayment.toFixed(2)}\nTotal Interest: $${totalInterest.toFixed(2)}`);
  };

  const calculateROI = () => {
    const cost = parseFloat(initialCost);
    const value = parseFloat(finalValue);
    
    const roi = ((value - cost) / cost) * 100;
    
    setRoiResult(`ROI: ${roi.toFixed(2)}%`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Finance Calculator</h2>
      
      <Tabs defaultValue="investment" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="investment">Investment</TabsTrigger>
          <TabsTrigger value="loan">Loan</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
        </TabsList>
        
        <TabsContent value="investment">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="principal">Initial Investment ($)</Label>
                  <Input 
                    id="principal" 
                    type="number" 
                    value={principal} 
                    onChange={(e) => setPrincipal(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input 
                    id="rate" 
                    type="number" 
                    value={rate} 
                    onChange={(e) => setRate(e.target.value)}
                    step="0.1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="time">Time Period (years)</Label>
                  <Input 
                    id="time" 
                    type="number" 
                    value={time} 
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="compound">Compound Frequency</Label>
                  <Select 
                    value={compoundFrequency} 
                    onValueChange={setCompoundFrequency}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select compound frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annual">Annual</SelectItem>
                      <SelectItem value="semiannual">Semi-Annual</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  className="w-full"
                  onClick={calculateInvestment}
                >
                  Calculate
                </Button>
                
                {investmentResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md whitespace-pre-line">
                    <p className="font-medium">{investmentResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="loan">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                  <Input 
                    id="loanAmount" 
                    type="number" 
                    value={loanAmount} 
                    onChange={(e) => setLoanAmount(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanRate">Interest Rate (%)</Label>
                  <Input 
                    id="loanRate" 
                    type="number" 
                    value={loanRate} 
                    onChange={(e) => setLoanRate(e.target.value)}
                    step="0.1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="loanTerm">Term (months)</Label>
                  <Input 
                    id="loanTerm" 
                    type="number" 
                    value={loanTerm} 
                    onChange={(e) => setLoanTerm(e.target.value)}
                  />
                </div>
                
                <Button
                  className="w-full"
                  onClick={calculateLoan}
                >
                  Calculate
                </Button>
                
                {loanResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md whitespace-pre-line">
                    <p className="font-medium">{loanResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="roi">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="initialCost">Initial Cost ($)</Label>
                  <Input 
                    id="initialCost" 
                    type="number" 
                    value={initialCost} 
                    onChange={(e) => setInitialCost(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="finalValue">Final Value ($)</Label>
                  <Input 
                    id="finalValue" 
                    type="number" 
                    value={finalValue} 
                    onChange={(e) => setFinalValue(e.target.value)}
                  />
                </div>
                
                <Button
                  className="w-full"
                  onClick={calculateROI}
                >
                  Calculate ROI
                </Button>
                
                {roiResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md whitespace-pre-line">
                    <p className="font-medium">{roiResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
