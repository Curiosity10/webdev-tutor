'use client';

import { Button } from '@/components/ui/button';
import { LessonStep } from '@/types/lesson';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNextStep, getPreviousStep } from '@/utils/progressUtils';

interface LessonNavigationProps {
  steps: LessonStep[];
  onNavigate: (stepId: string) => void;
  className?: string;
}

export function LessonNavigation({
  steps,
  onNavigate,
  className,
}: LessonNavigationProps) {
  const nextStep = getNextStep(steps);
  const previousStep = getPreviousStep(steps);

  const canGoNext = nextStep && nextStep.isAccessible;
  const canGoPrevious = previousStep && previousStep.isAccessible;

  return (
    <div className={`flex items-center justify-between ${className || ''}`}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => previousStep && onNavigate(previousStep.id)}
        disabled={!canGoPrevious}
        className="flex items-center space-x-1"
        aria-label="Go to previous step"
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => nextStep && onNavigate(nextStep.id)}
        disabled={!canGoNext}
        className="flex items-center space-x-1"
        aria-label="Go to next step"
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
