"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const dietPlanData = [
  { day: 1, phase: "Detox Reset", meals: ["Green smoothie (spinach, banana, almond milk)", "Quinoa salad with vegetables", "Grilled chicken with steamed broccoli"], tips: "Stay hydrated with 8+ glasses of water" },
  { day: 2, phase: "Fiber Focus", meals: ["Oatmeal with berries", "Brown rice bowl with beans", "Baked salmon with sweet potato"], tips: "Include high-fiber foods for digestion" },
  { day: 3, phase: "Protein Power", meals: ["Egg white omelet with vegetables", "Turkey breast sandwich (whole wheat)", "Lean beef with roasted vegetables"], tips: "Focus on lean protein sources" },
  { day: 4, phase: "Detox Reset", meals: ["Green smoothie with kale", "Vegetable stir-fry with tofu", "Grilled fish with asparagus"], tips: "Eat organic when possible" },
  { day: 5, phase: "Fiber Focus", meals: ["Chia seed pudding with berries", "Lentil soup", "Turkey meatballs with sweet potato"], tips: "Add flaxseeds to meals for omega-3s" },
  { day: 6, phase: "Protein Power", meals: ["Scrambled eggs with mushrooms", "Chicken breast salad", "Grilled steak with roasted vegetables"], tips: "Drink herbal tea throughout the day" },
  { day: 7, phase: "Detox Reset", meals: ["Green juice (celery, cucumber, ginger)", "Buddha bowl with quinoa", "White fish with steamed broccoli"], tips: "Rest and light stretching" },
  { day: 8, phase: "Fiber Focus", meals: ["Overnight oats with nuts", "Black bean burrito bowl", "Salmon with brown rice"], tips: "Increase water intake" },
  { day: 9, phase: "Protein Power", meals: ["Cottage cheese with berries", "Tuna salad", "Lean ground turkey with vegetables"], tips: "Track your energy levels" },
  { day: 10, phase: "Detox Reset", meals: ["Detox smoothie", "Raw vegetable platter with hummus", "Poached chicken breast with steamed vegetables"], tips: "Practice meditation for 10 minutes" },
  { day: 11, phase: "Fiber Focus", meals: ["Whole grain toast with almond butter", "Chickpea curry with brown rice", "Baked cod with quinoa"], tips: "Include probiotic foods daily" },
  { day: 12, phase: "Protein Power", meals: ["Protein pancakes with berries", "Grilled chicken with sweet potato", "Beef tenderloin with roasted root vegetables"], tips: "Rest day - light walking only" },
  { day: 13, phase: "Detox Reset", meals: ["Green smoothie bowl", "Vegetable soup", "Steamed fish with vegetables"], tips: "Avoid processed foods" },
  { day: 14, phase: "Fiber Focus", meals: ["Bran cereal with berries", "Lentil and vegetable stew", "Salmon with wild rice"], tips: "Half-way point - celebrate progress!" },
  { day: 15, phase: "Protein Power", meals: ["Greek yogurt with granola", "Turkey and vegetable wrap", "Grilled lamb chops with roasted vegetables"], tips: "Stay consistent with your routine" },
  { day: 16, phase: "Detox Reset", meals: ["Cucumber and lime water", "Green salad with olive oil", "White fish with steamed broccoli"], tips: "Reduce sodium intake" },
  { day: 17, phase: "Fiber Focus", meals: ["Steel-cut oats with apple", "Bean and vegetable soup", "Tuna with sweet potato"], tips: "Add more leafy greens" },
  { day: 18, phase: "Protein Power", meals: ["Egg muffins", "Grilled chicken with quinoa", "Sirloin steak with asparagus"], tips: "Get 7-8 hours of sleep" },
  { day: 19, phase: "Detox Reset", meals: ["Detox tea", "Vegetable medley", "Poached salmon with herbs"], tips: "Reduce sugar and artificial sweeteners" },
  { day: 20, phase: "Fiber Focus", meals: ["Flaxseed cereal with milk", "Minestrone soup", "Baked cod with brown rice"], tips: "Stay active with 30-minute walks" },
  { day: 21, phase: "Protein Power", meals: ["Protein smoothie", "Lean beef burrito bowl", "Grilled chicken thighs with roasted vegetables"], tips: "Three weeks done - great work!" },
  { day: 22, phase: "Detox Reset", meals: ["Green detox juice", "Raw vegetable bowl", "White fish with steamed zucchini"], tips: "Limit caffeine intake" },
  { day: 23, phase: "Fiber Focus", meals: ["Wheat bread with berries", "Black bean chili", "Salmon with barley"], tips: "Include nuts and seeds" },
  { day: 24, phase: "Protein Power", meals: ["Protein-packed omelet", "Turkey meatballs with sweet potato", "Grilled lean beef with roasted root vegetables"], tips: "Strength training 3x this week" },
  { day: 25, phase: "Detox Reset", meals: ["Ginger green smoothie", "Detox salad", "Steamed fish with vegetables"], tips: "Eat mindfully and slowly" },
  { day: 26, phase: "Fiber Focus", meals: ["Bran muffins", "Lentil pasta with vegetables", "Baked salmon with quinoa"], tips: "Reduce portion sizes slightly" },
  { day: 27, phase: "Protein Power", meals: ["Scrambled eggs with spinach", "Grilled chicken breast salad", "Lean ground turkey with roasted vegetables"], tips: "Prepare meals in advance" },
  { day: 28, phase: "Detox Reset", meals: ["Detox smoothie bowl", "Vegetable broth", "White fish with steamed broccoli"], tips: "One more week to go!" },
  { day: 29, phase: "Fiber Focus", meals: ["Oatmeal with nuts and berries", "Chickpea and vegetable curry", "Salmon with brown rice"], tips: "Reflect on your improvements" },
  { day: 30, phase: "Protein Power", meals: ["Final protein smoothie", "Celebratory lean beef dinner", "Your choice - you've earned it!"], tips: "Congratulations! You did it!" },
];

export default function Home() {
  const [expandedDay, setExpandedDay] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            30-Day Restoration Diet Plan
          </h1>
          <p className="text-lg text-gray-600">
            Click any day to see meals and tips
          </p>
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {dietPlanData.map((plan) => (
            <div
              key={plan.day}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() =>
                setExpandedDay(expandedDay === plan.day ? null : plan.day)
              }
            >
              {/* Day Header */}
              <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-semibold opacity-90">
                      Day {plan.day}
                    </div>
                    <div className="text-lg font-bold">{plan.phase}</div>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`transition-transform ${
                      expandedDay === plan.day ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Expanded Content */}
              {expandedDay === plan.day && (
                <div className="p-4 border-t border-gray-200 bg-gray-50">
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">
                      Meals
                    </h4>
                    <ul className="space-y-2">
                      {plan.meals.map((meal, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-green-500 font-bold">•</span>
                          <span>{meal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 bg-blue-50 rounded border border-blue-200">
                    <p className="text-sm text-gray-800">
                      <strong>Tip:</strong> {plan.tips}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Program Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">30</div>
              <p className="text-sm text-gray-600">Days</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">90</div>
              <p className="text-sm text-gray-600">Meals</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">3</div>
              <p className="text-sm text-gray-600">Phases</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">∞</div>
              <p className="text-sm text-gray-600">Health</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
