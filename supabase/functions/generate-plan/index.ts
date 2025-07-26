import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal, months, dailyHours, fixedCommitments } = await req.json();
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured');
    }

    const prompt = `You are a productivity expert and AI mentor.

The user wants to achieve the following goal: "${goal}"

They want to complete it in: ${months || 'auto-determine based on goal complexity'} months.

They can dedicate ${dailyHours} hours per day.

They have these fixed commitments daily: ${fixedCommitments || 'none'}, so avoid planning during that time.

Break the goal into a monthly roadmap with clear milestones and subtasks.

Then for the first 7 days, generate a daily schedule with:

- List of tasks (with titles)
- Time duration for each task (auto-adjusted to fit user's available hours)
- Insert 5-minute breaks between every Pomodoro (25-minute task)
- Keep daily plans realistic, specific, and motivational
- Never generate dummy data — always base it on real skill breakdown (like HTML → CSS → JS in web dev)
- If months is not specified, determine optimal months based on goal complexity and daily hours

Output ONLY valid JSON in this exact format:
{
  "monthlyPlan": [
    {
      "month": 1,
      "goal": "Learn HTML and basic CSS",
      "milestones": ["Complete 10 HTML pages", "Build a basic portfolio site"]
    }
  ],
  "dailyTasks": [
    {
      "day": "Day 1",
      "tasks": [
        {"title": "Watch HTML Crash Course", "duration": 25},
        {"title": "Practice with 3 pages", "duration": 25}
      ]
    }
  ]
}`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    
    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const planData = JSON.parse(jsonMatch[0]);

    return new Response(JSON.stringify(planData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-plan function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});