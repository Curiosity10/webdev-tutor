'use client';

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { LessonStep, LessonProgress } from '@/types/lesson';
import { getLessonConfig } from '@/config/lessons';

interface ProgressContextType {
  completedSubthemes: string[];
  markComplete: (subtheme: string) => void;
  isComplete: (subtheme: string) => boolean;
  // Lesson progress methods
  getLessonProgress: (subthemeId: string) => LessonProgress | null;
  getLessonSteps: (subthemeId: string, currentStepId: string) => LessonStep[];
  markStepComplete: (subthemeId: string, stepId: string) => void;
  isStepComplete: (subthemeId: string, stepId: string) => boolean;
  canAccessStep: (subthemeId: string, stepId: string) => boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

const PROGRESS_STORAGE_KEY = 'WebDevTutor-progress';

interface StoredProgress {
  completedSubthemes: string[];
  lessonProgress: Record<string, LessonProgress>;
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [completedSubthemes, setCompletedSubthemes] = useState<string[]>([]);
  const [lessonProgress, setLessonProgress] = useState<
    Record<string, LessonProgress>
  >({});

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        try {
          const parsed: StoredProgress = JSON.parse(stored);
          setCompletedSubthemes(parsed.completedSubthemes || []);
          setLessonProgress(parsed.lessonProgress || {});
        } catch (error) {
          console.error('Failed to parse progress from localStorage:', error);
        }
      }
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        PROGRESS_STORAGE_KEY,
        JSON.stringify({
          completedSubthemes,
          lessonProgress,
        })
      );
    }
  }, [completedSubthemes, lessonProgress]);

  const markComplete = (subtheme: string) => {
    setCompletedSubthemes((prev) => {
      if (!prev.includes(subtheme)) {
        return [...prev, subtheme];
      }
      return prev;
    });
  };

  const isComplete = (subtheme: string) => {
    return completedSubthemes.includes(subtheme);
  };

  // Lesson progress methods
  const getLessonProgress = (subthemeId: string): LessonProgress | null => {
    return lessonProgress[subthemeId] || null;
  };

  const getLessonSteps = (
    subthemeId: string,
    currentStepId: string
  ): LessonStep[] => {
    const config = getLessonConfig(subthemeId);
    if (!config) return [];

    const progress = getLessonProgress(subthemeId);
    const completedSteps = progress?.completedSteps || [];

    return config.steps.map((step) => {
      const isCompleted = completedSteps.includes(step.id);
      const isCurrent = step.id === currentStepId;

      // All steps are accessible - no restrictions based on completion
      const isAccessible = true;

      return {
        ...step,
        isCompleted,
        isCurrent,
        isAccessible,
      };
    });
  };

  const markStepComplete = (subthemeId: string, stepId: string) => {
    setLessonProgress((prev) => {
      const currentProgress = prev[subthemeId] || {
        subthemeId,
        currentStepId: stepId,
        completedSteps: [],
        totalSteps: getLessonConfig(subthemeId)?.steps.length || 0,
      };

      const updatedCompletedSteps = currentProgress.completedSteps.includes(
        stepId
      )
        ? currentProgress.completedSteps
        : [...currentProgress.completedSteps, stepId];

      return {
        ...prev,
        [subthemeId]: {
          ...currentProgress,
          completedSteps: updatedCompletedSteps,
        },
      };
    });
  };

  const isStepComplete = (subthemeId: string, stepId: string): boolean => {
    const progress = getLessonProgress(subthemeId);
    return progress?.completedSteps.includes(stepId) || false;
  };

  const canAccessStep = (subthemeId: string, stepId: string): boolean => {
    const steps = getLessonSteps(subthemeId, stepId);
    const step = steps.find((s) => s.id === stepId);
    return step?.isAccessible || false;
  };

  return (
    <ProgressContext.Provider
      value={{
        completedSubthemes,
        markComplete,
        isComplete,
        getLessonProgress,
        getLessonSteps,
        markStepComplete,
        isStepComplete,
        canAccessStep,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
