
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

export const VedicCalculator: React.FC = () => {
  // Square of numbers ending with 5
  const [squareInput, setSquareInput] = useState<string>('');
  const [squareResult, setSquareResult] = useState<string | null>(null);

  // Multiplication by 11
  const [multiplyInput, setMultiplyInput] = useState<string>('');
  const [multiplyResult, setMultiplyResult] = useState<string | null>(null);

  // Square of any number
  const [generalSquareInput, setGeneralSquareInput] = useState<string>('');
  const [generalSquareResult, setGeneralSquareResult] = useState<string | null>(null);

  // Subtraction from power of 10
  const [subtractInput, setSubtractInput] = useState<string>('');
  const [subtractResult, setSubtractResult] = useState<string | null>(null);

  // Calculate square of number ending with 5
  const calculateSquareEndingWith5 = () => {
    const num = parseInt(squareInput);
    
    if (isNaN(num) || num % 10 !== 5) {
      toast.error("Please enter a number ending with 5");
      return;
    }
    
    // Vedic formula: a² = a × (a + 1) | 25
    // Where a is the tens digit
    const tensDigit = Math.floor(num / 10);
    const result = tensDigit * (tensDigit + 1) * 100 + 25;
    setSquareResult(result.toString());
  };

  // Calculate multiplication by 11
  const calculateMultiplyBy11 = () => {
    if (!multiplyInput.trim()) {
      toast.error("Please enter a number");
      return;
    }
    
    const num = parseInt(multiplyInput);
    if (isNaN(num)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    // Traditional method for clarity
    const result = num * 11;
    setMultiplyResult(result.toString());
    
    // Optional: Explain the Vedic method in UI
    // For 3-digit number ABC: A | A+B | B+C | C
  };

  // Calculate square of any two-digit number
  const calculateGeneralSquare = () => {
    const num = parseInt(generalSquareInput);
    
    if (isNaN(num) || num < 10 || num > 99) {
      toast.error("Please enter a valid two-digit number");
      return;
    }
    
    // Vedic formula for (x + a)² = x² + 2ax + a²
    // Let's represent num as (nearest_base + difference)
    // For two-digit numbers, we often use 100 as base
    const base = 100;
    const difference = num - base;
    const result = base * base + 2 * base * difference + difference * difference;
    
    // Alternative approach: using difference from 50
    const diffFrom50 = num - 50;
    const resultAlt = 2500 + (diffFrom50 * 100) + (diffFrom50 * diffFrom50);
    
    setGeneralSquareResult(result.toString());
  };

  // Subtraction from power of 10
  const calculateSubtractFromPower10 = () => {
    const num = parseInt(subtractInput);
    
    if (isNaN(num)) {
      toast.error("Please enter a valid number");
      return;
    }
    
    // Find nearest power of 10
    const digits = subtractInput.length;
    const powerOf10 = Math.pow(10, digits);
    
    // Calculate result using the power of 10 as a reference
    const result = powerOf10 - num;
    setSubtractResult(result.toString());
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Vedic Mathematics Calculator</h2>
      
      <Tabs defaultValue="square5" className="w-full">
        <TabsList className="grid grid-cols-2 lg:grid-cols-4 mb-6">
          <TabsTrigger value="square5" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Square (ending with 5)
          </TabsTrigger>
          <TabsTrigger value="multiply11" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Multiply by 11
          </TabsTrigger>
          <TabsTrigger value="square" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Square (any number)
          </TabsTrigger>
          <TabsTrigger value="subtract" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Subtraction from 10ⁿ
          </TabsTrigger>
        </TabsList>
        
        {/* Square of numbers ending with 5 */}
        <TabsContent value="square5">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-blue-700">
                    Vedic trick: To square a number ending with 5, multiply the tens digit by (tens digit + 1) 
                    and append 25 to the result.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Example: 35² = 3 × 4 | 25 = 1225
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="square5Input">Enter a number ending with 5:</Label>
                  <Input
                    id="square5Input"
                    type="number"
                    value={squareInput}
                    onChange={(e) => setSquareInput(e.target.value)}
                    placeholder="e.g., 25, 35, 45..."
                  />
                </div>
                
                <Button onClick={calculateSquareEndingWith5} className="w-full">
                  Calculate Square
                </Button>
                
                {squareResult && (
                  <div className="mt-4 text-center p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg">
                    <p className="text-lg">The square of {squareInput} is:</p>
                    <p className="text-3xl font-bold text-calculator-result">{squareResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Multiplication by 11 */}
        <TabsContent value="multiply11">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-blue-700">
                    Vedic trick: To multiply a number by 11, add each adjacent pair of digits and place the
                    result between the original digits.
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Example: 53 × 11 = 5 | (5+3) | 3 = 583
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="multiplyInput">Enter a number to multiply by 11:</Label>
                  <Input
                    id="multiplyInput"
                    type="number"
                    value={multiplyInput}
                    onChange={(e) => setMultiplyInput(e.target.value)}
                    placeholder="e.g., 23, 456, 789..."
                  />
                </div>
                
                <Button onClick={calculateMultiplyBy11} className="w-full">
                  Multiply by 11
                </Button>
                
                {multiplyResult && (
                  <div className="mt-4 text-center p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg">
                    <p className="text-lg">{multiplyInput} × 11 =</p>
                    <p className="text-3xl font-bold text-calculator-result">{multiplyResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Square of any number */}
        <TabsContent value="square">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-blue-700">
                    Vedic approach: Use a reference number close to the given number, and calculate
                    the square using the formula (x + a)² = x² + 2ax + a².
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="generalSquareInput">Enter a two-digit number:</Label>
                  <Input
                    id="generalSquareInput"
                    type="number"
                    value={generalSquareInput}
                    onChange={(e) => setGeneralSquareInput(e.target.value)}
                    placeholder="e.g., 47, 83, 92..."
                  />
                </div>
                
                <Button onClick={calculateGeneralSquare} className="w-full">
                  Calculate Square
                </Button>
                
                {generalSquareResult && (
                  <div className="mt-4 text-center p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg">
                    <p className="text-lg">The square of {generalSquareInput} is:</p>
                    <p className="text-3xl font-bold text-calculator-result">{generalSquareResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subtraction from power of 10 */}
        <TabsContent value="subtract">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-md mb-4">
                  <p className="text-sm text-blue-700">
                    Vedic trick: To calculate 10ⁿ - x, subtract each digit from 9 (except the last digit,
                    which is subtracted from 10).
                  </p>
                  <p className="text-sm text-blue-700 mt-2">
                    Example: 1000 - 463 = 537 (9-4, 9-6, 10-3)
                  </p>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="subtractInput">Enter a number:</Label>
                  <Input
                    id="subtractInput"
                    type="number"
                    value={subtractInput}
                    onChange={(e) => setSubtractInput(e.target.value)}
                    placeholder="e.g., 274, 5896..."
                  />
                </div>
                
                <Button onClick={calculateSubtractFromPower10} className="w-full">
                  Calculate
                </Button>
                
                {subtractResult && (
                  <div className="mt-4 text-center p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg">
                    <p className="text-lg">
                      10{subtractInput.length > 0 ? <sup>{subtractInput.length}</sup> : ''} - {subtractInput} =
                    </p>
                    <p className="text-3xl font-bold text-calculator-result">{subtractResult}</p>
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
