import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Target, Clock } from "lucide-react";

interface HeroSectionProps {
  onGeneratePlan: (data: {
    goal: string;
    months: number;
    dailyHours: number;
    fixedCommitments: string;
  }) => void;
  loading: boolean;
}

const HeroSection = ({ onGeneratePlan, loading }: HeroSectionProps) => {
  const [goal, setGoal] = useState("");
  const [months, setMonths] = useState<number>(0);
  const [dailyHours, setDailyHours] = useState([4]);
  const [fixedCommitments, setFixedCommitments] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal.trim()) return;
    
    onGeneratePlan({
      goal: goal.trim(),
      months,
      dailyHours: dailyHours[0],
      fixedCommitments: fixedCommitments.trim(),
    });
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-primary">
            <Sparkles className="h-8 w-8" />
            <span className="text-4xl">⚡</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-foreground leading-tight">
            Craft Your Time.{" "}
            <span className="text-primary">Master Your Life.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            Transform your goals into personalized learning plans with AI-powered 
            roadmaps and gamified progress tracking.
          </p>
        </div>

        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Target className="h-5 w-5 text-primary" />
              <span>Create Your Plan</span>
            </CardTitle>
            <CardDescription>
              Tell us your goal and we'll create a personalized roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="goal" className="text-sm font-medium">
                  What's your goal? ✨
                </Label>
                <Textarea
                  id="goal"
                  placeholder="e.g., Become a Front End Web Developer, Learn Spanish fluently, Master Digital Marketing..."
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="min-h-[80px] resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="months" className="text-sm font-medium">
                    Target completion (months) 📅
                  </Label>
                  <Input
                    id="months"
                    type="number"
                    placeholder="Leave empty for AI suggestion"
                    value={months || ""}
                    onChange={(e) => setMonths(Number(e.target.value) || 0)}
                    min="0"
                    max="24"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Daily hours available: {dailyHours[0]}h ⏰</span>
                  </Label>
                  <Slider
                    value={dailyHours}
                    onValueChange={setDailyHours}
                    max={12}
                    min={1}
                    step={0.5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1h</span>
                    <span>12h</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="commitments" className="text-sm font-medium">
                  Fixed commitments (optional) 🏫
                </Label>
                <Input
                  id="commitments"
                  placeholder="e.g., College 9-3 PM, Work 10-6 PM, etc."
                  value={fixedCommitments}
                  onChange={(e) => setFixedCommitments(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={!goal.trim() || loading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium text-lg py-6"
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary-foreground border-t-transparent" />
                    <span>Crafting your plan...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Generate My Plan</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default HeroSection;