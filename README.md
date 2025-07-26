# ⏳ Timarise - Master Your Minutes, Achieve Your Mission

> “You don't need more time. You need better timecraft.”

## 🚀 Inspiration

The idea for **Timarise** came from a personal struggle: how to make every minute of the day count toward meaningful goals, especially when juggling studies, work, and life. I wanted to create a tool that doesn't just help with time management, but **turns time into motivation**. 

Inspired by gamified productivity apps, Pomodoro timers, and goal-setting psychology, Timarise blends AI with behavioral nudges to create a **visually motivating, energy-aware roadmap** for success.

---

## 🧠 What it does

**Timarise** is a gamified time-crafting assistant that:

- Takes your **goal**, target **duration (in months)**, and **daily available hours**
- Uses **Gemini Flash 2.0** to generate a **custom roadmap** with:
  - Milestones
  - Daily tasks with break buffers
  - Energy-based task tracking
- Includes:
  - ✅ Pomodoro timer per task
  - 🔋 Energy bar (fades if skipped, grows on completion)
  - ✨ Motivational quote section and real-world stories on time

It’s built to be **minimalist, mobile-first**, and distraction-free.

---

## 🛠️ How I built it

- **Frontend**: React (Vite) + TailwindCSS (dark/light mode toggle, custom theme with green, red, orange, and cream)
- **AI**: Gemini Flash 2.0 via API for generating personalized roadmaps and daily tasks
- **Timers**: Custom Pomodoro and break timers using `setInterval`
- **UI/UX**:
  - Gamified elements: progress/energy bars, badge unlocks
  - Mobile-first design, with smooth transitions, hover animations
---

## 🧗‍♂️ Challenges I ran into

- Balancing **visual appeal** with **functional simplicity**
- Ensuring **energy bar transitions** work across light/dark themes
- Creating meaningful AI prompts to output usable daily roadmaps
- Making Pomodoro timers work seamlessly per task
- Avoiding bloat - keeping the experience focused and fast

---

## 🏆 Accomplishments that I'm proud of

- Built a **fully functional productivity tool** in a single-page app
- Created a **clean and consistent color theme** for both light and dark mode
- Integrated **AI-driven planning** in a motivational and non-robotic way
- Designed the app to be **usable without login or distractions**
- Every interaction - from sliders to badge animations - feels polished

---

## 📚 What I learned

- Effective use of TailwindCSS with dark/light theming and gamified elements
- Prompt engineering for Gemini to deliver structured learning plans
- Building task-based Pomodoro flows from scratch
- Designing for **mobile-first minimalism** with **maximum utility**
- How motivation can be coded visually — colors, streaks, energy bars

---

## 🔮 What's next for Timarise

- ✅ Add **local storage** for offline task tracking
 - 🏅 Badge generation and shareable milestones (e.g., 3-day streak)
- 🧠 Add **AI insights** from user progress (e.g., "You're behind on week 2, reschedule?")
- 📆 Google Calendar / Notion sync
- 📊 Export as PDF or Trello board
- 📱 Convert into a **PWA** (Installable Web App)
- 💬 User streak leaderboard (anonymous)
- 🌍 Multilingual support (starting with Hindi and Spanish)

---

🕰️ _“You don’t manage time. You craft it.” — Timarise_
