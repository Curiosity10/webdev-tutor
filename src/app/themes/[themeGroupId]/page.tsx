import { SubthemeCard } from '@/components/SubthemeCard';
import Link from 'next/link';

interface ThemeGroupPageProps {
  params: Promise<{
    themeGroupId: string;
  }>;
}

export default async function ThemeGroupPage({ params }: ThemeGroupPageProps) {
  const { themeGroupId } = await params;

  // For MVP, we only handle "fundamental-data-structures"
  if (themeGroupId !== 'fundamental-data-structures') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Theme Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The requested theme group could not be found.
          </p>
          <Link href="/" className="text-primary hover:underline">
            Return to Home
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
            href="/"
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
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-primary mb-2">
            Fundamental Data Structures
          </h1>
          <p className="text-lg text-muted-foreground">
            Master the essential building blocks of computer science and
            programming.
          </p>
        </div>

        {/* Subthemes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-foreground">
            Available Topics
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SubthemeCard
              title="Stacks"
              href="/learn/stacks"
              subthemeId="stacks"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">About This Theme</h3>
          <p className="text-muted-foreground">
            Data structures are fundamental concepts in computer science that
            help organize and store data efficiently. Understanding these
            structures is crucial for writing efficient algorithms and solving
            complex problems.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return [
    { themeGroupId: 'fundamental-data-structures' },
  ];
}
