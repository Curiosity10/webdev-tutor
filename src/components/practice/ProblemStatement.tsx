'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProblemExample {
  input: string;
  output: string;
}

interface ProblemStatementProps {
  title: string;
  description: string;
  rules: string[];
  examples: ProblemExample[];
}

/**
 * ProblemStatement Component
 *
 * Displays the problem description, rules, and examples in a structured format.
 */
export function ProblemStatement({
  title,
  description,
  rules,
  examples,
}: ProblemStatementProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{description}</p>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">An input string is valid if:</h4>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            {rules.map((rule, index) => (
              <li key={index}>{rule}</li>
            ))}
          </ul>
        </div>

        <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
            Examples:
          </h4>
          <div className="space-y-1 text-sm text-green-700 dark:text-green-300">
            {examples.map((example, index) => (
              <div key={index}>
                <code>isValid(&quot;{example.input}&quot;)</code> →{' '}
                <code>{example.output}</code>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
