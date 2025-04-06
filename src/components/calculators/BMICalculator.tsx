
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState('metric');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBMI] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    if (!weight || !height) return;

    let bmiValue: number;
    
    if (unit === 'metric') {
      // Weight in kg, height in cm
      const heightInM = parseFloat(height) / 100;
      bmiValue = parseFloat(weight) / (heightInM * heightInM);
    } else {
      // Weight in lbs, height in inches
      bmiValue = (parseFloat(weight) / (parseFloat(height) * parseFloat(height))) * 703;
    }
    
    setBMI(parseFloat(bmiValue.toFixed(2)));
  };

  useEffect(() => {
    if (bmi === null) return;
    
    if (bmi < 18.5) {
      setCategory('Underweight');
    } else if (bmi < 25) {
      setCategory('Normal weight');
    } else if (bmi < 30) {
      setCategory('Overweight');
    } else {
      setCategory('Obesity');
    }
  }, [bmi]);

  const handleReset = () => {
    setWeight('');
    setHeight('');
    setBMI(null);
    setCategory('');
  };

  const getBMICategoryColor = () => {
    if (bmi === null) return 'bg-gray-100';
    
    if (bmi < 18.5) {
      return 'bg-blue-100 border-blue-300';
    } else if (bmi < 25) {
      return 'bg-green-100 border-green-300';
    } else if (bmi < 30) {
      return 'bg-yellow-100 border-yellow-300';
    } else {
      return 'bg-red-100 border-red-300';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">BMI Calculator</h2>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6">
            <RadioGroup 
              defaultValue="metric" 
              value={unit} 
              onValueChange={setUnit}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="metric" id="metric" />
                <Label htmlFor="metric">Metric (kg, cm)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="imperial" id="imperial" />
                <Label htmlFor="imperial">Imperial (lbs, in)</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="grid gap-4 mb-6">
            <div className="grid gap-2">
              <Label htmlFor="weight">
                {unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)'}
              </Label>
              <Input
                id="weight"
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter weight in kg' : 'Enter weight in lbs'}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="height">
                {unit === 'metric' ? 'Height (cm)' : 'Height (in)'}
              </Label>
              <Input
                id="height"
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder={unit === 'metric' ? 'Enter height in cm' : 'Enter height in inches'}
              />
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Button
              onClick={calculateBMI}
              className="bg-calculator-primary hover:bg-calculator-primary/90"
            >
              Calculate BMI
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div>
          {bmi !== null && (
            <Card className={`${getBMICategoryColor()} border-2`}>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-lg font-medium mb-2">Your BMI is</p>
                  <p className="text-4xl font-bold mb-4">{bmi}</p>
                  <p className="text-xl font-semibold">{category}</p>
                  
                  <div className="mt-6 text-left">
                    <p className="font-medium mb-1">BMI Categories:</p>
                    <ul className="text-sm space-y-1">
                      <li className="text-blue-700">Underweight: Below 18.5</li>
                      <li className="text-green-700">Normal weight: 18.5 - 24.9</li>
                      <li className="text-yellow-700">Overweight: 25 - 29.9</li>
                      <li className="text-red-700">Obesity: 30 and above</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {bmi === null && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 italic">Enter your data and click "Calculate BMI" to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
