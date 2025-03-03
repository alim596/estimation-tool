"use client";
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import PlatformsSection from "@/components/PlatformSection";
import AppConfigurator from "@/components/AppConfig";
import EstimationPanel from "@/components/EstimationPanel";

import { FRIENDLY_TITLES } from "@/utils/friendlyTitles"; 
import { Section } from "@/types/types";
//import jsonData from "@/utils/sections-data.json";

//API
import { fetchQuestions } from '@/utils/api';


// Step => list of selected strings
type AnswersState = Record<number, string[]>;

export default function Home() {
    const [sections, setSections] = useState<Section[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const correctPassword = "mypassword"; // Set your password here
  // 1. Track the platforms the user has chosen
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  // 2. Track which question step is currently open
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // 3. Track all question answers by step number => array of strings
  const [answers, setAnswers] = useState<AnswersState>({});
  
  useEffect(() => {
    fetchQuestions().then((data: Section[]) => setSections(data));
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      const enteredPassword = prompt("Enter password to access:");
      if (enteredPassword === correctPassword) {
        setIsAuthenticated(true);
      } else {
        alert("Incorrect password. Access denied.");
        window.location.href = "https://google.com"; // Redirect if wrong password
      }
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return null; // Prevents rendering until authenticated
  }

  // When a user toggles a platform
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) => {
      const isSelected = prev.includes(platform);
      let newSelection: string[];

      if (isSelected) {
        // Removing a platform
        newSelection = prev.filter((p) => p !== platform);

        // If user has removed their last platform, reset everything
        if (newSelection.length === 0) {
          setActiveStep(null);
        }
      } else {
        // Adding a platform
        newSelection = [...prev, platform];

        // If user had no platforms before, open Q1 automatically
        if (prev.length === 0) {
          setActiveStep(1);
        }
      }
      return newSelection;
    });
  };

  // Convert step-based answers into category-based answers
  const categoryAnswers = computeCategoryAnswers(sections, answers);

  return (
    <div className="max-h-auto p-4">
      <div className="flex flex-col items-center max-w-[1440px] mx-auto shadow-custom bg-white">
        <div  className="h-[910px]">
          <HeroSection />
        </div>
        <div className="bg-[#F8F9FC]">
          {/* Platforms selection */}
          <div className="mt-16 px-16">
            <PlatformsSection
              selectedPlatforms={selectedPlatforms}
              onTogglePlatform={togglePlatform}
            />
          </div>
        </div>

        {/* Two-column layout: left is configurator, right is estimate panel */}
        <div className="flex justify-between mt-8 gap-6">
          <div className="ml-16">
            <AppConfigurator
              sections={sections}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              answers={answers}
              setAnswers={setAnswers}
            />
          </div>

          <div className="pb-2">
            <EstimationPanel
              selectedPlatforms={selectedPlatforms}
              categoryAnswers={categoryAnswers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Utility to gather user answers by category.
 * 
 * @param sections - The array of Section objects from JSON
 * @param answers - The record of step => user-selected strings
 * @returns A record of category => combined array of selected items
 */
function computeCategoryAnswers(
  sections: Section[],
  answers: Record<number, string[]>
): Record<string, string[]> {
  const result: Record<string, string[]> = {};

  sections.forEach((section) => {
    section.questions.forEach((q) => {
      const cat = q.category;
      const chosenForStep = answers[q.step] || [];

      // Convert to friendly labels
      const friendlyAnswers = chosenForStep.map(
        (raw) => FRIENDLY_TITLES[raw] ?? raw
      );

      if (!result[cat]) {
        result[cat] = [];
      }
      result[cat] = [...result[cat], ...friendlyAnswers];
    });
  });

  return result;
}
