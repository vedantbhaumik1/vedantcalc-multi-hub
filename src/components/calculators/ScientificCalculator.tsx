
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ScientificCalculator: React.FC = () => {
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
      case '^': return Math.pow(a, b);
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

  const handleScientificOperation = (op: string) => {
    const current = parseFloat(display);
    let result: number;

    switch (op) {
      case 'sin':
        result = Math.sin(current);
        break;
      case 'cos':
        result = Math.cos(current);
        break;
      case 'tan':
        result = Math.tan(current);
        break;
      case 'log':
        result = Math.log10(current);
        break;
      case 'ln':
        result = Math.log(current);
        break;
      case 'sqrt':
        result = Math.sqrt(current);
        break;
      case '1/x':
        result = 1 / current;
        break;
      case 'x^2':
        result = Math.pow(current, 2);
        break;
      default:
        return;
    }

    setDisplay(String(result));
    setResetDisplay(true);
  };

  const buttonClass = "h-12 text-sm font-medium transition-colors";
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Scientific Calculator</h2>
      
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
      
      <div className="grid grid-cols-5 gap-2 mb-2">
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('sin')}
        >
          sin
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('cos')}
        >
          cos
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('tan')}
        >
          tan
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('log')}
        >
          log
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('ln')}
        >
          ln
        </Button>
        
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('sqrt')}
        >
          √
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('1/x')}
        >
          1/x
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleScientificOperation('x^2')}
        >
          x²
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={() => handleOperationClick('^')}
        >
          x^y
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300")}
          onClick={handleClear}
        >
          C
        </Button>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('7')}
        >
          7
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('8')}
        >
          8
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('9')}
        >
          9
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
          className={buttonClass}
          onClick={() => handleNumberClick('4')}
        >
          4
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('5')}
        >
          5
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('6')}
        >
          6
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('×')}
        >
          ×
        </Button>
        
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('1')}
        >
          1
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('2')}
        >
          2
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('3')}
        >
          3
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('-')}
        >
          -
        </Button>
        
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('0')}
        >
          0
        </Button>
        <Button 
          variant="outline" 
          className={buttonClass}
          onClick={() => handleNumberClick('.')}
        >
          .
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-primary text-white hover:bg-calculator-primary/90")}
          onClick={handleEquals}
        >
          =
        </Button>
        <Button 
          variant="outline" 
          className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90")}
          onClick={() => handleOperationClick('+')}
        >
          +
        </Button>
      </div>
    </div>
  );
};
