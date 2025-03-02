// AppConfigurator.tsx

import { Dispatch, SetStateAction, useState } from "react";
import Category from "./Category";
import QuestionBox from "./QuestionBox";
import HorizontalChoice from "./ChoiceHorizontal";
import ChoiceVertical from "./ChoiceVertical";
import { Section } from "@/types/types";

// step => array of selected items
type AnswersState = Record<number, string[]>;

interface AppConfiguratorProps {
  sections: Section[];
  activeStep: number | null;
  setActiveStep: Dispatch<SetStateAction<number | null>>;
  answers: AnswersState;
  setAnswers: Dispatch<SetStateAction<AnswersState>>;
}

export default function AppConfigurator({
  sections,
  activeStep,
  setActiveStep,
  answers,
  setAnswers,
}: AppConfiguratorProps) {
  const [openCategoryIndices, setOpenCategoryIndices] = useState<number[]>([]);

  // Toggle an individual question step.
  const toggleStep = (stepNumber: number) => {
    setActiveStep((prevActiveStep) => {

      console.log("Toggling step. Previous active step:", prevActiveStep, "New step:", stepNumber);
  
      if (prevActiveStep === stepNumber) {
        console.log("Step is already active; closing it.");
        return null;
      }
      console.log("Opening new step.");
      return stepNumber;
    });
  }

  // Toggle a category open or closed.
  const toggleCategory = (catIndex: number) => {
    const isOpen = openCategoryIndices.includes(catIndex);
  
    if (isOpen) {
      // Get all steps in this category.
      const categorySteps = sections[catIndex].questions.map((q) => q.step);
      if (activeStep !== null && categorySteps.includes(activeStep)) {
        setActiveStep(null);
      }
      setOpenCategoryIndices((prev) => prev.filter((idx) => idx !== catIndex));
    } else {
      setOpenCategoryIndices((prev) => [...prev, catIndex]);
    }
  };
  
  /**
   * Updates user selections for the given step and, if horizontal,
   * automatically navigates to the next question.
   */
  const handleSelectOption = (
    step: number,
    isHorizontal: boolean,
    optionTitle: string
  ) => {
    setAnswers((prev) => {
      const existing = prev[step] || [];

      if (isHorizontal) {
        // For horizontal questions, we store just one item
        return { ...prev, [step]: [optionTitle] };
      } else {
        // Vertical => toggle the clicked item
        if (existing.includes(optionTitle)) {
          return { ...prev, [step]: existing.filter((x) => x !== optionTitle) };
        } else {
          return { ...prev, [step]: [...existing, optionTitle] };
        }
      }
    });

    // If horizontal => immediately auto-move to the next question
    if (isHorizontal) {
      moveToNextQuestion(step);
    }
  };

  /**
   * Finds the next step (step+1) and, if it exists in the data, opens it.
   */
  const moveToNextQuestion = (currentStep: number) => {
    const nextStep = currentStep + 1;

    // Check if there's a question with step = nextStep
    let questionExists = false;
    for (const section of sections) {
      if (section.questions.some((q) => q.step === nextStep)) {
        questionExists = true;
        break;
      }
    }

    if (questionExists) {
      setActiveStep(nextStep);
    } else {
      // No more questions
      setActiveStep(null);
    }
  };

  return (
    <div className="space-y-6">
      {sections.map((section, secIndex) => {
        // Whether user manually opened or the active question is in this category
        const userOpened = openCategoryIndices.includes(secIndex);
        const hasOpenQuestion = section.questions.some(
          (q) => q.step === activeStep
        );
        const isCategoryOpen = userOpened || hasOpenQuestion;

        return (
          <div key={secIndex} className="mb-6">
            <Category
              title={section.title}
              isOpen={isCategoryOpen}
              onToggle={() => toggleCategory(secIndex)}
            >
              {section.questions.map((q) => {
                const isHorizontal = q.ChildrenType === "ChoiceHorizontal";
                const selectedItems = answers[q.step] || [];

                return (
                  <div key={q.step} className="mb-4">
                    <QuestionBox
                      step={q.step}
                      question={q.question}
                      isActive={activeStep === q.step}
                      onToggle={() => toggleStep(q.step)}
                    >
                      <div
                        className={
                          isHorizontal
                            ? "flex flex-row gap-4"
                            : "flex flex-col gap-3"
                        }
                      >
                        {q.children.map((childItem, childIndex) => {
                          const selected = selectedItems.includes(
                            childItem.title
                          );

                          if (isHorizontal) {
                            return (
                              <HorizontalChoice
                                key={childIndex}
                                title={childItem.title}
                                description={childItem.description}
                                iconSrc={childItem.iconSrc}
                                selected={selected}
                                onSelect={() =>
                                  handleSelectOption(
                                    q.step,
                                    true,
                                    childItem.title
                                  )
                                }
                              />
                            );
                          } else {
                            // Vertical
                            return (
                              <ChoiceVertical
                                key={childIndex}
                                title={childItem.title}
                                description={childItem.description}
                                iconSrc={childItem.iconSrc}
                                selected={selected}
                                onSelect={() =>
                                  handleSelectOption(
                                    q.step,
                                    false,
                                    childItem.title
                                  )
                                }
                              />
                            );
                          }
                        })}
                      </div>
                    </QuestionBox>
                  </div>
                );
              })}
            </Category>
          </div>
        );
      })}
    </div>
  );
}
