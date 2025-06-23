import { useState, useRef, useCallback } from 'react';

interface VisualizationData {
  input: string;
  currentStep: number;
  stack: string[];
  isValid: boolean | null;
}

type VisualizationState = 'idle' | 'running' | 'finished';

/**
 * Custom hook for managing stack visualization state and animation
 */
export function useVisualization() {
  const [visualizationState, setVisualizationState] =
    useState<VisualizationState>('idle');
  const [visualizationData, setVisualizationData] = useState<VisualizationData>(
    {
      input: '()[]{}',
      currentStep: 0,
      stack: [],
      isValid: null,
    }
  );
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const runVisualization = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }

    setVisualizationState('running');
    const input = '()[]{}';
    setVisualizationData({
      input,
      currentStep: 0,
      stack: [],
      isValid: null,
    });

    const stack: string[] = [];
    const bracketMap: { [key: string]: string } = {
      ')': '(',
      '}': '{',
      ']': '[',
    };

    let step = 0;
    let isValid = true;

    const animate = () => {
      if (step >= input.length) {
        setVisualizationData((prev) => ({
          ...prev,
          isValid: stack.length === 0,
        }));
        setVisualizationState('finished');
        animationTimeoutRef.current = null;
        return;
      }

      const char = input[step];

      if ('({['.includes(char)) {
        stack.push(char);
      } else if (')}]'.includes(char)) {
        if (stack.length === 0 || stack.pop() !== bracketMap[char]) {
          isValid = false;
        }
      }

      setVisualizationData({
        input,
        currentStep: step,
        stack: [...stack],
        isValid:
          step === input.length - 1 ? stack.length === 0 && isValid : null,
      });

      step++;
      animationTimeoutRef.current = setTimeout(animate, 1000);
    };

    animate();
  }, []);

  // Cleanup animation on unmount
  const cleanup = useCallback(() => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  }, []);

  return {
    visualizationState,
    visualizationData,
    runVisualization,
    cleanup,
  };
}
