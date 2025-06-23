import { LessonStep } from '@/types/lesson';

export function calculateProgressPercentage(steps: LessonStep[]): number {
  if (steps.length === 0) return 0;

  const completedSteps = steps.filter((step) => step.isCompleted).length;
  return Math.round((completedSteps / steps.length) * 100);
}

export function getCurrentStepIndex(steps: LessonStep[]): number {
  return steps.findIndex((step) => step.isCurrent);
}

export function getNextStep(steps: LessonStep[]): LessonStep | null {
  const currentIndex = getCurrentStepIndex(steps);
  if (currentIndex === -1 || currentIndex === steps.length - 1) {
    return null;
  }
  return steps[currentIndex + 1];
}

export function getPreviousStep(steps: LessonStep[]): LessonStep | null {
  const currentIndex = getCurrentStepIndex(steps);
  if (currentIndex <= 0) {
    return null;
  }
  return steps[currentIndex - 1];
}

export function canNavigateToStep(
  steps: LessonStep[],
  targetStepId: string
): boolean {
  const targetStep = steps.find((step) => step.id === targetStepId);
  return targetStep?.isAccessible || false;
}

export function getStepById(
  steps: LessonStep[],
  stepId: string
): LessonStep | null {
  return steps.find((step) => step.id === stepId) || null;
}

export function getCompletedStepsCount(steps: LessonStep[]): number {
  return steps.filter((step) => step.isCompleted).length;
}

export function getTotalStepsCount(steps: LessonStep[]): number {
  return steps.length;
}
