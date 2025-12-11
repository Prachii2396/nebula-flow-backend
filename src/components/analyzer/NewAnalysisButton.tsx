import { Target, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewAnalysisButtonProps {
  onClick: () => void;
}

const NewAnalysisButton = ({ onClick }: NewAnalysisButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="cosmic"
      size="lg"
      className="group relative overflow-hidden"
    >
      <span className="relative z-10 flex items-center gap-2">
        <Target className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500" />
        <span>New Analysis</span>
        <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </span>
    </Button>
  );
};

export default NewAnalysisButton;
