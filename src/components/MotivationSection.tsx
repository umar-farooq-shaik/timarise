import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Quote, Clock, Trophy, Target } from "lucide-react";

const MotivationSection = () => {
  const motivationalQuotes = [
    "Time is what we want most, but what we use worst. - William Penn",
    "The way to get started is to quit talking and begin doing. - Walt Disney",
    "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
    "Time management is about life management. - Idowu Koyenikan",
    "Your future is created by what you do today, not tomorrow. - Robert Kiyosaki",
    "A year from now you may wish you had started today. - Karen Lamb"
  ];

  const timeMattersExamples = [
    {
      icon: "🏃‍♂️",
      title: "Usain Bolt's 0.01 Second Victory",
      description: "In 2008 Olympics, Bolt won gold by just 0.01 seconds. Those milliseconds changed history."
    },
    {
      icon: "🚀",
      title: "SpaceX Falcon Heavy Launch",
      description: "A 1-second delay in rocket launch can mean missing the optimal trajectory, costing millions."
    },
    {
      icon: "📈",
      title: "Stock Market Flash Crash",
      description: "In 2010, the market lost $1 trillion in 5 minutes due to automated trading algorithms."
    },
    {
      icon: "🏆",
      title: "Michael Phelps' Touch",
      description: "Won gold by 0.01 seconds in 2008. That split second was worth years of training."
    },
    {
      icon: "⚡",
      title: "Amazon's Page Load Time",
      description: "Every 100ms delay in page load costs Amazon $1% in sales. Time = Money."
    },
    {
      icon: "🎯",
      title: "Chess Grandmaster Moves",
      description: "Top players make moves in 0.1 seconds that amateurs take minutes to consider."
    }
  ];

  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <div className="space-y-6">
      {/* Quote of the Day */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-energy/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Quote className="h-5 w-5 text-primary" />
            <span>💡 Daily Motivation</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg font-outfit font-medium text-foreground italic leading-relaxed">
            "{randomQuote}"
          </blockquote>
        </CardContent>
      </Card>

      {/* Why Seconds Matter */}
      <Card className="border-energy/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-energy" />
            <span>⏳ Why Every Second Matters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-4">
              {timeMattersExamples.map((example, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <span className="text-2xl flex-shrink-0">{example.icon}</span>
                  <div>
                    <h4 className="font-outfit font-semibold text-foreground">
                      {example.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {example.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Success Principles */}
      <Card className="border-success/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-success" />
            <span>🎯 Time Mastery Principles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium">Consistency {">"} Intensity</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                25 minutes daily beats 3 hours once a week
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-energy" />
                <span className="font-medium">Progress {">"} Perfection</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                Small steps forward are still progress
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-success" />
                <span className="font-medium">Focus {">"} Multitasking</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                One task at a time yields better results
              </p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium">Rest {">"} Burnout</span>
              </div>
              <p className="text-sm text-muted-foreground pl-6">
                Scheduled breaks maintain peak performance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MotivationSection;