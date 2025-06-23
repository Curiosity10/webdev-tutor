export interface LessonStep {
  id: string;
  title: string;
  description?: string;
  path: string;
  isCompleted: boolean;
  isCurrent: boolean;
  isAccessible: boolean;
}

export interface LessonProgress {
  subthemeId: string;
  currentStepId: string;
  completedSteps: string[];
  totalSteps: number;
}

export interface LessonConfig {
  subthemeId: string;
  steps: Omit<LessonStep, 'isCompleted' | 'isCurrent' | 'isAccessible'>[];
}
