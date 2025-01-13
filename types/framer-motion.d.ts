declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: React.FC<{
    children: React.ReactNode;
    mode?: 'sync' | 'wait' | 'popLayout';
    initial?: boolean;
    onExitComplete?: () => void;
  }>;
  // Add other exports as needed
}

