import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Coffee } from "lucide-react";
import { cn } from "@/lib/utils";

interface PomodoroTimerProps {
  taskTitle: string;
  onComplete: () => void;
  onSkip: () => void;
  isActive: boolean;
}

const PomodoroTimer = ({ taskTitle, onComplete, onSkip, isActive }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false);
      if (!isBreak) {
        // Pomodoro complete, start break
        setIsBreak(true);
        setTimeLeft(5 * 60); // 5 minute break
        onComplete();
      } else {
        // Break complete
        setIsBreak(false);
        setTimeLeft(25 * 60);
      }
    }
  }, [timeLeft, isBreak, onComplete]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? 5 * 60 : 25 * 60);
  };

  const handleSkip = () => {
    setIsRunning(false);
    onSkip();
  };

  const progress = isBreak 
    ? ((5 * 60 - timeLeft) / (5 * 60)) * 100
    : ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <Card className={cn(
      "transition-all duration-300",
      isActive ? "border-primary shadow-lg scale-105" : "border-border",
      isBreak && "border-success bg-success/5"
    )}>
      <CardContent className="p-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {isBreak ? (
              <Coffee className="h-5 w-5 text-success" />
            ) : (
              <span className="text-2xl">🧠</span>
            )}
            <h3 className="font-outfit font-semibold text-lg">
              {isBreak ? "Break Time" : taskTitle}
            </h3>
          </div>

          <div className="relative w-32 h-32 mx-auto">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className={cn(
                  "transition-all duration-1000 ease-linear",
                  isBreak ? "text-success" : "text-primary"
                )}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={cn(
                "text-2xl font-mono font-bold",
                isBreak ? "text-success" : "text-primary"
              )}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          <div className="flex justify-center space-x-2">
            {!isRunning ? (
              <Button
                onClick={handleStart}
                size="sm"
                className={cn(
                  "rounded-2xl font-medium",
                  isBreak 
                    ? "bg-success hover:bg-success/90" 
                    : "bg-primary hover:bg-primary/90"
                )}
              >
                <Play className="h-4 w-4 mr-1" />
                Start
              </Button>
            ) : (
              <Button
                onClick={handlePause}
                size="sm"
                variant="outline"
                className="rounded-2xl font-medium"
              >
                <Pause className="h-4 w-4 mr-1" />
                Pause
              </Button>
            )}
            
            <Button
              onClick={handleReset}
              size="sm"
              variant="outline"
              className="rounded-2xl font-medium"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>

            {!isBreak && (
              <Button
                onClick={handleSkip}
                size="sm"
                variant="destructive"
                className="rounded-2xl font-medium"
              >
                Skip
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;