'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Import new components
import { StackVisualization } from '@/components/practice/StackVisualization';
import { AccordionHint } from '@/components/practice/AccordionHint';
import { VirtualizedHintSteps } from '@/components/practice/VirtualizedHintSteps';
import { ProblemStatement } from '@/components/practice/ProblemStatement';
import { CodeEditor } from '@/components/practice/CodeEditor';
import { TestResults } from '@/components/practice/TestResults';
import { CompletionSection } from '@/components/practice/CompletionSection';
import { LessonProgressBarWrapper } from '@/components/LessonProgressBarWrapper';

// Import custom hooks
import { useCodeExecution } from '@/hooks/useCodeExecution';
import { useVisualization } from '@/hooks/useVisualization';

interface PracticeProblemsClientProps {
  subthemeId: string;
}

export function PracticeProblemsClient({
  subthemeId,
}: PracticeProblemsClientProps) {
  const [code, setCode] = useState('');
  const [hintStep, setHintStep] = useState(0);
  const [openHints, setOpenHints] = useState<{ [key: string]: boolean }>({});

  // Use custom hooks
  const { output, isRunning, runCode } = useCodeExecution();
  const { visualizationState, visualizationData, runVisualization, cleanup } =
    useVisualization();

  // Cleanup visualization on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Hint steps for the algorithm
  const hintSteps = [
    'Initialize an empty stack',
    'Create a mapping of closing brackets to opening brackets',
    'Iterate through each character in the string',
    "If it's an opening bracket, push it onto the stack",
    "If it's a closing bracket, check if it matches the top of the stack",
    'If it matches, pop the top element from the stack',
    "If it doesn't match, return false",
    'After iteration, check if the stack is empty',
    'Return true if stack is empty, false otherwise',
  ];

  // Problem data
  const problemData = {
    title: 'Problem Statement',
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    rules: [
      'Open brackets must be closed by the same type of brackets',
      'Open brackets must be closed in the correct order',
      'Every close bracket has a corresponding open bracket of the same type',
    ],
    examples: [
      { input: '()', output: 'true' },
      { input: '()[]{}', output: 'true' },
      { input: '(]', output: 'false' },
      { input: '([)]', output: 'false' },
      { input: '{[]}', output: 'true' },
    ],
  };

  const handleRunCode = () => {
    runCode(code);
  };

  const toggleHint = (hintKey: string) => {
    setOpenHints((prev) => ({
      ...prev,
      [hintKey]: !prev[hintKey],
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/learn/stacks/pseudo-challenge"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Pseudocode Challenge
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Practice Problem: Valid Parentheses
          </h1>
          <p className="text-lg text-muted-foreground">
            Use a stack to determine if a string of parentheses is valid.
          </p>
        </div>

        {/* Lesson Progress Bar */}
        <div className="mb-8">
          <LessonProgressBarWrapper
            subthemeId={subthemeId}
            currentStepId="practice"
          />
        </div>

        {/* Problem Description */}
        <ProblemStatement {...problemData} />

        {/* Accordion Hints */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Detailed Hints</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <AccordionHint
              title="🔍 Basic Approach"
              isOpen={openHints.basic || false}
              onToggle={() => toggleHint('basic')}
            >
              <p className="text-sm text-muted-foreground mb-3">
                The key insight is to use a stack to keep track of opening
                brackets. When you encounter a closing bracket, you need to
                check if it matches the most recent opening bracket.
              </p>
              <div className="bg-blue-50 p-3 rounded">
                <code className="text-sm">
                  Stack: [&apos;(&apos;, &apos;&#123;&apos;, &apos;[&apos;]
                  <br />
                  When you see &apos;)&apos;, check if top of stack is
                  &apos;(&apos;
                </code>
              </div>
            </AccordionHint>

            <AccordionHint
              title="💡 Implementation Tips"
              isOpen={openHints.implementation || false}
              onToggle={() => toggleHint('implementation')}
            >
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Here are some key implementation details:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use an array as your stack</li>
                  <li>
                    • Create a mapping object:{' '}
                    <code className="bg-muted px-1 rounded">
                      {'{'} &apos;)&apos;: &apos;(&apos;, &apos;&#125;&apos;:
                      &apos;&#123;&apos;, &apos;]&apos;: &apos;[&apos; {'}'}
                    </code>
                  </li>
                  <li>• Check if stack is empty before popping</li>
                  <li>• Return false if brackets don&apos;t match</li>
                </ul>
              </div>
            </AccordionHint>

            <AccordionHint
              title="🚨 Common Mistakes"
              isOpen={openHints.mistakes || false}
              onToggle={() => toggleHint('mistakes')}
            >
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Watch out for these common errors:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>
                    • Forgetting to check if stack is empty before popping
                  </li>
                  <li>
                    • Not handling the case where there are more closing
                    brackets than opening ones
                  </li>
                  <li>
                    • Returning true immediately when brackets match (need to
                    check stack is empty at the end)
                  </li>
                  <li>• Using the wrong bracket mapping</li>
                </ul>
              </div>
            </AccordionHint>

            <AccordionHint
              title="🪜 Algorithm Steps"
              isOpen={openHints.steps || false}
              onToggle={() => toggleHint('steps')}
            >
              <VirtualizedHintSteps
                steps={hintSteps}
                currentStep={hintStep}
                onStepChange={setHintStep}
              />
            </AccordionHint>

            <AccordionHint
              title="🎬 Visualization"
              isOpen={openHints.visualization || false}
              onToggle={() => toggleHint('visualization')}
            >
              {visualizationState === 'running' ||
              visualizationState === 'finished' ? (
                <>
                  <StackVisualization
                    input={visualizationData.input}
                    currentStep={visualizationData.currentStep}
                    stack={visualizationData.stack}
                    isValid={visualizationData.isValid}
                  />
                  <div className="flex items-center justify-center">
                    {visualizationState === 'running' && (
                      <Button disabled>Running...</Button>
                    )}
                    {visualizationState === 'finished' && (
                      <Button onClick={runVisualization}>
                        Replay Visualization
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
                  <Button onClick={runVisualization}>
                    Start Visualization
                  </Button>
                </div>
              )}
            </AccordionHint>
          </CardContent>
        </Card>

        {/* Code Editor and Test Results */}
        <div className="grid gap-6 lg:grid-cols-2 mb-8">
          <CodeEditor
            code={code}
            onCodeChange={setCode}
            onRun={handleRunCode}
            isRunning={isRunning}
          />
          <TestResults output={output} />
        </div>

        {/* Completion Section */}
        <CompletionSection subthemeId={subthemeId} />
      </div>
    </div>
  );
}
