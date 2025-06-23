import { ThemeGroupCard } from '@/components/ThemeGroupCard';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Welcome to WebDevTutor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Master web development and computer science fundamentals through interactive learning experiences. 
          Choose your path and build real-world skills with hands-on practice.
          </p>
        </div>

        {/* Theme Groups */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Choose a Learning Path
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ThemeGroupCard
              title="Fundamental Data Structures"
              description="Learn the building blocks of computer science: arrays, linked lists, stacks, queues, and trees."
              href="/themes/fundamental-data-structures"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Interactive Learning</h3>
            <p className="text-muted-foreground">
              Practice with real code examples and get instant feedback.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Hands-on Practice</h3>
            <p className="text-muted-foreground">
              Solve coding challenges and build your problem-solving skills.
            </p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
            <p className="text-muted-foreground">
              Monitor your learning journey and celebrate your achievements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
