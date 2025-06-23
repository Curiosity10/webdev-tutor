import { LessonConfig } from '@/types/lesson';

export const LESSON_CONFIGS: Record<string, LessonConfig> = {
  stacks: {
    subthemeId: 'stacks',
    steps: [
      {
        id: 'theory',
        title: 'Theory',
        description: 'Learn about stack concepts and operations',
        path: '/learn/stacks',
      },
      {
        id: 'pseudocode',
        title: 'Pseudocode Challenge',
        description: 'Implement stack operations in pseudocode',
        path: '/learn/stacks/pseudo-challenge',
      },
      {
        id: 'practice',
        title: 'Practice Problems',
        description: 'Solve real-world problems using stacks',
        path: '/learn/stacks/problems',
      },
    ],
  },
};

export function getLessonConfig(subthemeId: string): LessonConfig | null {
  return LESSON_CONFIGS[subthemeId] || null;
}

export function getLessonSteps(subthemeId: string) {
  const config = getLessonConfig(subthemeId);
  return config?.steps || [];
}
