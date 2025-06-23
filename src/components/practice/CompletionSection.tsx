'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/contexts/ProgressContext';

interface CompletionSectionProps {
  subthemeId: string;
}

/**
 * CompletionSection Component
 *
 * Handles the completion status and provides navigation after completion.
 */
export function CompletionSection({ subthemeId }: CompletionSectionProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const { markComplete } = useProgress();

  const handleMarkComplete = () => {
    markComplete(subthemeId);
    setIsCompleted(true);
  };

  if (isCompleted) {
    return (
      <div className="mt-8 text-center">
        <div className="bg-green-50 dark:bg-green-950/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
              Congratulations!
            </h3>
          </div>
          <p className="text-green-700 dark:text-green-300 mb-4">
            You&apos;ve completed the {subthemeId} learning path! Your progress
            has been saved.
          </p>
          <Link href="/themes/fundamental-data-structures">
            <Button variant="outline">Return to Theme</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 text-center">
      <Button
        onClick={handleMarkComplete}
        size="lg"
        className="bg-green-600 hover:bg-green-700"
      >
        Mark as Complete & View Achievement
      </Button>
    </div>
  );
}
