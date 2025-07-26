import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Play, SkipForward } from "lucide-react";
import { cn } from "@/lib/utils";
import PomodoroTimer from "./PomodoroTimer";

interface Task {
  id: string;
  title: string;
  duration: number; // in minutes
  completed: boolean;
  skipped: boolean;
}

interface TaskCardProps {
  task: Task;
  onComplete: (taskId: string) => void;
  onSkip: (taskId: string) => void;
  isActive: boolean;
}

const TaskCard = ({ task, onComplete, onSkip, isActive }: TaskCardProps) => {
  const [showTimer, setShowTimer] = useState(false);

  const handleStartTask = () => {
    setShowTimer(true);
  };

  const handleCompleteTask = () => {
    onComplete(task.id);
    setShowTimer(false);
  };

  const handleSkipTask = () => {
    onSkip(task.id);
    setShowTimer(false);
  };

  const getStatusColor = () => {
    if (task.completed) return "border-success bg-success/5";
    if (task.skipped) return "border-destructive bg-destructive/5";
    if (isActive) return "border-primary bg-primary/5";
    return "border-border";
  };

  const getStatusIcon = () => {
    if (task.completed) return <CheckCircle2 className="h-5 w-5 text-success" />;
    if (task.skipped) return <SkipForward className="h-5 w-5 text-destructive" />;
    return <Clock className="h-5 w-5 text-muted-foreground" />;
  };

  const getStatusBadge = () => {
    if (task.completed) return <Badge className="bg-success/20 text-success border-success">✅ Completed</Badge>;
    if (task.skipped) return <Badge className="bg-destructive/20 text-destructive border-destructive">❌ Skipped</Badge>;
    if (isActive) return <Badge className="bg-primary/20 text-primary border-primary">🎯 Current Task</Badge>;
    return <Badge variant="outline">⏳ Pending</Badge>;
  };

  if (showTimer && !task.completed && !task.skipped) {
    return (
      <PomodoroTimer
        taskTitle={task.title}
        onComplete={handleCompleteTask}
        onSkip={handleSkipTask}
        isActive={isActive}
      />
    );
  }

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-md",
      getStatusColor(),
      isActive && "scale-105 shadow-lg"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-outfit font-semibold flex items-center space-x-2">
            {getStatusIcon()}
            <span className={cn(
              task.completed && "line-through text-muted-foreground",
              task.skipped && "line-through text-destructive/70"
            )}>
              {task.title}
            </span>
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{task.duration} minutes</span>
          </div>

          {!task.completed && !task.skipped && isActive && (
            <Button
              onClick={handleStartTask}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-medium"
            >
              <Play className="h-4 w-4 mr-1" />
              Start Timer
            </Button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300",
              task.completed && "bg-success w-full",
              task.skipped && "bg-destructive w-full",
              !task.completed && !task.skipped && isActive && "bg-primary w-1/3",
              !task.completed && !task.skipped && !isActive && "bg-muted-foreground w-0"
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;