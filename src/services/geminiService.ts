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

// Real Gemini API integration via Supabase Edge Function
export const generatePlan = async (request: PlanRequest): Promise<PlanResponse> => {
  try {
    const response = await fetch('/functions/v1/generate-plan', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        goal: request.goal,
        months: request.months,
        dailyHours: request.dailyHours,
        fixedCommitments: request.fixedCommitments,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error('Error generating plan:', error);
    throw new Error('Failed to generate plan. Please try again.');
  }
};
