
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, History, Clock } from 'lucide-react';

export interface CalculationEntry {
  calculation: string;
  result: string;
  timestamp: Date;
}

interface CalculationHistoryProps {
  history: CalculationEntry[];
  onClearHistory: () => void;
  onUseCalculation: (calculation: string, result: string) => void;
}

export const CalculationHistory: React.FC<CalculationHistoryProps> = ({ 
  history, 
  onClearHistory,
  onUseCalculation
}) => {
  if (history.length === 0) {
    return (
      <Card className="w-full shadow-md border-gray-200 bg-gradient-to-b from-white to-gray-50">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <History className="h-5 w-5 text-calculator-primary" />
            History
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-40 p-6 text-gray-500">
          <Clock className="h-12 w-12 mb-2 opacity-50 text-calculator-primary/50" />
          <p className="text-center">No calculation history yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-md border-gray-200 bg-gradient-to-b from-white to-gray-50">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <History className="h-5 w-5 text-calculator-primary" />
            History
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearHistory}
            className="text-xs h-8 hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <ScrollArea className="h-[240px] pr-2">
          <div className="space-y-2">
            {history.map((entry, index) => (
              <div 
                key={index} 
                className="p-3 rounded-md bg-white border border-gray-100 hover:bg-blue-50 hover:border-calculator-primary/30 transition-all duration-200 cursor-pointer shadow-sm hover:shadow"
                onClick={() => onUseCalculation(entry.calculation, entry.result)}
              >
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-600">{entry.calculation}</p>
                    <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                      {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="font-medium text-calculator-result text-lg">{entry.result}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
