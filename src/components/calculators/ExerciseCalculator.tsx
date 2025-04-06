
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const ExerciseCalculator: React.FC = () => {
  // Calories Burned Calculator
  const [weight, setWeight] = useState<string>('70');
  const [duration, setDuration] = useState<string>('30');
  const [activity, setActivity] = useState<string>('running');
  const [caloriesResult, setCaloriesResult] = useState<string>('');

  // One Rep Max Calculator
  const [weight1RM, setWeight1RM] = useState<string>('100');
  const [reps, setReps] = useState<string>('10');
  const [maxResult, setMaxResult] = useState<string>('');

  // Body Fat Calculator
  const [gender, setGender] = useState<string>('male');
  const [waist, setWaist] = useState<string>('80');
  const [neck, setNeck] = useState<string>('36');
  const [height, setHeight] = useState<string>('175');
  const [hip, setHip] = useState<string>('100'); // Only used for females
  const [bodyFatResult, setBodyFatResult] = useState<string>('');

  const calculateCaloriesBurned = () => {
    const weightKg = parseFloat(weight);
    const durationMin = parseFloat(duration);
    let met = 0;
    
    switch (activity) {
      case 'walking':
        met = 3.8;
        break;
      case 'running':
        met = 9.8;
        break;
      case 'cycling':
        met = 7.5;
        break;
      case 'swimming':
        met = 5.8;
        break;
      case 'weightlifting':
        met = 6.0;
        break;
      default:
        met = 3.0;
    }
    
    // Calories burned = MET × weight (kg) × duration (hours)
    const caloriesBurned = met * weightKg * (durationMin / 60);
    
    setCaloriesResult(`Calories Burned: ${caloriesBurned.toFixed(0)} kcal`);
  };

  const calculate1RM = () => {
    const weightLifted = parseFloat(weight1RM);
    const repsPerformed = parseFloat(reps);
    
    // Brzycki Formula: 1RM = weight × (36 / (37 - reps))
    const oneRepMax = weightLifted * (36 / (37 - repsPerformed));
    
    setMaxResult(`Estimated One Rep Max: ${oneRepMax.toFixed(1)} kg`);
  };

  const calculateBodyFat = () => {
    const waistCm = parseFloat(waist);
    const neckCm = parseFloat(neck);
    const heightCm = parseFloat(height);
    
    let bodyFatPercentage = 0;
    
    if (gender === 'male') {
      // U.S. Navy Method for males
      bodyFatPercentage = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(heightCm)) - 450;
    } else {
      // U.S. Navy Method for females
      const hipCm = parseFloat(hip);
      bodyFatPercentage = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(heightCm)) - 450;
    }
    
    setBodyFatResult(`Estimated Body Fat: ${bodyFatPercentage.toFixed(1)}%`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-calculator-result">Exercise Calculator</h2>
      
      <Tabs defaultValue="calories" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="calories">Calories Burned</TabsTrigger>
          <TabsTrigger value="1rm">One Rep Max</TabsTrigger>
          <TabsTrigger value="bodyfat">Body Fat</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calories">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight">Body Weight (kg)</Label>
                  <Input 
                    id="weight" 
                    type="number" 
                    value={weight} 
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input 
                    id="duration" 
                    type="number" 
                    value={duration} 
                    onChange={(e) => setDuration(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="activity">Activity Type</Label>
                  <Select 
                    value={activity} 
                    onValueChange={setActivity}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="walking">Walking</SelectItem>
                      <SelectItem value="running">Running</SelectItem>
                      <SelectItem value="cycling">Cycling</SelectItem>
                      <SelectItem value="swimming">Swimming</SelectItem>
                      <SelectItem value="weightlifting">Weight Lifting</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button
                  className="w-full"
                  onClick={calculateCaloriesBurned}
                >
                  Calculate
                </Button>
                
                {caloriesResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="font-medium">{caloriesResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="1rm">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="weight1RM">Weight Lifted (kg)</Label>
                  <Input 
                    id="weight1RM" 
                    type="number" 
                    value={weight1RM} 
                    onChange={(e) => setWeight1RM(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="reps">Repetitions Performed</Label>
                  <Input 
                    id="reps" 
                    type="number" 
                    value={reps} 
                    onChange={(e) => setReps(e.target.value)}
                    max="36"
                  />
                </div>
                
                <Button
                  className="w-full"
                  onClick={calculate1RM}
                >
                  Calculate One Rep Max
                </Button>
                
                {maxResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="font-medium">{maxResult}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bodyfat">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    value={gender} 
                    onValueChange={setGender}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height" 
                    type="number" 
                    value={height} 
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="waist">Waist Circumference (cm)</Label>
                  <Input 
                    id="waist" 
                    type="number" 
                    value={waist} 
                    onChange={(e) => setWaist(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="neck">Neck Circumference (cm)</Label>
                  <Input 
                    id="neck" 
                    type="number" 
                    value={neck} 
                    onChange={(e) => setNeck(e.target.value)}
                  />
                </div>
                
                {gender === 'female' && (
                  <div>
                    <Label htmlFor="hip">Hip Circumference (cm)</Label>
                    <Input 
                      id="hip" 
                      type="number" 
                      value={hip} 
                      onChange={(e) => setHip(e.target.value)}
                    />
                  </div>
                )}
                
                <Button
                  className="w-full"
                  onClick={calculateBodyFat}
                >
                  Calculate Body Fat
                </Button>
                
                {bodyFatResult && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <p className="font-medium">{bodyFatResult}</p>
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
