import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StackVisualization from '@/components/StackVisualization';
import { LessonProgressBarWrapper } from '@/components/LessonProgressBarWrapper';

interface TheoryPageProps {
  params: Promise<{
    subthemeId: string;
  }>;
}

export default async function TheoryPage({ params }: TheoryPageProps) {
  const { subthemeId } = await params;

  // For MVP, we only handle "stacks"
  if (subthemeId !== 'stacks') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Topic Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The requested learning topic could not be found.
          </p>
          <Link
            href="/themes/fundamental-data-structures"
            className="text-primary hover:underline"
          >
            Return to Theme
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/themes/fundamental-data-structures"
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
            Back to Fundamental Data Structures
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">Stacks</h1>
          <p className="text-lg text-muted-foreground">
            Learn about the Last-In-First-Out (LIFO) data structure and its
            operations.
          </p>
        </div>

        {/* Lesson Progress Bar */}
        <div className="mb-8">
          <LessonProgressBarWrapper
            subthemeId={subthemeId}
            currentStepId="theory"
          />
        </div>

        {/* Theory Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>What is a Stack?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A stack is a linear data structure that follows the{' '}
              <strong>Last-In-First-Out (LIFO)</strong> principle. Think of it
              like a stack of plates - you can only add or remove plates from
              the top.
            </p>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Key Characteristics:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Elements are added and removed from the same end (top)</li>
                <li>The last element added is the first one to be removed</li>
                <li>Access is restricted to the top element only</li>
                <li>
                  Efficient for operations at the top (O(1) time complexity
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Operations Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Stack Operations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h4 className="font-semibold text-green-600">push(element)</h4>
                <p className="text-sm text-muted-foreground">
                  Adds an element to the top of the stack
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-red-600">pop()</h4>
                <p className="text-sm text-muted-foreground">
                  Removes and returns the top element from the stack
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-blue-600">peek()</h4>
                <p className="text-sm text-muted-foreground">
                  Returns the top element without removing it
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-purple-600">isEmpty()</h4>
                <p className="text-sm text-muted-foreground">
                  Checks if the stack has no elements
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Visualization Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <StackVisualization />
          </CardContent>
        </Card>

        {/* Code Implementation Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>JavaScript Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code>{`class Stack {
  constructor() {
    this.items = [];
  }

  // Add element to top of stack
  push(element) {
    this.items.push(element);
  }

  // Remove and return top element
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Return top element without removing
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items[this.items.length - 1];
  }

  // Check if stack is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Get stack size
  size() {
    return this.items.length;
  }
}

// Usage example:
const stack = new Stack();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.peek()); // 3
console.log(stack.pop());  // 3
console.log(stack.peek()); // 2`}</code>
            </pre>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/themes/fundamental-data-structures">
            <Button variant="outline">← Back to Theme</Button>
          </Link>
          <Link href={`/learn/${subthemeId}/pseudo-challenge`}>
            <Button>Next: Pseudocode Challenge →</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
