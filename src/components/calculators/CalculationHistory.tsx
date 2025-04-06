
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, History } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center h-full p-6 text-gray-500">
        <History className="h-12 w-12 mb-2 opacity-50" />
        <p className="text-center">No calculation history yet.</p>
      </div>
    );
  }

  return (
    <Card className="w-full shadow-sm border-gray-200">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <History className="h-5 w-5" />
            History
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onClearHistory}
            className="text-xs h-8"
          >
            <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[200px]">
          <div className="space-y-2">
            {history.map((entry, index) => (
              <div 
                key={index} 
                className="p-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                onClick={() => onUseCalculation(entry.calculation, entry.result)}
              >
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">{entry.calculation}</p>
                    <p className="font-medium">{entry.result}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {entry.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
