
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft } from "lucide-react";

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState<string>("100");
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [convertedAmount, setConvertedAmount] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" }
  ];

  // Mock exchange rates (in a real app, these would come from an API)
  const mockExchangeRates: Record<string, Record<string, number>> = {
    USD: {
      EUR: 0.91, GBP: 0.78, JPY: 151.12, CAD: 1.35, AUD: 1.51, CHF: 0.89, CNY: 7.23,
      INR: 83.45, MXN: 16.82, SGD: 1.34, NZD: 1.63, BRL: 5.05, KRW: 1347.26, RUB: 92.30
    },
    EUR: {
      USD: 1.10, GBP: 0.85, JPY: 166.07, CAD: 1.48, AUD: 1.66, CHF: 0.97, CNY: 7.94,
      INR: 91.70, MXN: 18.48, SGD: 1.47, NZD: 1.79, BRL: 5.55, KRW: 1480.99, RUB: 101.53
    },
    GBP: {
      USD: 1.29, EUR: 1.17, JPY: 194.57, CAD: 1.73, AUD: 1.94, CHF: 1.14, CNY: 9.30,
      INR: 107.41, MXN: 21.65, SGD: 1.73, NZD: 2.10, BRL: 6.50, KRW: 1735.52, RUB: 118.97
    }
    // ... Additional exchange rates would be here
  };

  // Function to set up remaining exchange rates
  const setupMockExchangeRates = () => {
    currencies.forEach(baseCurrency => {
      if (!mockExchangeRates[baseCurrency.code]) {
        mockExchangeRates[baseCurrency.code] = {};
        
        currencies.forEach(targetCurrency => {
          if (baseCurrency.code === targetCurrency.code) {
            mockExchangeRates[baseCurrency.code][targetCurrency.code] = 1;
          } else if (mockExchangeRates.USD && mockExchangeRates.USD[targetCurrency.code]) {
            // Derive cross rates using USD as base
            const baseToUSD = baseCurrency.code === "USD" ? 1 : (mockExchangeRates.USD[baseCurrency.code] ? 1 / mockExchangeRates.USD[baseCurrency.code] : 1);
            const usdToTarget = mockExchangeRates.USD[targetCurrency.code];
            mockExchangeRates[baseCurrency.code][targetCurrency.code] = baseToUSD * usdToTarget;
          }
        });
      }
    });
  };

  useEffect(() => {
    setupMockExchangeRates();
    calculateConversion();
    setLastUpdated(new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString());
  }, []);

  const calculateConversion = () => {
    const inputAmount = parseFloat(amount);
    
    if (isNaN(inputAmount)) {
      setConvertedAmount("Invalid amount");
      setExchangeRate(null);
      return;
    }

    // Get exchange rate from the mock data
    let rate = 1;
    if (fromCurrency === toCurrency) {
      rate = 1;
    } else if (mockExchangeRates[fromCurrency] && mockExchangeRates[fromCurrency][toCurrency]) {
      rate = mockExchangeRates[fromCurrency][toCurrency];
    } else if (mockExchangeRates[toCurrency] && mockExchangeRates[toCurrency][fromCurrency]) {
      rate = 1 / mockExchangeRates[toCurrency][fromCurrency];
    }
    
    setExchangeRate(rate);
    const result = inputAmount * rate;
    setConvertedAmount(result.toFixed(2));
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    // Recalculate immediately after swapping
    setTimeout(calculateConversion, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Currency Converter</h2>
      
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input 
                id="amount" 
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-5 gap-4 items-center">
              <div className="col-span-2">
                <Label htmlFor="fromCurrency">From</Label>
                <Select
                  value={fromCurrency}
                  onValueChange={setFromCurrency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={swapCurrencies}
                  className="rounded-full"
                >
                  <ArrowRightLeft className="h-5 w-5" />
                </Button>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="toCurrency">To</Label>
                <Select
                  value={toCurrency}
                  onValueChange={setToCurrency}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map(currency => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full" onClick={calculateConversion}>
              Convert
            </Button>
            
            {convertedAmount && (
              <div className="bg-blue-50 p-5 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-gray-500">From</p>
                    <p className="text-xl font-semibold">
                      {currencies.find(c => c.code === fromCurrency)?.symbol} {parseFloat(amount).toFixed(2)}
                    </p>
                    <p>{fromCurrency}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">To</p>
                    <p className="text-2xl font-bold text-calculator-result">
                      {currencies.find(c => c.code === toCurrency)?.symbol} {convertedAmount}
                    </p>
                    <p>{toCurrency}</p>
                  </div>
                </div>
                
                {exchangeRate !== null && (
                  <div className="pt-4 border-t border-blue-100">
                    <p className="text-sm">
                      1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
                    </p>
                    <p className="text-sm text-gray-500">
                      Last updated: {lastUpdated}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Note: These rates are for demo purposes only.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
