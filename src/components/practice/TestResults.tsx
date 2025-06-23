'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TestResultsProps {
  output: string;
}

/**
 * TestResults Component
 *
 * Displays the output from code execution and test results.
 */
export function TestResults({ output }: TestResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-muted p-4 rounded-lg min-h-[400px] font-mono text-sm">
          {output ? (
            <pre className="whitespace-pre-wrap">{output}</pre>
          ) : (
            <p className="text-muted-foreground">
              Click &quot;Run Tests&quot; to see the results here...
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
