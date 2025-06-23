'use client';

import { useState, useEffect } from 'react';

interface StackVisualizationProps {
  input: string;
  currentStep: number;
  stack: string[];
  isValid: boolean | null;
  stepDescription?: string;
}

// Bracket pair definitions for hash map visualization
const BRACKET_PAIRS: Record<string, string> = {
  '(': ')',
  '[': ']',
  '{': '}',
};

const OPENING_BRACKETS = Object.keys(BRACKET_PAIRS);
const CLOSING_BRACKETS = Object.values(BRACKET_PAIRS);

/**
 * Enhanced StackVisualization Component
 *
 * Renders a React-based visualization of bracket matching algorithm
 * with hash map visualization and step-by-step clarity.
 */
export function StackVisualization({
  input,
  currentStep,
  stack,
  isValid,
  stepDescription = '',
}: StackVisualizationProps) {
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation when stack changes
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [stack]);

  const getBracketColor = (bracket: string) => {
    if (OPENING_BRACKETS.includes(bracket)) return 'bg-blue-500';
    if (CLOSING_BRACKETS.includes(bracket)) return 'bg-green-500';
    return 'bg-gray-500';
  };

  const getBracketPair = (bracket: string) => {
    if (OPENING_BRACKETS.includes(bracket)) return BRACKET_PAIRS[bracket];
    if (CLOSING_BRACKETS.includes(bracket)) {
      return Object.keys(BRACKET_PAIRS).find(
        (key) => BRACKET_PAIRS[key] === bracket
      );
    }
    return null;
  };

  const getCurrentOperation = () => {
    if (currentStep >= input.length) return 'Algorithm complete';

    const currentChar = input[currentStep];
    if (OPENING_BRACKETS.includes(currentChar)) {
      return `Push '${currentChar}' to stack`;
    } else if (CLOSING_BRACKETS.includes(currentChar)) {
      const expected = getBracketPair(currentChar);
      return `Check if '${currentChar}' matches top of stack (expecting '${expected}')`;
    }
    return `Process character '${currentChar}'`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Bracket Matching Algorithm Visualization
        </h3>
        <div className="text-sm text-gray-600">
          Step {currentStep + 1} of {input.length + 1}
        </div>
      </div>

      {/* Hash Map Visualization */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">
          Bracket Pairs (Hash Map)
        </h4>
        <div className="grid grid-cols-3 gap-4">
          {Object.entries(BRACKET_PAIRS).map(([open, close]) => (
            <div
              key={open}
              className="flex items-center justify-center space-x-2 p-3 bg-gray-50 rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold ${getBracketColor(open)}`}
              >
                {open}
              </div>
              <span className="text-gray-500">→</span>
              <div
                className={`w-8 h-8 rounded flex items-center justify-center text-white font-bold ${getBracketColor(close)}`}
              >
                {close}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input String */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">Input String</h4>
        <div className="flex justify-center space-x-1">
          {input.split('').map((char, index) => (
            <div
              key={index}
              className={`
                w-10 h-10 rounded-lg border-2 flex items-center justify-center font-bold text-lg transition-all duration-200
                ${
                  index === currentStep
                    ? 'border-orange-500 bg-orange-100 text-orange-700'
                    : 'border-gray-300 bg-gray-50 text-gray-700'
                }
                ${OPENING_BRACKETS.includes(char) ? 'border-blue-300 bg-blue-50' : ''}
                ${CLOSING_BRACKETS.includes(char) ? 'border-green-300 bg-green-50' : ''}
              `}
            >
              {char}
            </div>
          ))}
        </div>
      </div>

      {/* Current Operation */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h4 className="text-md font-medium text-blue-800 mb-2">
          Current Operation
        </h4>
        <p className="text-blue-700">{getCurrentOperation()}</p>
        {stepDescription && (
          <p className="text-blue-600 text-sm mt-2">{stepDescription}</p>
        )}
      </div>

      {/* Stack Visualization */}
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-3">
          Stack (LIFO - Last In, First Out)
        </h4>
        <div className="relative">
          {/* Stack container */}
          <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[200px] bg-gray-50">
            {stack.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">
                Stack is empty
              </div>
            ) : (
              <div className="space-y-2">
                {stack
                  .slice()
                  .reverse()
                  .map((item, index) => (
                    <div
                      key={`${item}-${index}-${animationKey}`}
                      className={`
                      w-16 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg
                      ${getBracketColor(item)}
                      transition-all duration-300 ease-out
                      ${index === 0 ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''}
                    `}
                      style={{
                        animation: index === 0 ? 'pulse 2s infinite' : 'none',
                      }}
                    >
                      {item}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Stack operations legend */}
          <div className="mt-3 flex justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Opening brackets (push)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Closing brackets (pop & match)</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <span>Top of stack</span>
            </div>
          </div>
        </div>
      </div>

      {/* Algorithm Status */}
      {isValid !== null && (
        <div
          className={`
          p-4 rounded-lg border-2 text-center font-semibold text-lg
          ${
            isValid
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }
        `}
        >
          {isValid
            ? '✅ Valid Bracket Sequence!'
            : '❌ Invalid Bracket Sequence!'}
        </div>
      )}

      {/* Algorithm Explanation */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-md font-medium text-gray-700 mb-2">
          Algorithm Steps
        </h4>
        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
          <li>For each character in the input string:</li>
          <li className="ml-4">If it's an opening bracket → Push to stack</li>
          <li className="ml-4">
            If it's a closing bracket → Pop from stack and check if they match
          </li>
          <li>At the end, stack should be empty for valid sequence</li>
        </ol>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
      `}</style>
    </div>
  );
}
