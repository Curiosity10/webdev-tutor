import { useState } from 'react';
import {
  getValidParenthesesTestCases,
  runTestCases,
  formatTestResults,
} from '@/utils/problemTestCases';

/**
 * Custom hook for managing code execution and test results
 */
export function useCodeExecution() {
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = (code: string) => {
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

      // Execute the user's code
      const userFunction = new Function('s', code) as (s: string) => boolean;

      // Get test cases and run them
      const testCases = getValidParenthesesTestCases();
      const results = runTestCases(userFunction, testCases);
      const formattedResults = formatTestResults(results);

      // Combine console output with test results
      testOutput += formattedResults;

      // Restore console.log
      console.log = originalLog;

      setOutput(testOutput);
    } catch (error) {
      setOutput(
        `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsRunning(false);
    }
  };

  return {
    output,
    isRunning,
    runCode,
  };
}
