import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import TaskCard from "./TaskCard";
import EnergyBar from "./EnergyBar";

interface Task {
  id: string;
  title: string;
  duration: number;
  completed: boolean;
  skipped: boolean;
}

interface DailyTask {
  day: string;
  tasks: Array<{
    title: string;
    duration: number;
  }>;
}

interface DailyTasksSectionProps {
  dailyTasks: DailyTask[];
  currentDay: number;
}

const DailyTasksSection = ({ dailyTasks, currentDay }: DailyTasksSectionProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [energyLevel, setEnergyLevel] = useState(75);
  const [streak, setStreak] = useState(1);

  // Initialize tasks when dailyTasks change
  useEffect(() => {
    if (dailyTasks.length > 0 && currentDay > 0) {
      const todayTasks = dailyTasks[currentDay - 1];
      if (todayTasks) {
        const initialTasks: Task[] = todayTasks.tasks.map((task, index) => ({
          id: `task-${currentDay}-${index}`,
          title: task.title,
          duration: task.duration,
          completed: false,
          skipped: false,
        }));
        setTasks(initialTasks);
      }
    }
  }, [dailyTasks, currentDay]);

  const getCurrentTaskIndex = () => {
    return tasks.findIndex(task => !task.completed && !task.skipped);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
    
    // Boost energy on completion
    setEnergyLevel(prev => Math.min(100, prev + 15));
    
    // Check if this completes the day
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    
    const allCompleted = updatedTasks.every(task => task.completed || task.skipped);
    const completedCount = updatedTasks.filter(task => task.completed).length;
    const totalTasks = updatedTasks.length;
    
    if (allCompleted && completedCount === totalTasks) {
      setStreak(prev => prev + 1);
    }
  };

  const handleSkipTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, skipped: true } : task
    ));
    
    // Reduce energy on skip
    setEnergyLevel(prev => Math.max(0, prev - 10));
  };

  const currentTaskIndex = getCurrentTaskIndex();
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const todayData = dailyTasks[currentDay - 1];
  
  if (!todayData || tasks.length === 0) {
    return (
      <section id="today-tasks" className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="border-primary/20">
            <CardContent className="p-12">
              <div className="space-y-4">
                <div className="text-6xl">🎯</div>
                <h3 className="text-2xl font-outfit font-bold">
                  Ready to start your journey?
                </h3>
                <p className="text-muted-foreground">
                  Generate your plan above to see your personalized daily tasks
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="today-tasks" className="py-12 px-4 bg-muted/30">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-outfit font-bold text-foreground">
            📅 Today's Mission
          </h2>
          <p className="text-lg text-muted-foreground">
            {todayData.day} • {completedTasks}/{totalTasks} tasks completed
          </p>
        </div>

        {/* Energy Bar */}
        <EnergyBar level={energyLevel} streak={streak} />

        {/* Progress Overview */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Daily Progress</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span>{completedTasks} completed</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{totalTasks - completedTasks - tasks.filter(t => t.skipped).length} remaining</span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-medium">{Math.round(completionRate)}%</span>
              </div>
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-all duration-500"
                  style={{ width: `${completionRate}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Grid */}
        <div className="grid gap-4">
          {tasks.map((task, index) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleCompleteTask}
              onSkip={handleSkipTask}
              isActive={index === currentTaskIndex}
            />
          ))}
        </div>

        {/* Completion Message */}
        {completedTasks === totalTasks && totalTasks > 0 && (
          <Card className="border-success bg-gradient-to-r from-success/10 to-energy/10">
            <CardContent className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-4xl">🎉</div>
                <h3 className="text-xl font-outfit font-bold text-success">
                  Fantastic! Day {currentDay} Complete!
                </h3>
                <p className="text-muted-foreground">
                  You've completed all tasks for today. Your streak continues! 🔥
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
};

export default DailyTasksSection;