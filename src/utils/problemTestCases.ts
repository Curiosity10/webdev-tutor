/**
 * Test case interface for problem validation
 */
export interface TestCase {
  input: string;
  expected: boolean;
}

/**
 * Test result interface for code execution
 */
export interface TestResult {
  passed: boolean;
  input: string;
  result: boolean;
  expected: boolean;
  error?: string;
}

/**
 * Get test cases for the Valid Parentheses problem
 */
export function getValidParenthesesTestCases(): TestCase[] {
  return [
    { input: '()', expected: true },
    { input: '()[]{}', expected: true },
    { input: '(]', expected: false },
    { input: '([)]', expected: false },
    { input: '{[]}', expected: true },
    { input: '((', expected: false },
    { input: '))', expected: false },
    { input: '', expected: true },
  ];
}

/**
 * Run test cases against a user's solution function
 */
export function runTestCases(
  userFunction: (s: string) => boolean,
  testCases: TestCase[]
): TestResult[] {
  return testCases.map((testCase) => {
    try {
      const result = userFunction(testCase.input);
      return {
        passed: result === testCase.expected,
        input: testCase.input,
        result,
        expected: testCase.expected,
      };
    } catch (error) {
      return {
        passed: false,
        input: testCase.input,
        result: false,
        expected: testCase.expected,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  });
}

/**
 * Format test results into a readable string
 */
export function formatTestResults(results: TestResult[]): string {
  let output = '';
  let allTestsPassed = true;

  results.forEach((result, index) => {
    if (result.error) {
      output += `❌ Test ${index + 1}: Error - ${result.error}\n`;
      allTestsPassed = false;
    } else if (result.passed) {
      output += `✅ Test ${index + 1}: "${result.input}" → ${result.result}\n`;
    } else {
      output += `❌ Test ${index + 1}: "${result.input}" → ${result.result} (expected ${result.expected})\n`;
      allTestsPassed = false;
    }
  });

  if (allTestsPassed) {
    output += '\n🎉 All tests passed! Your solution is correct.\n';
  } else {
    output += '\n❌ Some tests failed. Please check your implementation.\n';
  }

  return output;
}
