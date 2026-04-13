"use client";

import { useState } from "react";

export default function Home() {
  const [currentDay, setCurrentDay] = useState(1);

  const dietPlan = [
    {
      day: 1,
      title: "Day 1: Detox Reset",
      meals: [
        "Breakfast: Green smoothie (spinach, banana, almond milk)",
        "Lunch: Quinoa salad with vegetables",
        "Dinner: Grilled chicken with steamed broccoli",
      ],
      tips: "Stay hydrated with 8+ glasses of water",
    },
    {
      day: 2,
      title: "Day 2: Fiber Focus",
      meals: [
        "Breakfast: Oatmeal with berries",
        "Lunch: Brown rice bowl with beans",
        "Dinner: Baked salmon with sweet potato",
      ],
      tips: "Include high-fiber foods for digestion",
    },
    {
      day: 3,
      title: "Day 3: Protein Power",
      meals: [
        "Breakfast: Egg white omelet with vegetables",
        "Lunch: Turkey breast sandwich (whole wheat)",
        "Dinner: Lean beef with roasted vegetables",
      ],
      tips: "Focus on lean protein sources",
    },
  ];

  const currentMeal = dietPlan.find((m) => m.day === currentDay) || dietPlan[0];

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            30-Day Restoration Diet Plan
          </h1>
          <p className="text-lg text-gray-600">
            Transform your health in just 30 days
          </p>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Progress
              </span>
              <span className="text-sm font-semibold text-primary">
                {currentDay}/30
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-primary h-3 rounded-full transition-all duration-300"
                style={{ width: `${(currentDay / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Current Day Plan */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {currentMeal.title}
          </h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Today&apos;s Meals
            </h3>
            <ul className="space-y-2">
              {currentMeal.meals.map((meal, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <span className="text-primary font-bold mt-1">✓</span>
                  <span className="text-gray-700">{meal}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-accent/10 border border-accent rounded-lg">
            <p className="text-sm text-gray-800">
              <strong>Today&apos;s Tip:</strong> {currentMeal.tips}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-400 transition-colors"
          >
            ← Previous
          </button>
          <span className="px-6 py-3 bg-primary text-white rounded-lg font-semibold">
            Day {currentDay}
          </span>
          <button
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
            className="px-6 py-3 bg-primary text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-green-600 transition-colors"
          >
            Next →
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">30</div>
            <div className="text-sm text-gray-600">Total Days</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">90</div>
            <div className="text-sm text-gray-600">Meals Planned</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {currentDay}
            </div>
            <div className="text-sm text-gray-600">Current Day</div>
          </div>
        </div>
      </div>
    </main>
  );
}
