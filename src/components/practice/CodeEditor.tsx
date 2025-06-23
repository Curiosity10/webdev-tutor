'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onRun: () => void;
  isRunning: boolean;
}

/**
 * CodeEditor Component
 *
 * Provides a code input area with syntax highlighting and run functionality.
 */
export function CodeEditor({
  code,
  onCodeChange,
  onRun,
  isRunning,
}: CodeEditorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Solution</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          placeholder="Your solution here"
          className="min-h-[400px] font-mono text-sm"
        />
        <Button onClick={onRun} disabled={isRunning} className="w-full">
          {isRunning ? 'Running Tests...' : 'Run Tests'}
        </Button>
      </CardContent>
    </Card>
  );
}
