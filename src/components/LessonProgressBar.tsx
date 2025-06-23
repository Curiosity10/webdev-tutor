'use client';

import React from 'react';
import { LessonStep } from '@/types/lesson';
import { LessonStep as LessonStepComponent } from './LessonStep';
import { LessonNavigation } from './LessonNavigation';
import { calculateProgressPercentage } from '@/utils/progressUtils';
import { cn } from '@/lib/utils';

interface LessonProgressBarProps {
  steps: LessonStep[];
  onStepClick: (stepId: string) => void;
  onNavigate: (stepId: string) => void;
  className?: string;
  showNavigation?: boolean;
}

export function LessonProgressBar({
  steps,
  onStepClick,
  onNavigate,
  className,
  showNavigation = true,
}: LessonProgressBarProps) {
  const progressPercentage = calculateProgressPercentage(steps);
  const currentStepIndex = steps.findIndex((step) => step.isCurrent);
  const completedSteps = steps.filter((step) => step.isCompleted).length;

  // Calculate the width of the progress line. Assumes equal spacing.
  // 0 steps complete = 0%, 1 step = 50%, 2 steps = 100% for a 3-step lesson.
  const progressLineWidth =
    steps.length > 1 ? (completedSteps / (steps.length - 1)) * 100 : 0;

  return (
    <div
      className={cn(
        'w-full bg-card border rounded-lg p-4 sm:p-6 space-y-4',
        className
      )}
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{progressPercentage}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
            aria-label={`${progressPercentage}% complete`}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="relative pt-8">
        {/* Connector Lines */}
        <div className="absolute top-4 left-0 w-full h-0.5 bg-muted" />
        <div
          className="absolute top-4 left-0 h-0.5 bg-green-500 transition-all duration-300"
          style={{ width: `${progressLineWidth}%` }}
        />

        {/* Step Components */}
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <LessonStepComponent
              key={step.id}
              step={step}
              onClick={() => onStepClick(step.id)}
            />
          ))}
        </div>
      </div>

      {/* Navigation and Current Step Info */}
      <div className="text-center pt-2">
        <p className="text-sm font-semibold text-foreground mb-1">
          {`Step ${currentStepIndex + 1} of ${steps.length}`}
        </p>
        <p className="text-sm text-muted-foreground min-h-[20px]">
          {steps[currentStepIndex]?.description}
        </p>
      </div>

      {showNavigation && (
        <LessonNavigation steps={steps} onNavigate={onNavigate} />
      )}
    </div>
  );
}
