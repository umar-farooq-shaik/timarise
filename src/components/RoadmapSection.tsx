import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp, Calendar, Target, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthlyPlan {
  month: number;
  goal: string;
  milestones: string[];
}

interface RoadmapSectionProps {
  monthlyPlan: MonthlyPlan[];
  currentMonth: number;
}

const RoadmapSection = ({ monthlyPlan, currentMonth }: RoadmapSectionProps) => {
  const [openMonths, setOpenMonths] = useState<Set<number>>(new Set([1]));

  const toggleMonth = (month: number) => {
    const newOpenMonths = new Set(openMonths);
    if (newOpenMonths.has(month)) {
      newOpenMonths.delete(month);
    } else {
      newOpenMonths.add(month);
    }
    setOpenMonths(newOpenMonths);
  };

  const getMonthStatus = (month: number) => {
    if (month < currentMonth) return 'completed';
    if (month === currentMonth) return 'current';
    return 'pending';
  };

  const getMonthBadge = (month: number) => {
    const status = getMonthStatus(month);
    if (status === 'completed') {
      return <Badge className="bg-success/20 text-success border-success">✅ Completed</Badge>;
    }
    if (status === 'current') {
      return <Badge className="bg-primary/20 text-primary border-primary">🎯 Current</Badge>;
    }
    return <Badge variant="outline">⏳ Upcoming</Badge>;
  };

  const getCardStyle = (month: number) => {
    const status = getMonthStatus(month);
    if (status === 'completed') return "border-success bg-success/5";
    if (status === 'current') return "border-primary bg-primary/5 shadow-lg";
    return "border-border";
  };

  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-outfit font-bold text-foreground">
            🗺️ Your Learning Roadmap
          </h2>
          <p className="text-lg text-muted-foreground">
            Your personalized journey broken down month by month
          </p>
        </div>

        <div className="grid gap-4">
          {monthlyPlan.map((plan) => {
            const isOpen = openMonths.has(plan.month);
            const status = getMonthStatus(plan.month);
            
            return (
              <Card
                key={plan.month}
                className={cn(
                  "transition-all duration-300",
                  getCardStyle(plan.month),
                  status === 'current' && "scale-105"
                )}
              >
                <Collapsible open={isOpen} onOpenChange={() => toggleMonth(plan.month)}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover:bg-muted/30 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={cn(
                            "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                            status === 'completed' && "bg-success text-success-foreground",
                            status === 'current' && "bg-primary text-primary-foreground",
                            status === 'pending' && "bg-muted text-muted-foreground"
                          )}>
                            {status === 'completed' ? (
                              <CheckCircle className="h-6 w-6" />
                            ) : (
                              plan.month
                            )}
                          </div>
                          <div className="text-left">
                            <CardTitle className="flex items-center space-x-2">
                              <Calendar className="h-5 w-5" />
                              <span>Month {plan.month}</span>
                            </CardTitle>
                            <p className="text-sm text-muted-foreground mt-1">
                              {plan.goal}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {getMonthBadge(plan.month)}
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                      </div>
                    </CardHeader>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-outfit font-semibold text-foreground mb-3 flex items-center space-x-2">
                            <Target className="h-4 w-4 text-primary" />
                            <span>Key Milestones</span>
                          </h4>
                          <div className="space-y-2">
                            {plan.milestones.map((milestone, index) => (
                              <div
                                key={index}
                                className={cn(
                                  "flex items-start space-x-3 p-3 rounded-lg transition-colors",
                                  status === 'completed' && "bg-success/10 text-success-foreground",
                                  status === 'current' && "bg-primary/10 text-primary-foreground",
                                  status === 'pending' && "bg-muted/50"
                                )}
                              >
                                <span className="text-sm font-medium text-muted-foreground flex-shrink-0 mt-0.5">
                                  {index + 1}.
                                </span>
                                <span className="text-sm font-medium">
                                  {milestone}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {status === 'current' && (
                          <div className="pt-4 border-t border-border">
                            <Button
                              size="sm"
                              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium"
                              onClick={() => {
                                document.getElementById('today-tasks')?.scrollIntoView({ 
                                  behavior: 'smooth' 
                                });
                              }}
                            >
                              View Today's Tasks
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;