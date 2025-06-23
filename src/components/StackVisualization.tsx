'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StackElement {
  value: string;
  color: string;
}

const colors = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#EF4444', // red
  '#8B5CF6', // purple
  '#06B6D4', // cyan
  '#F97316', // orange
  '#EC4899', // pink
];

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 300;
const ELEMENT_WIDTH = 120;
const ELEMENT_HEIGHT = 40;
const ELEMENT_SPACING = 5;
const STACK_BOTTOM = CANVAS_HEIGHT - 50;
const MAX_VISIBLE_ELEMENTS = Math.floor(
  (CANVAS_HEIGHT - 100) / (ELEMENT_HEIGHT + ELEMENT_SPACING)
);

const StackVisualization: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stack, setStack] = useState<StackElement[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState('');
  const [peekIndex, setPeekIndex] = useState<number | null>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  // Calculate visible elements based on scroll
  const getVisibleElements = useCallback(() => {
    if (stack.length <= MAX_VISIBLE_ELEMENTS) {
      return stack;
    }
    const startIndex = Math.max(
      0,
      stack.length - MAX_VISIBLE_ELEMENTS - scrollOffset
    );
    const endIndex = Math.min(stack.length, startIndex + MAX_VISIBLE_ELEMENTS);
    return stack.slice(startIndex, endIndex);
  }, [stack, scrollOffset]);

  // Draw the stack visualization
  const drawStack = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw stack container
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.strokeRect(50, 50, ELEMENT_WIDTH, CANVAS_HEIGHT - 100);

    const visibleElements = getVisibleElements();

    visibleElements.forEach((element, index) => {
      const y = STACK_BOTTOM - index * (ELEMENT_HEIGHT + ELEMENT_SPACING);

      if (peekIndex === index + (stack.length - visibleElements.length)) {
        ctx.save();
        ctx.shadowColor = '#f59e42';
        ctx.shadowBlur = 20;
      }

      ctx.fillStyle = element.color;
      ctx.fillRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        element.value,
        55 + (ELEMENT_WIDTH - 10) / 2,
        y + ELEMENT_HEIGHT / 2
      );

      if (peekIndex === index + (stack.length - visibleElements.length)) {
        ctx.restore();
      }
    });

    // Draw labels with overlap prevention
    ctx.fillStyle = '#64748b';
    ctx.font = '12px Inter, sans-serif';
    ctx.textAlign = 'left';

    if (stack.length > 0) {
      const topY =
        STACK_BOTTOM -
        (visibleElements.length - 1) * (ELEMENT_HEIGHT + ELEMENT_SPACING) +
        ELEMENT_HEIGHT / 2;
      const bottomY = STACK_BOTTOM + ELEMENT_HEIGHT / 2;

      // Only draw TOP label if there's enough space
      if (topY > 60) {
        ctx.fillText('TOP', 180, topY);
      }

      // Only draw BOTTOM label if there's enough space and it doesn't overlap with TOP
      if (bottomY < CANVAS_HEIGHT - 20 && bottomY - topY > 20) {
        ctx.fillText('BOTTOM', 180, bottomY);
      }
    }

    // Draw scroll indicators if needed
    if (stack.length > MAX_VISIBLE_ELEMENTS) {
      ctx.fillStyle = '#64748b';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';

      if (scrollOffset > 0) {
        ctx.fillText('↑ More above', CANVAS_WIDTH / 2, 30);
      }
      if (scrollOffset < stack.length - MAX_VISIBLE_ELEMENTS) {
        ctx.fillText('↓ More below', CANVAS_WIDTH / 2, CANVAS_HEIGHT - 10);
      }
    }
  }, [stack, peekIndex, getVisibleElements, scrollOffset]);

  // Animate push operation
  const animatePush = useCallback(
    (newElement: StackElement) => {
      setIsAnimating(true);
      setMessage('Pushing element...');
      const tempStack = [...stack];
      tempStack.push(newElement);
      let progress = 0;
      const animate = () => {
        progress += 0.05;
        if (progress >= 1) {
          setStack(tempStack);
          setIsAnimating(false);
          setMessage(`Pushed "${newElement.value}" to the stack`);
          setTimeout(() => setMessage(''), 2000);
          return;
        }
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.strokeStyle = '#64748b';
        ctx.lineWidth = 2;
        ctx.strokeRect(50, 50, ELEMENT_WIDTH, CANVAS_HEIGHT - 100);
        stack.forEach((element, index) => {
          const y = STACK_BOTTOM - index * (ELEMENT_HEIGHT + ELEMENT_SPACING);
          ctx.fillStyle = element.color;
          ctx.fillRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1;
          ctx.strokeRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 14px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(
            element.value,
            55 + (ELEMENT_WIDTH - 10) / 2,
            y + ELEMENT_HEIGHT / 2
          );
        });
        const targetY =
          STACK_BOTTOM - stack.length * (ELEMENT_HEIGHT + ELEMENT_SPACING);
        const currentY = -50 + (targetY + 50) * progress;
        ctx.fillStyle = newElement.color;
        ctx.fillRect(55, currentY, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(55, currentY, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          newElement.value,
          55 + (ELEMENT_WIDTH - 10) / 2,
          currentY + ELEMENT_HEIGHT / 2
        );
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    },
    [stack]
  );

  // Animate pop operation
  const animatePop = useCallback(() => {
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    setIsAnimating(true);
    const poppedElement = stack[stack.length - 1];
    setMessage(`Popping "${poppedElement.value}"...`);
    let progress = 0;
    const animate = () => {
      progress += 0.05;
      if (progress >= 1) {
        setStack(stack.slice(0, -1));
        setIsAnimating(false);
        setMessage(`Popped "${poppedElement.value}" from the stack`);
        setTimeout(() => setMessage(''), 2000);
        return;
      }
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 2;
      ctx.strokeRect(50, 50, ELEMENT_WIDTH, CANVAS_HEIGHT - 100);
      stack.slice(0, -1).forEach((element, index) => {
        const y = STACK_BOTTOM - index * (ELEMENT_HEIGHT + ELEMENT_SPACING);
        ctx.fillStyle = element.color;
        ctx.fillRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 1;
        ctx.strokeRect(55, y, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
          element.value,
          55 + (ELEMENT_WIDTH - 10) / 2,
          y + ELEMENT_HEIGHT / 2
        );
      });
      const startY =
        STACK_BOTTOM - (stack.length - 1) * (ELEMENT_HEIGHT + ELEMENT_SPACING);
      const currentY = startY - 50 * progress;
      const alpha = 1 - progress;
      ctx.globalAlpha = alpha;
      ctx.fillStyle = poppedElement.color;
      ctx.fillRect(55, currentY, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      ctx.strokeRect(55, currentY, ELEMENT_WIDTH - 10, ELEMENT_HEIGHT);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        poppedElement.value,
        55 + (ELEMENT_WIDTH - 10) / 2,
        currentY + ELEMENT_HEIGHT / 2
      );
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [stack]);

  // Handle push operation
  const handlePush = () => {
    if (!inputValue.trim() || isAnimating) return;
    const newElement: StackElement = {
      value: inputValue.trim(),
      color: colors[stack.length % colors.length],
    };
    animatePush(newElement);
    setInputValue('');
    setPeekIndex(null);
  };

  // Handle pop operation
  const handlePop = () => {
    if (isAnimating) return;
    animatePop();
    setPeekIndex(null);
  };

  // Handle clear operation
  const handleClear = () => {
    if (isAnimating) return;
    setStack([]);
    setPeekIndex(null);
    setScrollOffset(0);
    setMessage('Stack cleared');
    setTimeout(() => setMessage(''), 2000);
  };

  // Handle peek operation
  const handlePeek = () => {
    if (isAnimating) return;
    if (stack.length === 0) {
      setMessage('Stack is empty!');
      setPeekIndex(null);
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    setPeekIndex(stack.length - 1);
    setMessage(`Peek: "${stack[stack.length - 1].value}"`);
    setTimeout(() => {
      setPeekIndex(null);
      setMessage('');
    }, 2000);
  };

  // Handle isEmpty operation
  const handleIsEmpty = () => {
    if (isAnimating) return;
    if (stack.length === 0) {
      setMessage('Stack is empty!');
    } else {
      setMessage('Stack is NOT empty.');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  // Handle size operation
  const handleSize = () => {
    if (isAnimating) return;
    setMessage(`Stack size: ${stack.length}`);
    setTimeout(() => setMessage(''), 2000);
  };

  // Handle scroll up
  const handleScrollUp = () => {
    if (scrollOffset > 0) {
      setScrollOffset(scrollOffset - 1);
    }
  };

  // Handle scroll down
  const handleScrollDown = () => {
    if (scrollOffset < stack.length - MAX_VISIBLE_ELEMENTS) {
      setScrollOffset(scrollOffset + 1);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePush();
    }
  };

  // Draw stack when it changes
  useEffect(() => {
    drawStack();
  }, [drawStack]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interactive Stack Visualization</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Canvas */}
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-border rounded-lg bg-background"
          />
        </div>

        {/* Scroll Controls */}
        {stack.length > MAX_VISIBLE_ELEMENTS && (
          <div className="flex justify-center gap-2">
            <Button
              onClick={handleScrollUp}
              disabled={scrollOffset === 0}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              ↑ Scroll Up
            </Button>
            <Button
              onClick={handleScrollDown}
              disabled={scrollOffset >= stack.length - MAX_VISIBLE_ELEMENTS}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              ↓ Scroll Down
            </Button>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-4">
          {/* Input and Push */}
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter element to push"
              disabled={isAnimating}
              className="flex-1"
            />
            <Button
              onClick={handlePush}
              disabled={!inputValue.trim() || isAnimating}
              className="bg-green-600 hover:bg-green-700"
            >
              Push
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={handlePop}
              disabled={stack.length === 0 || isAnimating}
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50"
            >
              Pop
            </Button>
            <Button
              onClick={handlePeek}
              disabled={stack.length === 0 || isAnimating}
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
            >
              Peek
            </Button>
            <Button
              onClick={handleSize}
              disabled={isAnimating}
              variant="outline"
              className="border-indigo-500 text-indigo-600 hover:bg-indigo-50"
            >
              Size
            </Button>
            <Button
              onClick={handleIsEmpty}
              disabled={isAnimating}
              variant="outline"
              className="border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              isEmpty
            </Button>
            <Button
              onClick={handleClear}
              disabled={stack.length === 0 || isAnimating}
              variant="outline"
              className="border-gray-500 text-gray-600 hover:bg-gray-50"
            >
              Clear
            </Button>
          </div>

          {/* Status Message */}
          {message && (
            <div className="text-center p-2 bg-muted rounded-lg">
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {/* Stack Info */}
          <div className="text-center text-sm text-muted-foreground">
            <p>Stack Size: {stack.length}</p>
            {stack.length > 0 && (
              <p>Top Element: {stack[stack.length - 1].value}</p>
            )}
            {stack.length > MAX_VISIBLE_ELEMENTS && (
              <p>
                Showing elements{' '}
                {stack.length - getVisibleElements().length + 1}-{stack.length}{' '}
                of {stack.length}
              </p>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted/50 p-3 rounded-lg">
          <h4 className="font-semibold text-sm mb-2">How to use:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>
              • Type an element and click &quot;Push&quot; to add it to the top
            </li>
            <li>• Click &quot;Pop&quot; to remove the top element</li>
            <li>
              • Click &quot;Peek&quot; to highlight and show the top element
            </li>
            <li>
              • Click &quot;Size&quot; to check the number of elements in the
              stack
            </li>
            <li>• Click &quot;isEmpty&quot; to check if the stack is empty</li>
            <li>• Click &quot;Clear&quot; to empty the stack</li>
            <li>• Use scroll buttons when stack has many elements</li>
            <li>• Watch the LIFO (Last-In-First-Out) principle in action!</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default StackVisualization;
