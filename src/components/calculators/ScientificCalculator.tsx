
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calculator, History, ArrowLeft } from 'lucide-react';
import { CalculationHistory, CalculationEntry } from './CalculationHistory';
import { useToast } from "@/hooks/use-toast";

export const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [currentCalculation, setCurrentCalculation] = useState<string>('');
  const [history, setHistory] = useState<CalculationEntry[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Update current calculation display
    if (previousValue !== null && operation) {
      setCurrentCalculation(`${previousValue} ${operation}`);
    } else {
      setCurrentCalculation('');
    }
  }, [previousValue, operation]);

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
      case '÷': return b !== 0 ? a / b : NaN;
      case '^': return Math.pow(a, b);
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      
      if (isNaN(result)) {
        toast({
          title: "Math Error",
          description: "Invalid calculation",
          variant: "destructive",
        });
        handleClear();
        return;
      }
      
      const calculation = `${previousValue} ${operation} ${current}`;
      const resultStr = String(result);
      
      // Add to history
      setHistory(prev => [
        {
          calculation: calculation,
          result: resultStr,
          timestamp: new Date()
        },
        ...prev.slice(0, 9) // Keep only 10 most recent entries
      ]);
      
      setDisplay(resultStr);
      setPreviousValue(null);
      setOperation(null);
      setResetDisplay(true);
      setCurrentCalculation('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
    setCurrentCalculation('');
  };

  const handleScientificOperation = (op: string) => {
    const current = parseFloat(display);
    let result: number;
    let calculationText = '';

    try {
      switch (op) {
        case 'sin':
          result = Math.sin(current);
          calculationText = `sin(${current})`;
          break;
        case 'cos':
          result = Math.cos(current);
          calculationText = `cos(${current})`;
          break;
        case 'tan':
          result = Math.tan(current);
          calculationText = `tan(${current})`;
          break;
        case 'log':
          if (current <= 0) throw new Error("Cannot take log of non-positive number");
          result = Math.log10(current);
          calculationText = `log(${current})`;
          break;
        case 'ln':
          if (current <= 0) throw new Error("Cannot take ln of non-positive number");
          result = Math.log(current);
          calculationText = `ln(${current})`;
          break;
        case 'sqrt':
          if (current < 0) throw new Error("Cannot take square root of negative number");
          result = Math.sqrt(current);
          calculationText = `√(${current})`;
          break;
        case '1/x':
          if (current === 0) throw new Error("Cannot divide by zero");
          result = 1 / current;
          calculationText = `1/(${current})`;
          break;
        case 'x^2':
          result = Math.pow(current, 2);
          calculationText = `(${current})²`;
          break;
        default:
          return;
      }

      // Add to history
      setHistory(prev => [
        {
          calculation: calculationText,
          result: String(result),
          timestamp: new Date()
        },
        ...prev.slice(0, 9)
      ]);

      setDisplay(String(result));
      setResetDisplay(true);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "Math Error";
      toast({
        title: "Math Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    toast({
      title: "History cleared",
      description: "Your calculation history has been cleared"
    });
  };

  const handleUseCalculation = (calculation: string, result: string) => {
    setDisplay(result);
    setShowHistory(false);
  };

  const buttonClass = "h-12 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calculator-primary";
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Scientific Calculator
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History className="h-5 w-5" />
          <span className="ml-1 hidden md:inline">History</span>
        </Button>
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`md:col-span-${showHistory ? '2' : '3'}`}>
          <div className="bg-gradient-to-r from-calculator-primary/10 to-calculator-primary/5 rounded-lg overflow-hidden shadow-lg mb-4 transition-all duration-300 hover:shadow-xl">
            <div className="bg-white p-4 text-right">
              <div className="text-gray-500 text-sm h-6 overflow-x-auto">
                {currentCalculation}
              </div>
              <div className="text-3xl font-semibold text-calculator-result overflow-x-auto transition-all duration-300">
                {display}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-2 mb-2">
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('sin')}
            >
              sin
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('cos')}
            >
              cos
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('tan')}
            >
              tan
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('log')}
            >
              log
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('ln')}
            >
              ln
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('sqrt')}
            >
              √
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('1/x')}
            >
              1/x
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleScientificOperation('x^2')}
            >
              x²
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={() => handleOperationClick('^')}
            >
              x^y
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 transform active:scale-95 transition-transform")}
              onClick={handleClear}
            >
              C
            </Button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('7')}
            >
              7
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('8')}
            >
              8
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('9')}
            >
              9
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 transform active:scale-95 transition-transform")}
              onClick={() => handleOperationClick('÷')}
            >
              ÷
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('4')}
            >
              4
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('5')}
            >
              5
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('6')}
            >
              6
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 transform active:scale-95 transition-transform")}
              onClick={() => handleOperationClick('×')}
            >
              ×
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('1')}
            >
              1
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('2')}
            >
              2
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('3')}
            >
              3
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 transform active:scale-95 transition-transform")}
              onClick={() => handleOperationClick('-')}
            >
              -
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('0')}
            >
              0
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "transform active:scale-95 transition-transform")}
              onClick={() => handleNumberClick('.')}
            >
              .
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-primary text-white hover:bg-calculator-primary/90 transform active:scale-95 transition-transform")}
              onClick={handleEquals}
            >
              =
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 transform active:scale-95 transition-transform")}
              onClick={() => handleOperationClick('+')}
            >
              +
            </Button>
          </div>
        </div>
        
        {showHistory && (
          <div className="md:col-span-1">
            <CalculationHistory
              history={history}
              onClearHistory={handleClearHistory}
              onUseCalculation={handleUseCalculation}
            />
          </div>
        )}
      </div>
    </div>
  );
};
