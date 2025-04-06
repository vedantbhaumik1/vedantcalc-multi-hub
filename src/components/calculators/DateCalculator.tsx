
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { differenceInDays, differenceInMonths, differenceInYears, addDays, addMonths, addYears, format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, CalendarDays } from 'lucide-react';

export const DateCalculator: React.FC = () => {
  // Date difference calculator
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [dateDiff, setDateDiff] = useState<{days: number; months: number; years: number} | null>(null);
  
  // Date add/subtract calculator
  const [baseDate, setBaseDate] = useState<Date | undefined>(new Date());
  const [daysToAdd, setDaysToAdd] = useState<number>(0);
  const [monthsToAdd, setMonthsToAdd] = useState<number>(0);
  const [yearsToAdd, setYearsToAdd] = useState<number>(0);
  const [resultDate, setResultDate] = useState<Date | null>(null);

  // Calculate date difference
  const calculateDateDifference = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both start and end dates");
      return;
    }
    
    try {
      const days = differenceInDays(endDate, startDate);
      const months = differenceInMonths(endDate, startDate);
      const years = differenceInYears(endDate, startDate);
      
      setDateDiff({ days, months, years });
    } catch (error) {
      toast.error("Error calculating date difference");
      console.error(error);
    }
  };

  // Calculate date after adding/subtracting days/months/years
  const calculateDateAddSubtract = () => {
    if (!baseDate) {
      toast.error("Please select a base date");
      return;
    }
    
    try {
      let result = new Date(baseDate);
      result = addDays(result, daysToAdd);
      result = addMonths(result, monthsToAdd);
      result = addYears(result, yearsToAdd);
      
      setResultDate(result);
    } catch (error) {
      toast.error("Error calculating the resulting date");
      console.error(error);
    }
  };

  // Reset add/subtract form
  const resetAddSubtractForm = () => {
    setDaysToAdd(0);
    setMonthsToAdd(0);
    setYearsToAdd(0);
    setResultDate(null);
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Date Calculator</h2>
      
      <Tabs defaultValue="difference" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="difference" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Date Difference
          </TabsTrigger>
          <TabsTrigger value="addsubtract" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-calculator-primary/80 data-[state=active]:to-calculator-primary data-[state=active]:text-white transition-all">
            Add/Subtract Dates
          </TabsTrigger>
        </TabsList>
        
        {/* Date Difference Calculator */}
        <TabsContent value="difference">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Start Date</Label>
                  <div className="border rounded-md p-1">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                
                <div>
                  <Label className="mb-2 block">End Date</Label>
                  <div className="border rounded-md p-1">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={calculateDateDifference} className="w-full mt-6">
                Calculate Difference
              </Button>
              
              {dateDiff !== null && (
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Days</p>
                    <p className="text-2xl font-bold text-calculator-primary">{dateDiff.days}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Months</p>
                    <p className="text-2xl font-bold text-calculator-primary">{dateDiff.months}</p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg text-center">
                    <p className="text-sm text-gray-600">Years</p>
                    <p className="text-2xl font-bold text-calculator-primary">{dateDiff.years}</p>
                  </div>
                </div>
              )}
              
              {startDate && endDate && (
                <div className="mt-4 text-sm text-gray-500 text-center">
                  {format(startDate, "PPP")} to {format(endDate, "PPP")}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Add/Subtract Date Calculator */}
        <TabsContent value="addsubtract">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Base Date</Label>
                  <div className="border rounded-md p-1">
                    <Calendar
                      mode="single"
                      selected={baseDate}
                      onSelect={setBaseDate}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="daysToAdd">Days to Add/Subtract</Label>
                    <div className="flex mt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDaysToAdd(prev => prev - 1)}
                      >
                        -
                      </Button>
                      <input
                        id="daysToAdd"
                        type="number"
                        value={daysToAdd}
                        onChange={(e) => setDaysToAdd(parseInt(e.target.value || '0'))}
                        className="flex-1 text-center border-y border-input bg-background px-3 py-2"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setDaysToAdd(prev => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="monthsToAdd">Months to Add/Subtract</Label>
                    <div className="flex mt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMonthsToAdd(prev => prev - 1)}
                      >
                        -
                      </Button>
                      <input
                        id="monthsToAdd"
                        type="number"
                        value={monthsToAdd}
                        onChange={(e) => setMonthsToAdd(parseInt(e.target.value || '0'))}
                        className="flex-1 text-center border-y border-input bg-background px-3 py-2"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setMonthsToAdd(prev => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="yearsToAdd">Years to Add/Subtract</Label>
                    <div className="flex mt-1">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYearsToAdd(prev => prev - 1)}
                      >
                        -
                      </Button>
                      <input
                        id="yearsToAdd"
                        type="number"
                        value={yearsToAdd}
                        onChange={(e) => setYearsToAdd(parseInt(e.target.value || '0'))}
                        className="flex-1 text-center border-y border-input bg-background px-3 py-2"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setYearsToAdd(prev => prev + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button onClick={calculateDateAddSubtract} className="flex-1">
                      Calculate
                    </Button>
                    <Button variant="outline" onClick={resetAddSubtractForm}>
                      Reset
                    </Button>
                  </div>
                </div>
              </div>
              
              {resultDate && (
                <div className="mt-6 p-4 bg-gradient-to-r from-calculator-primary/20 to-calculator-accent/20 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <CalendarDays className="h-5 w-5 text-calculator-primary" />
                    <p className="text-sm text-gray-600">Resulting Date:</p>
                  </div>
                  <p className="text-2xl font-bold text-calculator-result">{format(resultDate, "PPP")}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    {daysToAdd !== 0 && `${Math.abs(daysToAdd)} days ${daysToAdd > 0 ? 'after' : 'before'}`}
                    {monthsToAdd !== 0 && `${daysToAdd !== 0 ? ', ' : ''}${Math.abs(monthsToAdd)} months ${monthsToAdd > 0 ? 'after' : 'before'}`}
                    {yearsToAdd !== 0 && `${daysToAdd !== 0 || monthsToAdd !== 0 ? ', ' : ''}${Math.abs(yearsToAdd)} years ${yearsToAdd > 0 ? 'after' : 'before'}`}
                    {daysToAdd === 0 && monthsToAdd === 0 && yearsToAdd === 0 && 'Same as base date'}
                    {daysToAdd !== 0 || monthsToAdd !== 0 || yearsToAdd !== 0 ? ' the base date' : ''}
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
