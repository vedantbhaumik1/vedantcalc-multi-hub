
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const StandardCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);

  const handleNumberClick = (num: string) => {
    if (display === '0' || resetDisplay) {
      setDisplay(num);
      setResetDisplay(false);
    } else {
      setDisplay(display + num);
    }
  };

  const handleOperationClick = (op: string) => {
    const current = parseFloat(display);
    
    if (previousValue === null) {
      setPreviousValue(current);
    } else if (operation) {
      const result = calculate(previousValue, current, operation);
      setPreviousValue(result);
      setDisplay(String(result));
    }
    
    setOperation(op);
    setResetDisplay(true);
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×': return a * b;
      case '÷': return a / b;
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      setDisplay(String(result));
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
  };

  const handleDecimal = () => {
    if (resetDisplay) {
      setDisplay('0.');
      setResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const buttonClass = "h-14 text-lg font-medium transition-colors";
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Standard Calculator</h2>
      
      <div className="bg-white rounded-lg overflow-hidden shadow-inner mb-4">
        <div className="bg-gray-100 p-4 text-right">
          <div className="text-gray-500 text-sm h-6">
            {previousValue !== null ? `${previousValue} ${operation}` : ''}
          </div>
          <div className="text-3xl font-semibold text-calculator-result overflow-x-auto">
            {display}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={handleClear}
        >
          C
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => setDisplay(display.slice(0, -1) || '0')}
        >
          ←
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('÷')}
        >
          ÷
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('×')}
        >
          ×
        </Button>
        
        {[7, 8, 9].map(num => (
          <Button 
            key={num} 
            variant="outline" 
            className={buttonClass}
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('-')}
        >
          -
        </Button>
        
        {[4, 5, 6].map(num => (
          <Button 
            key={num} 
            variant="outline" 
            className={buttonClass}
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('+')}
        >
          +
        </Button>
        
        {[1, 2, 3].map(num => (
          <Button 
            key={num} 
            variant="outline" 
            className={buttonClass}
            onClick={() => handleNumberClick(num.toString())}
          >
            {num}
          </Button>
        ))}
        
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-primary text-white hover:bg-calculator-primary/90 row-span-2")}
          onClick={handleEquals}
        >
          =
        </Button>
        
        <Button 
          variant="outline" 
          className={cn(buttonClass, "col-span-2")}
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>
        
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={handleDecimal}
        >
          .
        </Button>
      </div>
    </div>
  );
};
