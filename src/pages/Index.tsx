import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import RoadmapSection from "@/components/RoadmapSection";
import DailyTasksSection from "@/components/DailyTasksSection";
import MotivationSection from "@/components/MotivationSection";
import { generatePlan } from "@/services/geminiService";

interface PlanData {
  goal: string;
  months: number;
  dailyHours: number;
  fixedCommitments: string;
}

interface MonthlyPlan {
  month: number;
  goal: string;
  milestones: string[];
}

interface DailyTask {
  day: string;
  tasks: Array<{
    title: string;
    duration: number;
  }>;
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [planGenerated, setPlanGenerated] = useState(false);
  const [monthlyPlan, setMonthlyPlan] = useState<MonthlyPlan[]>([]);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>([]);
  const [currentDay, setCurrentDay] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(1);

  const handleGeneratePlan = async (data: PlanData) => {
    setLoading(true);
    
    try {
      const response = await generatePlan(data);
      
      setMonthlyPlan(response.monthlyPlan);
      setDailyTasks(response.dailyTasks);
      setPlanGenerated(true);
      setCurrentDay(1);
      setCurrentMonth(1);
      
      toast({
        title: "🎉 Plan Generated Successfully!",
        description: `Your ${data.goal} roadmap is ready. Let's start your journey!`,
      });
      
      // Scroll to roadmap section
      setTimeout(() => {
        document.getElementById('roadmap-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        });
      }, 500);
      
    } catch (error) {
      toast({
        title: "⚠️ Something went wrong",
        description: "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navbar />
      
      <main>
        {!planGenerated ? (
          <HeroSection onGeneratePlan={handleGeneratePlan} loading={loading} />
        ) : (
          <div className="space-y-0">
            <div id="roadmap-section">
              <RoadmapSection 
                monthlyPlan={monthlyPlan} 
                currentMonth={currentMonth}
              />
            </div>
            
            <DailyTasksSection 
              dailyTasks={dailyTasks}
              currentDay={currentDay}
            />
            
            <div className="py-12 px-4">
              <div className="max-w-4xl mx-auto">
                <MotivationSection />
              </div>
            </div>
          </div>
        )}
      </main>
      
      <footer className="border-t bg-background/95 backdrop-blur">
        <div className="container py-8 text-center space-y-2">
          <p className="text-muted-foreground">
            Built for the love of time 🕰️
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ using React + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
