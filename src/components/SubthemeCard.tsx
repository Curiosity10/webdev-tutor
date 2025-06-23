'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useProgress } from '@/contexts/ProgressContext';

interface SubthemeCardProps {
  title: string;
  href: string;
  subthemeId: string;
}

export function SubthemeCard({ title, href, subthemeId }: SubthemeCardProps) {
  const { isComplete } = useProgress();
  const completed = isComplete(subthemeId);

  return (
    <Link href={href} className="block">
      <Card
        className={`hover:shadow-lg transition-shadow duration-200 cursor-pointer ${
          completed ? 'border-green-500 bg-green-50 dark:bg-green-950/20' : ''
        }`}
      >
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{title}</CardTitle>
            {completed && (
              <div className="flex items-center space-x-1">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-green-600 font-medium">
                  Complete
                </span>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {completed ? 'Review completed content' : 'Start learning'}
            </span>
            <svg
              className="w-4 h-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
