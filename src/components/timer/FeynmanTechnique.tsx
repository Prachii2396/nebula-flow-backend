import { useState } from 'react';
import { Lightbulb, ChevronRight, RotateCcw, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

const STEPS = [
  {
    title: 'Choose a Concept',
    description: 'Write down the topic or concept you want to understand.',
    placeholder: 'e.g., Quantum Entanglement, Machine Learning, Photosynthesis...'
  },
  {
    title: 'Teach It Simply',
    description: 'Explain it as if teaching a 5-year-old. Use simple words and analogies.',
    placeholder: 'Imagine you\'re explaining this to a curious child who asks "why" a lot...'
  },
  {
    title: 'Identify Gaps',
    description: 'Where did you struggle? What parts were hard to explain simply?',
    placeholder: 'I couldn\'t explain... I got confused when... I need to review...'
  },
  {
    title: 'Review & Simplify',
    description: 'Go back to your sources, fill the gaps, and try explaining again.',
    placeholder: 'Now I understand that... A better way to explain it is...'
  }
];

const FeynmanTechnique = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(['', '', '', '']);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers(['', '', '', '']);
    setIsComplete(false);
  };

  const updateAnswer = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  if (isComplete) {
    return (
      <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-display font-bold text-foreground">
            Great Work! 🎉
          </h3>
          <p className="text-muted-foreground">
            You've completed the Feynman Technique for:
          </p>
          <p className="text-lg font-semibold text-primary">"{answers[0]}"</p>
        </div>

        {/* Summary */}
        <div className="space-y-4 pt-4 border-t border-glass-border">
          {STEPS.map((step, i) => (
            <div key={i} className="space-y-1">
              <h4 className="text-sm font-medium text-muted-foreground">{step.title}</h4>
              <p className="text-sm text-foreground glass-card rounded-lg p-3">
                {answers[i] || 'Not filled'}
              </p>
            </div>
          ))}
        </div>

        <Button onClick={handleReset} className="w-full" variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Start New Session
        </Button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-400" />
          Feynman Technique
        </h3>
        <p className="text-sm text-muted-foreground">
          If you can't explain it simply, you don't understand it well enough.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="flex justify-between px-2">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all duration-300 ${
              i < currentStep
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white'
                : i === currentStep
                ? 'bg-gradient-to-r from-primary to-accent text-white scale-110'
                : 'bg-muted/30 text-muted-foreground'
            }`}
          >
            {i < currentStep ? '✓' : i + 1}
          </div>
        ))}
      </div>

      {/* Current Step */}
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-xs text-white">
              {currentStep + 1}
            </span>
            {STEPS[currentStep].title}
          </h4>
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-400" />
            {STEPS[currentStep].description}
          </p>
        </div>

        {currentStep === 0 ? (
          <Input
            value={answers[currentStep]}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={STEPS[currentStep].placeholder}
            className="bg-background/50"
          />
        ) : (
          <Textarea
            value={answers[currentStep]}
            onChange={(e) => updateAnswer(e.target.value)}
            placeholder={STEPS[currentStep].placeholder}
            rows={5}
            className="bg-background/50 resize-none"
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex-1"
        >
          Back
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentStep].trim()}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90"
        >
          {currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default FeynmanTechnique;