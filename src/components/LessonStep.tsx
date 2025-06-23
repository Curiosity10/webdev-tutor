'use client';

import { LessonStep as LessonStepType } from '@/types/lesson';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface LessonStepProps {
  step: LessonStepType;
  onClick?: () => void;
}

export function LessonStep({ step, onClick }: LessonStepProps) {
  const isClickable = step.isAccessible && onClick;

  const getStepIcon = () => {
    if (step.isCompleted) {
      return <Check className="w-4 h-4 text-white" />;
    }
    const stepNumber =
      step.id === 'theory' ? 1 : step.id === 'pseudocode' ? 2 : 3;
    if (step.isCurrent) {
      return (
        <span className="text-sm font-bold text-primary-foreground">
          {stepNumber}
        </span>
      );
    }
    // For accessible/inaccessible, the text color is handled by the parent style.
    return <span className="text-sm font-medium">{stepNumber}</span>;
  };

  const getStepStyles = () => {
    if (step.isCompleted) {
      return 'bg-green-500 border-green-500 text-white';
    }
    if (step.isCurrent) {
      return 'bg-primary border-primary text-primary-foreground scale-110';
    }
    if (step.isAccessible) {
      // Hollow circle for accessible but not current steps
      return 'bg-card border-muted-foreground/30 text-muted-foreground';
    }
    // Dimmer hollow circle for inaccessible steps
    return 'bg-card border-muted-foreground/20 text-muted-foreground/50';
  };

  return (
    <div className="w-25 sm:w-50 flex flex-col items-center space-y-2 text-center overflow-visible">
      <button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        className={cn(
          'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
          getStepStyles(),
          isClickable
            ? 'cursor-pointer hover:border-primary'
            : 'cursor-not-allowed'
        )}
        aria-label={`${step.isCompleted ? 'Completed' : step.isCurrent ? 'Current' : 'Upcoming'} step: ${step.title}`}
        title={step.title}
      >
        {getStepIcon()}
      </button>

      <span
        className={cn(
          'text-xs font-medium px-2 sm:text-sm truncate w-full',
          step.isCompleted && 'text-green-600 dark:text-green-400',
          step.isCurrent && 'text-primary font-bold',
          !step.isCompleted && !step.isCurrent && 'text-muted-foreground'
        )}
      >
        {step.title}
      </span>
    </div>
  );
}
