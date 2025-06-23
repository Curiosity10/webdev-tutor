'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { LessonProgressBarWrapper } from '@/components/LessonProgressBarWrapper';

interface PseudocodeChallengeClientProps {
  subthemeId: string;
}

export function PseudocodeChallengeClient({
  subthemeId,
}: PseudocodeChallengeClientProps) {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    try {
      // Create a safe execution environment
      let testOutput = '';

      // Capture console.log output
      const originalLog = console.log;
      console.log = (...args) => {
        testOutput += args.join(' ') + '\n';
      };

      // Execute the user's code in a safe environment
      const wrappedCode = `
        (function() {
          ${code}
          
          // Test the PUSH function
          if (typeof PUSH === 'function') {
            console.log('Testing PUSH function...');
            const testStack1 = [];
            const result1 = PUSH(testStack1, 5);
            const result2 = PUSH(testStack1, 10);
            
            console.log('PUSH(5) returned:', result1);
            console.log('PUSH(10) returned:', result2);
            console.log('Final stack:', testStack1);
            
            // Check if the stack has the correct elements
            if (testStack1.length === 2 && testStack1[0] === 5 && testStack1[1] === 10) {
              console.log('✅ Test Passed! Your PUSH function works correctly.');
              console.log('Stack contents:', testStack1);
            } else {
              console.log('❌ Test Failed! Your PUSH function is not working correctly.');
              console.log('Expected: [5, 10], Got:', testStack1);
              
              // Provide helpful feedback
              if (testStack1.length === 0) {
                console.log('💡 Hint: Make sure you are adding elements to the stack array.');
              } else if (testStack1.length === 1) {
                console.log('💡 Hint: Make sure you are calling PUSH multiple times or the function is working correctly.');
              } else {
                console.log('💡 Hint: Check the order of elements in your stack.');
              }
            }
          } else {
            console.log('❌ Error: PUSH function not found. Make sure you defined a function named PUSH.');
          }
        })();
      `;

      // Execute the code
      eval(wrappedCode);

      // Restore console.log
      console.log = originalLog;

      setOutput(testOutput);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      setOutput(
        `❌ Error: ${errorMessage}\n\n💡 Common issues:\n- Check your syntax\n- Make sure PUSH is defined as a function\n- Ensure you're using the correct parameter names (stack, value)`
      );
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/learn/stacks"
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
            Back to Stacks Learning
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Pseudocode Challenge: Stack PUSH Operation
          </h1>
          <p className="text-lg text-muted-foreground">
            Implement the PUSH operation for a stack using JavaScript.
          </p>
        </div>

        {/* Lesson Progress Bar */}
        <div className="mb-8">
          <LessonProgressBarWrapper
            subthemeId={subthemeId}
            currentStepId="pseudocode"
          />
        </div>

        {/* Challenge Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Implement the <strong>PUSH</strong> operation for a stack. Your
              function should add an element to the top of the stack.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>
                  Function should be named{' '}
                  <code className="bg-muted px-1 rounded">PUSH</code>
                </li>
                <li>
                  It should take two parameters:{' '}
                  <code className="bg-muted px-1 rounded">stack</code> (array)
                  and <code className="bg-muted px-1 rounded">value</code>
                </li>
                <li>Add the value to the top of the stack</li>
                <li>
                  Use{' '}
                  <code className="bg-muted px-1 rounded">console.log()</code>{' '}
                  to output results
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Example:
              </h4>
              <pre className="text-sm text-blue-700 dark:text-blue-300">
                {`function PUSH(stack, value) {
  // Your code here
  // Add value to the top of stack
}

// Test case:
let myStack = [];
PUSH(myStack, 5);
PUSH(myStack, 10);
console.log(myStack); // Should output: [5, 10]`}
              </pre>
            </div>
          </CardContent>
        </Card>

        {/* IDE Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Code Input */}
          <Card>
            <CardHeader>
              <CardTitle>Your Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder={`function PUSH(stack, value) {
  // Add your implementation here
}`}
                className="min-h-[300px] font-mono text-sm"
              />
              <Button onClick={runCode} disabled={isRunning} className="w-full">
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </CardContent>
          </Card>

          {/* Console Output */}
          <Card>
            <CardHeader>
              <CardTitle>Console Output</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg min-h-[300px] font-mono text-sm">
                {output ? (
                  <pre className="whitespace-pre-wrap">{output}</pre>
                ) : (
                  <span className="text-muted-foreground">
                    Run your code to see the output here...
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Link href="/learn/stacks">
            <Button variant="outline">← Back to Learning</Button>
          </Link>
          <Link href="/learn/stacks/problems">
            <Button>Next: Practice Problems →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
