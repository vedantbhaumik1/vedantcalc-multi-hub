
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { DollarSign, Users, Percent } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  // Input states
  const [billAmount, setBillAmount] = useState<string>('50');
  const [tipPercent, setTipPercent] = useState<number>(15);
  const [numberOfPeople, setNumberOfPeople] = useState<string>('2');
  
  // Output states
  const [tipAmount, setTipAmount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [perPersonAmount, setPerPersonAmount] = useState<number>(0);
  
  // Custom tip presets
  const tipPresets = [10, 15, 18, 20, 25];
  
  // Calculate tip whenever inputs change
  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercent, numberOfPeople]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    
    if (bill <= 0) {
      setTipAmount(0);
      setTotalAmount(0);
      setPerPersonAmount(0);
      return;
    }
    
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const perPerson = total / people;
    
    setTipAmount(tip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
  };

  const handleTipPresetClick = (preset: number) => {
    setTipPercent(preset);
  };

  const handleTipSlider = (values: number[]) => {
    setTipPercent(values[0]);
  };

  const resetCalculator = () => {
    setBillAmount('50');
    setTipPercent(15);
    setNumberOfPeople('2');
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Tip Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Bill Amount Input */}
            <div>
              <Label htmlFor="billAmount" className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-calculator-primary" />
                Bill Amount
              </Label>
              <Input 
                id="billAmount" 
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                placeholder="0.00"
                className="text-lg"
              />
            </div>
            
            {/* Tip Percentage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="tipPercent" className="flex items-center gap-2">
                  <Percent className="h-4 w-4 text-calculator-primary" />
                  Tip Percentage
                </Label>
                <span className="text-lg font-bold text-calculator-primary">{tipPercent}%</span>
              </div>
              
              {/* Tip Presets */}
              <div className="flex gap-2 mb-4 flex-wrap">
                {tipPresets.map(preset => (
                  <Button 
                    key={preset}
                    variant={tipPercent === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTipPresetClick(preset)}
                    className={tipPercent === preset ? 
                      "bg-calculator-primary text-white" : 
                      "border-calculator-primary text-calculator-primary"}
                  >
                    {preset}%
                  </Button>
                ))}
                <Button 
                  variant="outline"
                  size="sm"
                  className="border-calculator-primary text-calculator-primary"
                >
                  Custom
                </Button>
              </div>
              
              {/* Slider */}
              <Slider
                value={[tipPercent]}
                onValueChange={handleTipSlider}
                min={0}
                max={50}
                step={1}
                className="my-4"
              />
            </div>
            
            {/* Number of People */}
            <div>
              <Label htmlFor="numberOfPeople" className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-calculator-primary" />
                Number of People
              </Label>
              <Input 
                id="numberOfPeople" 
                type="number"
                min="1"
                value={numberOfPeople}
                onChange={(e) => setNumberOfPeople(e.target.value)}
                className="text-lg"
              />
            </div>
            
            {/* Reset Button */}
            <Button 
              variant="outline"
              className="w-full"
              onClick={resetCalculator}
            >
              Reset
            </Button>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-calculator-primary/5 to-calculator-accent/10">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {/* Results */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Tip Amount</p>
                    <p className="text-xl font-bold text-calculator-primary">${tipAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Per Person</p>
                    <p className="text-lg font-bold text-calculator-primary">
                      ${(tipAmount / (parseInt(numberOfPeople) || 1)).toFixed(2)}
                    </p>
                  </div>
                </div>
                
                <div className="h-1 w-full bg-gray-200 rounded-full mb-6">
                  <div 
                    className="h-full bg-calculator-primary rounded-full"
                    style={{ width: `${tipPercent * 2}%` }}
                  ></div>
                </div>
                
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="text-3xl font-bold text-calculator-result">${totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Per Person</p>
                    <p className="text-2xl font-bold text-calculator-result">${perPersonAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              
              {/* Breakdown */}
              <div className="bg-white bg-opacity-70 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">Bill Breakdown</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Bill Amount:</span>
                    <span>${parseFloat(billAmount || '0').toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tip ({tipPercent}%):</span>
                    <span>${tipAmount.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>
                  {parseInt(numberOfPeople) > 1 && (
                    <div className="flex justify-between text-sm text-calculator-primary font-medium mt-2">
                      <span>Each Person Pays:</span>
                      <span>${perPersonAmount.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Tip Quality Indicator */}
              <div>
                <p className="text-sm text-center mb-2">Tip Quality</p>
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Low</span>
                  <span>Average</span>
                  <span>Generous</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
                    style={{ width: `${Math.min(tipPercent * 3, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="text-xs text-gray-600 space-y-1">
                <p>• 15-20% is customary for good service in restaurants</p>
                <p>• 10% is typical for simple service or takeout</p>
                <p>• 20%+ shows appreciation for exceptional service</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
