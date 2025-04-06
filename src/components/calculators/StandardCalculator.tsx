
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Calculator, History, ArrowLeft } from 'lucide-react';
import { CalculationHistory, CalculationEntry } from './CalculationHistory';
import { useToast } from "@/hooks/use-toast";

export const StandardCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [resetDisplay, setResetDisplay] = useState(false);
  const [currentCalculation, setCurrentCalculation] = useState<string>('');
  const [liveResult, setLiveResult] = useState<string>('');
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

  // Calculate live results as user types
  useEffect(() => {
    if (previousValue !== null && operation && display !== '0') {
      try {
        const current = parseFloat(display);
        const result = calculate(previousValue, current, operation);
        if (!isNaN(result) && isFinite(result)) {
          setLiveResult(`= ${result}`);
        } else {
          setLiveResult('');
        }
      } catch (error) {
        setLiveResult('');
      }
    } else {
      setLiveResult('');
    }
  }, [display, previousValue, operation]);

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
      default: return b;
    }
  };

  const handleEquals = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(previousValue, current, operation);
      
      if (isNaN(result) || !isFinite(result)) {
        toast({
          title: "Math Error",
          description: "Cannot divide by zero",
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
      setLiveResult('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setResetDisplay(false);
    setCurrentCalculation('');
    setLiveResult('');
  };

  const handleDecimal = () => {
    if (resetDisplay) {
      setDisplay('0.');
      setResetDisplay(false);
    } else if (!display.includes('.')) {
      setDisplay(display + '.');
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

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  const buttonClass = "h-14 text-lg font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-calculator-primary transform hover:scale-105 active:scale-95";
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result flex items-center">
        <Calculator className="mr-2 h-6 w-6" />
        Standard Calculator
        <Button
          variant="ghost"
          size="sm"
          className="ml-auto bg-calculator-primary/10 hover:bg-calculator-primary/20"
          onClick={() => setShowHistory(!showHistory)}
        >
          <History className="h-5 w-5" />
          <span className="ml-1 hidden md:inline">History</span>
        </Button>
      </h2>
      
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`md:col-span-${showHistory ? '2' : '3'}`}>
          <div className="bg-gradient-to-r from-calculator-primary/20 to-calculator-primary/10 rounded-lg overflow-hidden shadow-lg mb-4 transition-all duration-300 hover:shadow-xl">
            <div className="bg-white p-4 text-right">
              <div className="text-gray-500 text-sm h-6 overflow-x-auto">
                {currentCalculation}
              </div>
              <div className="text-3xl font-semibold text-calculator-result overflow-x-auto transition-all duration-300">
                {display}
              </div>
              <div className="text-lg text-calculator-primary font-medium h-6 overflow-x-auto animate-fade-in">
                {liveResult}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 shadow-sm")}
              onClick={handleClear}
            >
              C
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gray-200 hover:bg-gray-300 shadow-sm")}
              onClick={handleBackspace}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 shadow-md")}
              onClick={() => handleOperationClick('÷')}
            >
              ÷
            </Button>
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 shadow-md")}
              onClick={() => handleOperationClick('×')}
            >
              ×
            </Button>
            
            {[7, 8, 9].map(num => (
              <Button 
                key={num} 
                variant="outline" 
                className={cn(buttonClass, "bg-white shadow-sm")}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 shadow-md")}
              onClick={() => handleOperationClick('-')}
            >
              -
            </Button>
            
            {[4, 5, 6].map(num => (
              <Button 
                key={num} 
                variant="outline" 
                className={cn(buttonClass, "bg-white shadow-sm")}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-calculator-operation text-white hover:bg-calculator-operation/90 shadow-md")}
              onClick={() => handleOperationClick('+')}
            >
              +
            </Button>
            
            {[1, 2, 3].map(num => (
              <Button 
                key={num} 
                variant="outline" 
                className={cn(buttonClass, "bg-white shadow-sm")}
                onClick={() => handleNumberClick(num.toString())}
              >
                {num}
              </Button>
            ))}
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-gradient-to-r from-calculator-primary to-calculator-primary/80 text-white hover:from-calculator-primary/90 hover:to-calculator-primary/70 row-span-2 shadow-lg")}
              onClick={handleEquals}
            >
              =
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "col-span-2 bg-white shadow-sm")}
              onClick={() => handleNumberClick('0')}
            >
              0
            </Button>
            
            <Button 
              variant="outline" 
              className={cn(buttonClass, "bg-white shadow-sm")}
              onClick={handleDecimal}
            >
              .
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
