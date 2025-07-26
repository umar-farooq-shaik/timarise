interface PlanRequest {
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

interface PlanResponse {
  monthlyPlan: MonthlyPlan[];
  dailyTasks: DailyTask[];
}

// Mock Gemini API response for demo purposes
// In production, you would integrate with the actual Gemini API
export const generatePlan = async (request: PlanRequest): Promise<PlanResponse> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Determine months if not specified
  const targetMonths = request.months || estimateMonths(request.goal, request.dailyHours);
  
  // Generate monthly plan based on the goal
  const monthlyPlan = generateMonthlyPlan(request.goal, targetMonths);
  
  // Generate first week's daily tasks
  const dailyTasks = generateDailyTasks(request.goal, request.dailyHours, request.fixedCommitments);
  
  return {
    monthlyPlan,
    dailyTasks
  };
};

function estimateMonths(goal: string, dailyHours: number): number {
  const goalLower = goal.toLowerCase();
  
  // Basic estimation logic based on common goals
  if (goalLower.includes('web dev') || goalLower.includes('frontend') || goalLower.includes('backend')) {
    return Math.max(3, Math.ceil(6 - dailyHours / 2));
  }
  if (goalLower.includes('language') || goalLower.includes('spanish') || goalLower.includes('french')) {
    return Math.max(6, Math.ceil(12 - dailyHours));
  }
  if (goalLower.includes('data science') || goalLower.includes('machine learning')) {
    return Math.max(4, Math.ceil(8 - dailyHours / 1.5));
  }
  if (goalLower.includes('marketing') || goalLower.includes('digital marketing')) {
    return Math.max(2, Math.ceil(4 - dailyHours / 3));
  }
  
  // Default estimation
  return Math.max(3, Math.ceil(6 - dailyHours / 2));
}

function generateMonthlyPlan(goal: string, months: number): MonthlyPlan[] {
  const goalLower = goal.toLowerCase();
  
  if (goalLower.includes('web dev') || goalLower.includes('frontend')) {
    return [
      {
        month: 1,
        goal: "HTML & CSS Fundamentals",
        milestones: [
          "Complete HTML structure and semantics",
          "Master CSS layout and styling",
          "Build 3 responsive web pages",
          "Understand Flexbox and Grid"
        ]
      },
      {
        month: 2,
        goal: "JavaScript Essentials",
        milestones: [
          "Learn JavaScript syntax and basics",
          "Understand DOM manipulation",
          "Master events and functions",
          "Build interactive web components"
        ]
      },
      {
        month: 3,
        goal: "React & Modern Development",
        milestones: [
          "Learn React components and JSX",
          "Understand state management",
          "Build a complete React application",
          "Deploy your portfolio online"
        ]
      }
    ].slice(0, months);
  }
  
  if (goalLower.includes('language') || goalLower.includes('spanish')) {
    return [
      {
        month: 1,
        goal: "Basic Vocabulary & Grammar",
        milestones: [
          "Learn 500 essential words",
          "Master present tense conjugations",
          "Practice basic conversations",
          "Understand sentence structure"
        ]
      },
      {
        month: 2,
        goal: "Intermediate Communication",
        milestones: [
          "Expand vocabulary to 1000 words",
          "Learn past and future tenses",
          "Practice daily conversations",
          "Understand common phrases"
        ]
      },
      {
        month: 3,
        goal: "Advanced Fluency",
        milestones: [
          "Master complex grammar rules",
          "Engage in fluent conversations",
          "Read and write short stories",
          "Pass intermediate proficiency test"
        ]
      }
    ].slice(0, months);
  }
  
  // Generic plan for other goals
  const genericPlan = [];
  for (let i = 1; i <= months; i++) {
    genericPlan.push({
      month: i,
      goal: `${goal} - Phase ${i}`,
      milestones: [
        `Complete foundational learning for month ${i}`,
        `Apply knowledge through practical exercises`,
        `Build portfolio project or milestone`,
        `Review and consolidate progress`
      ]
    });
  }
  
  return genericPlan;
}

function generateDailyTasks(goal: string, dailyHours: number, fixedCommitments: string): DailyTask[] {
  const goalLower = goal.toLowerCase();
  const availableMinutes = dailyHours * 60;
  
  // Base task structure for web development
  if (goalLower.includes('web dev') || goalLower.includes('frontend')) {
    return [
      {
        day: "Day 1",
        tasks: [
          { title: "Watch HTML Crash Course", duration: 25 },
          { title: "Practice HTML Structure", duration: 25 },
          { title: "Build Your First Web Page", duration: 25 },
          { title: "Review and Take Notes", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 2", 
        tasks: [
          { title: "CSS Basics and Selectors", duration: 25 },
          { title: "Style Your HTML Page", duration: 25 },
          { title: "Learn CSS Box Model", duration: 25 },
          { title: "Practice CSS Layouts", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 3",
        tasks: [
          { title: "Advanced CSS Properties", duration: 25 },
          { title: "Build Responsive Layout", duration: 25 },
          { title: "CSS Flexbox Tutorial", duration: 25 },
          { title: "Create Navigation Menu", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 4",
        tasks: [
          { title: "CSS Grid Layout System", duration: 25 },
          { title: "Build Grid-based Page", duration: 25 },
          { title: "Responsive Design Principles", duration: 25 },
          { title: "Mobile-First Approach", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 5",
        tasks: [
          { title: "CSS Animations and Transitions", duration: 25 },
          { title: "Create Interactive Elements", duration: 25 },
          { title: "Project: Portfolio Website", duration: 25 },
          { title: "Code Review and Optimization", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 6",
        tasks: [
          { title: "JavaScript Introduction", duration: 25 },
          { title: "Variables and Data Types", duration: 25 },
          { title: "Functions and Scope", duration: 25 },
          { title: "Practice JavaScript Basics", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      },
      {
        day: "Day 7",
        tasks: [
          { title: "DOM Manipulation Basics", duration: 25 },
          { title: "Event Handling", duration: 25 },
          { title: "Interactive Web Elements", duration: 25 },
          { title: "Week Review and Planning", duration: 25 }
        ].slice(0, Math.floor(availableMinutes / 30))
      }
    ];
  }
  
  // Generic task generation for other goals
  const days = [];
  for (let i = 1; i <= 7; i++) {
    const tasksPerDay = Math.floor(availableMinutes / 30);
    const tasks = [];
    
    for (let j = 1; j <= Math.min(tasksPerDay, 6); j++) {
      tasks.push({
        title: `${goal} - Learning Module ${j}`,
        duration: 25
      });
    }
    
    days.push({
      day: `Day ${i}`,
      tasks
    });
  }
  
  return days;
}