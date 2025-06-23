'use client';

import { useProgress } from '@/contexts/ProgressContext';
import { useRouter } from 'next/navigation';
import { LessonProgressBar } from './LessonProgressBar';

interface LessonProgressBarWrapperProps {
  subthemeId: string;
  currentStepId: string;
}

export function LessonProgressBarWrapper({
  subthemeId,
  currentStepId,
}: LessonProgressBarWrapperProps) {
  const { getLessonSteps, canAccessStep } = useProgress();
  const router = useRouter();

  const steps = getLessonSteps(subthemeId, currentStepId);

  const handleStepClick = (stepId: string) => {
    if (canAccessStep(subthemeId, stepId)) {
      const step = steps.find((s) => s.id === stepId);
      if (step) {
        router.push(step.path);
      }
    }
  };

  const handleNavigate = (stepId: string) => {
    handleStepClick(stepId);
  };

  return (
    <LessonProgressBar
      steps={steps}
      onStepClick={handleStepClick}
      onNavigate={handleNavigate}
    />
  );
}
