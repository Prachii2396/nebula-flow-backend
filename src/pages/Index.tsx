import { useState } from 'react';
import { toast } from 'sonner';
import Header from '@/components/layout/Header';
import SpaceBackground from '@/components/space/SpaceBackground';
import NewAnalysisButton from '@/components/analyzer/NewAnalysisButton';
import AnalyzerForm from '@/components/analyzer/AnalyzerForm';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { analyzeResource, getAnalysisHistory, signOut } from '@/services/api';

const Index = () => {
  const scrollProgress = useScrollProgress();
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleNewAnalysis = () => {
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHistory = async () => {
    toast.info('Loading history...');
    const result = await getAnalysisHistory();
    if (result.success) {
      toast.success('History loaded successfully');
      // TODO: Show history modal/panel
    } else {
      toast.error(result.error || 'Failed to load history');
    }
  };

  const handleSignOut = async () => {
    const result = await signOut();
    if (result.success) {
      toast.success('Signed out successfully');
      // TODO: Redirect to login page
    } else {
      toast.error(result.error || 'Failed to sign out');
    }
  };

  const handleSubmit = async (data: {
    resourceType: 'url' | 'youtube' | 'file';
    url?: string;
    file?: File;
    learningAnswers: string;
  }) => {
    setIsLoading(true);
    
    try {
      const result = await analyzeResource(data);
      
      if (result.success) {
        toast.success('Analysis complete!', {
          description: 'Your learning resource has been analyzed.',
        });
        // TODO: Show results
      } else {
        toast.error('Analysis failed', {
          description: result.error,
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Space Background with Parallax */}
      <SpaceBackground scrollProgress={scrollProgress} />

      {/* Header */}
      <Header
        username="Demo User"
        onHistoryClick={handleHistory}
        onSignOut={handleSignOut}
      />

      {/* Main Content */}
      <main className="relative z-20 pt-24 md:pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* New Analysis Button */}
          <div className="mb-8 animate-fade-in">
            <NewAnalysisButton onClick={handleNewAnalysis} />
          </div>

          {/* Main Card */}
          {showForm && (
            <div className="glass-card p-6 md:p-8 rounded-3xl animate-scale-in">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-8 glow-text">
                Analyze Learning Resource
              </h1>
              
              <AnalyzerForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}

          {/* Decorative Elements */}
          <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-muted-foreground">
              Powered by AI · Explore the universe of knowledge
            </p>
          </div>
        </div>
      </main>

      {/* Extra scroll space for parallax effect */}
      <div className="h-[50vh]" />
    </div>
  );
};

export default Index;
