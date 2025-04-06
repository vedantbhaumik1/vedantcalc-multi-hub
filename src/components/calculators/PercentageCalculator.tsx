
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

export const PercentageCalculator: React.FC = () => {
  // Percentage of a number
  const [percentValue, setPercentValue] = useState('');
  const [ofValue, setOfValue] = useState('');
  const [percentResult, setPercentResult] = useState<string | null>(null);
  
  // What percentage is X of Y
  const [whatValue, setWhatValue] = useState('');
  const [ofWhatValue, setOfWhatValue] = useState('');
  const [whatPercentResult, setWhatPercentResult] = useState<string | null>(null);
  
  // X is Y% of what number
  const [isValue, setIsValue] = useState('');
  const [percentOfValue, setPercentOfValue] = useState('');
  const [ofWhatResult, setOfWhatResult] = useState<string | null>(null);

  const calculatePercentOf = () => {
    if (!percentValue || !ofValue) {
      setPercentResult(null);
      return;
    }
    
    const percent = parseFloat(percentValue);
    const total = parseFloat(ofValue);
    const result = (percent / 100) * total;
    
    setPercentResult(result.toFixed(2).replace(/\.?0+$/, ""));
  };

  const calculateWhatPercent = () => {
    if (!whatValue || !ofWhatValue) {
      setWhatPercentResult(null);
      return;
    }
    
    const part = parseFloat(whatValue);
    const whole = parseFloat(ofWhatValue);
    const result = (part / whole) * 100;
    
    setWhatPercentResult(result.toFixed(2).replace(/\.?0+$/, ""));
  };

  const calculateOfWhat = () => {
    if (!isValue || !percentOfValue) {
      setOfWhatResult(null);
      return;
    }
    
    const value = parseFloat(isValue);
    const percent = parseFloat(percentOfValue);
    const result = value / (percent / 100);
    
    setOfWhatResult(result.toFixed(2).replace(/\.?0+$/, ""));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Percentage Calculator</h2>
      
      <Tabs defaultValue="percentOf">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="percentOf">% of a Number</TabsTrigger>
          <TabsTrigger value="whatPercent">What % is X of Y</TabsTrigger>
          <TabsTrigger value="ofWhat">X is Y% of What</TabsTrigger>
        </TabsList>
        
        <TabsContent value="percentOf">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="grid gap-2">
                  <Label htmlFor="percent">Percentage (%)</Label>
                  <Input
                    id="percent"
                    type="number"
                    value={percentValue}
                    onChange={(e) => setPercentValue(e.target.value)}
                    placeholder="e.g. 15"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="of">of</Label>
                  <Input
                    id="of"
                    type="number"
                    value={ofValue}
                    onChange={(e) => setOfValue(e.target.value)}
                    placeholder="e.g. 80"
                  />
                </div>
                
                <div>
                  <Button onClick={calculatePercentOf} className="w-full">
                    Calculate
                  </Button>
                </div>
              </div>
              
              {percentResult !== null && (
                <div className="mt-8 text-center">
                  <p className="text-lg">
                    <span className="font-bold">{percentValue}%</span> of <span className="font-bold">{ofValue}</span> is <span className="text-2xl font-bold text-calculator-primary">{percentResult}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="whatPercent">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="grid gap-2">
                  <Label htmlFor="what">What % is</Label>
                  <Input
                    id="what"
                    type="number"
                    value={whatValue}
                    onChange={(e) => setWhatValue(e.target.value)}
                    placeholder="e.g. 12"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="ofWhat">of</Label>
                  <Input
                    id="ofWhat"
                    type="number"
                    value={ofWhatValue}
                    onChange={(e) => setOfWhatValue(e.target.value)}
                    placeholder="e.g. 50"
                  />
                </div>
                
                <div>
                  <Button onClick={calculateWhatPercent} className="w-full">
                    Calculate
                  </Button>
                </div>
              </div>
              
              {whatPercentResult !== null && (
                <div className="mt-8 text-center">
                  <p className="text-lg">
                    <span className="font-bold">{whatValue}</span> is <span className="text-2xl font-bold text-calculator-primary">{whatPercentResult}%</span> of <span className="font-bold">{ofWhatValue}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ofWhat">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div className="grid gap-2">
                  <Label htmlFor="is">Number</Label>
                  <Input
                    id="is"
                    type="number"
                    value={isValue}
                    onChange={(e) => setIsValue(e.target.value)}
                    placeholder="e.g. 25"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="percentOf">is what % of</Label>
                  <Input
                    id="percentOf"
                    type="number"
                    value={percentOfValue}
                    onChange={(e) => setPercentOfValue(e.target.value)}
                    placeholder="e.g. 40"
                  />
                </div>
                
                <div>
                  <Button onClick={calculateOfWhat} className="w-full">
                    Calculate
                  </Button>
                </div>
              </div>
              
              {ofWhatResult !== null && (
                <div className="mt-8 text-center">
                  <p className="text-lg">
                    <span className="font-bold">{isValue}</span> is <span className="font-bold">{percentOfValue}%</span> of <span className="text-2xl font-bold text-calculator-primary">{ofWhatResult}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
