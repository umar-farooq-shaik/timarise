import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Zap, TrendingUp, TrendingDown } from "lucide-react";

interface EnergyBarProps {
  level: number; // 0-100
  streak: number;
  className?: string;
}

const EnergyBar = ({ level, streak, className }: EnergyBarProps) => {
  const getEnergyColor = () => {
    if (level >= 80) return "from-success to-energy";
    if (level >= 50) return "from-energy to-primary";
    if (level >= 30) return "from-primary to-destructive";
    return "from-destructive/70 to-destructive";
  };

  const getEnergyIcon = () => {
    if (level >= 70) return <TrendingUp className="h-5 w-5 text-success" />;
    if (level >= 40) return <Zap className="h-5 w-5 text-energy" />;
    return <TrendingDown className="h-5 w-5 text-destructive" />;
  };

  const getEnergyMessage = () => {
    if (level >= 80) return "🔥 On fire! You're crushing it!";
    if (level >= 60) return "⚡ Great momentum! Keep it up!";
    if (level >= 40) return "💪 Building steam...";
    if (level >= 20) return "⚠️ Energy running low...";
    return "🆘 Critical! Time to refocus!";
  };

  return (
    <Card className={cn("border-primary/20", className)}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {getEnergyIcon()}
              <span className="font-outfit font-semibold text-foreground">
                Energy Level
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-muted-foreground">
                {streak} day streak 🔥
              </span>
              <span className="text-lg font-bold text-primary">
                {level}%
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-4 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                  getEnergyColor()
                )}
                style={{ width: `${level}%` }}
              />
            </div>
            {level > 0 && (
              <div 
                className="absolute top-0 h-full w-1 bg-white/80 rounded-full shadow-sm transition-all duration-500"
                style={{ left: `${Math.max(level - 1, 0)}%` }}
              />
            )}
          </div>

          <p className="text-sm text-center text-muted-foreground font-medium">
            {getEnergyMessage()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnergyBar;