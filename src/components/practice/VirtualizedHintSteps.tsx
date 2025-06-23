'use client';

import React from 'react';

interface VirtualizedHintStepsProps {
  steps: string[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

/**
 * VirtualizedHintSteps Component
 *
 * Displays algorithm steps with virtualization for performance.
 * Shows only visible steps around the current step to handle large lists efficiently.
 */
export function VirtualizedHintSteps({
  steps,
  currentStep,
  onStepChange,
}: VirtualizedHintStepsProps) {
  const visibleSteps = steps.slice(
    Math.max(0, currentStep - 1),
    currentStep + 2
  );
  const startIndex = Math.max(0, currentStep - 1);

  return (
    <div className="space-y-2">
      {visibleSteps.map((step, index) => {
        const actualIndex = startIndex + index;
        const isActive = actualIndex === currentStep;

        return (
          <div
            key={actualIndex}
            className={`p-3 rounded-lg cursor-pointer transition-colors ${
              isActive
                ? 'bg-blue-100 border border-blue-300'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => onStepChange(actualIndex)}
          >
            <div className="flex items-center space-x-2">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {actualIndex + 1}
              </span>
              <span className={isActive ? 'font-medium' : ''}>{step}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
