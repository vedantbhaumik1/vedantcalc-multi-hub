
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

type ConversionCategory = {
  name: string;
  units: {
    id: string;
    name: string;
    factor: number;  // Conversion factor relative to the base unit
  }[];
};

export const UnitConverter: React.FC = () => {
  const conversionCategories: ConversionCategory[] = [
    {
      name: "Length",
      units: [
        { id: "mm", name: "Millimeter (mm)", factor: 0.001 },
        { id: "cm", name: "Centimeter (cm)", factor: 0.01 },
        { id: "m", name: "Meter (m)", factor: 1 },
        { id: "km", name: "Kilometer (km)", factor: 1000 },
        { id: "in", name: "Inch (in)", factor: 0.0254 },
        { id: "ft", name: "Foot (ft)", factor: 0.3048 },
        { id: "yd", name: "Yard (yd)", factor: 0.9144 },
        { id: "mi", name: "Mile (mi)", factor: 1609.344 }
      ]
    },
    {
      name: "Weight",
      units: [
        { id: "mg", name: "Milligram (mg)", factor: 0.001 },
        { id: "g", name: "Gram (g)", factor: 1 },
        { id: "kg", name: "Kilogram (kg)", factor: 1000 },
        { id: "oz", name: "Ounce (oz)", factor: 28.3495 },
        { id: "lb", name: "Pound (lb)", factor: 453.592 },
        { id: "st", name: "Stone (st)", factor: 6350.29 },
        { id: "ton", name: "Metric Ton (t)", factor: 1000000 }
      ]
    },
    {
      name: "Temperature",
      units: [
        { id: "c", name: "Celsius (°C)", factor: 1 },
        { id: "f", name: "Fahrenheit (°F)", factor: 1 },
        { id: "k", name: "Kelvin (K)", factor: 1 }
      ]
    },
    {
      name: "Volume",
      units: [
        { id: "ml", name: "Milliliter (ml)", factor: 1 },
        { id: "l", name: "Liter (l)", factor: 1000 },
        { id: "floz", name: "Fluid Ounce (fl oz)", factor: 29.5735 },
        { id: "cup", name: "Cup", factor: 236.588 },
        { id: "pt", name: "Pint (pt)", factor: 473.176 },
        { id: "qt", name: "Quart (qt)", factor: 946.353 },
        { id: "gal", name: "Gallon (gal)", factor: 3785.41 }
      ]
    }
  ];

  const [category, setCategory] = useState(conversionCategories[0]);
  const [fromUnit, setFromUnit] = useState(category.units[0]);
  const [toUnit, setToUnit] = useState(category.units[1]);
  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  useEffect(() => {
    // Reset units when category changes
    setFromUnit(category.units[0]);
    setToUnit(category.units[1]);
    setFromValue('1');
    convert('1', category.units[0], category.units[1]);
  }, [category]);

  const convert = (value: string, from: typeof fromUnit, to: typeof toUnit) => {
    if (!value || isNaN(parseFloat(value))) {
      setToValue('');
      return;
    }

    const fromVal = parseFloat(value);
    
    // Special case for temperature
    if (category.name === "Temperature") {
      let result: number;
      
      if (from.id === "c" && to.id === "f") {
        result = (fromVal * 9/5) + 32;
      } else if (from.id === "c" && to.id === "k") {
        result = fromVal + 273.15;
      } else if (from.id === "f" && to.id === "c") {
        result = (fromVal - 32) * 5/9;
      } else if (from.id === "f" && to.id === "k") {
        result = (fromVal - 32) * 5/9 + 273.15;
      } else if (from.id === "k" && to.id === "c") {
        result = fromVal - 273.15;
      } else if (from.id === "k" && to.id === "f") {
        result = (fromVal - 273.15) * 9/5 + 32;
      } else {
        result = fromVal; // Same unit
      }
      
      setToValue(result.toFixed(4).replace(/\.?0+$/, ""));
    } else {
      // For other unit types, use the conversion factor
      const baseValue = fromVal * from.factor;
      const result = baseValue / to.factor;
      setToValue(result.toFixed(6).replace(/\.?0+$/, ""));
    }
  };

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromValue(value);
    convert(value, fromUnit, toUnit);
  };

  const handleFromUnitChange = (unitId: string) => {
    const unit = category.units.find(u => u.id === unitId)!;
    setFromUnit(unit);
    convert(fromValue, unit, toUnit);
  };

  const handleToUnitChange = (unitId: string) => {
    const unit = category.units.find(u => u.id === unitId)!;
    setToUnit(unit);
    convert(fromValue, fromUnit, unit);
  };

  const handleCategoryChange = (categoryName: string) => {
    const cat = conversionCategories.find(c => c.name === categoryName)!;
    setCategory(cat);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Unit Converter</h2>
      
      <div className="mb-6">
        <Label htmlFor="category" className="mb-1 block">Category</Label>
        <Select
          value={category.name}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {conversionCategories.map((cat) => (
              <SelectItem key={cat.name} value={cat.name}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="fromValue" className="mb-1 block">From</Label>
              <Input
                id="fromValue"
                type="number"
                value={fromValue}
                onChange={handleFromValueChange}
                className="mb-2"
              />
            </div>
            
            <div>
              <Label htmlFor="fromUnit" className="mb-1 block">Unit</Label>
              <Select
                value={fromUnit.id}
                onValueChange={handleFromUnitChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {category.units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="toValue" className="mb-1 block">To</Label>
              <Input
                id="toValue"
                type="text"
                value={toValue}
                readOnly
                className="mb-2 bg-gray-50"
              />
            </div>
            
            <div>
              <Label htmlFor="toUnit" className="mb-1 block">Unit</Label>
              <Select
                value={toUnit.id}
                onValueChange={handleToUnitChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {category.units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>
      
      <div className="mt-8 text-sm text-gray-500">
        <p>Tip: You can enter a value and select different units to convert between them.</p>
      </div>
    </div>
  );
};
