export interface UserProgress {
    id: string;
    language: string;
    skillLevel?: string;
    learningPath?: string;
    currentQuestions?: Question[];
    roadmap?: Roadmap;
  }
  
  export interface Question {
    id: string;
    text: string;
    options?: string[];
    type: 'multiple-choice' | 'coding' | 'text';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }
  
  export interface Roadmap {
    steps: {
      title: string;
      description: string;
      timeEstimate: string;
      topics: string[];
    }[];
  }
  
  