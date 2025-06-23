import Link from 'next/link';
import { PracticeProblemsClient } from '@/components/PracticeProblemsClient';

interface PracticeProblemsPageProps {
  params: Promise<{
    subthemeId: string;
  }>;
}

export default async function PracticeProblemsPage({
  params,
}: PracticeProblemsPageProps) {
  const { subthemeId } = await params;

  // For MVP, we only handle "stacks"
  if (subthemeId !== 'stacks') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Problem Not Found
          </h1>
          <p className="text-muted-foreground mb-6">
            The requested practice problem could not be found.
          </p>
          <Link href="/learn/stacks" className="text-primary hover:underline">
            Return to Learning
          </Link>
        </div>
      </div>
    );
  }

  return <PracticeProblemsClient subthemeId={subthemeId} />;
}

export async function generateStaticParams() {
  return [
    { subthemeId: 'stacks' },
  ];
}
