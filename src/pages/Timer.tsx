import { useState } from 'react';
import { ArrowLeft, Clock, Brain, Lightbulb, Timer as TimerIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SpaceBackground from '@/components/space/SpaceBackground';
import Saturn from '@/components/timer/Saturn';
import PomodoroTimer from '@/components/timer/PomodoroTimer';
import FeynmanTechnique from '@/components/timer/FeynmanTechnique';
import GeneralTimer from '@/components/timer/GeneralTimer';
import { Button } from '@/components/ui/button';
import { useScrollProgress } from '@/hooks/useScrollProgress';

type TimerTab = 'pomodoro' | 'feynman' | 'general';

const Timer = () => {
  const scrollProgress = useScrollProgress();
  const [activeTab, setActiveTab] = useState<TimerTab>('pomodoro');

  const tabs = [
    { id: 'pomodoro' as TimerTab, label: 'Pomodoro', icon: Brain, description: '25/5 Focus Cycles' },
    { id: 'feynman' as TimerTab, label: 'Feynman', icon: Lightbulb, description: 'Learn by Teaching' },
    { id: 'general' as TimerTab, label: 'Timer', icon: TimerIcon, description: 'Custom Duration' },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <SpaceBackground scrollProgress={scrollProgress} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link to="/" className="flex items-center gap-3 animate-fade-in group">
              <Button variant="ghost" size="icon" className="group-hover:bg-muted/50">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <span className="font-display font-bold text-xl text-foreground">
                Back to Insight
              </span>
            </Link>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span className="font-display font-semibold text-foreground">Time Lab</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-24 md:pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Hero Section with Saturn */}
          <div className="text-center space-y-6 mb-12">
            <div className="animate-fade-in">
              <Saturn />
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground glow-text">
                Time Lab
              </h1>
              <p className="text-muted-foreground max-w-md mx-auto">
                Master your focus with proven techniques. Orbit around productivity.
              </p>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {tabs.map(({ id, label, icon: Icon, description }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex-1 p-4 rounded-xl transition-all duration-300 group ${
                  activeTab === id
                    ? 'glass-card border-2 border-primary/50 shadow-lg shadow-primary/20'
                    : 'glass-card hover:border-primary/30 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    activeTab === id
                      ? 'bg-gradient-to-br from-primary to-accent'
                      : 'bg-muted/50 group-hover:bg-muted'
                  }`}>
                    <Icon className={`w-5 h-5 ${activeTab === id ? 'text-white' : 'text-muted-foreground'}`} />
                  </div>
                  <div className="text-left">
                    <div className={`font-semibold ${activeTab === id ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {label}
                    </div>
                    <div className="text-xs text-muted-foreground">{description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Timer Component */}
          <div className="max-w-xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {activeTab === 'pomodoro' && <PomodoroTimer />}
            {activeTab === 'feynman' && <FeynmanTechnique />}
            {activeTab === 'general' && <GeneralTimer />}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4 mt-12 max-w-4xl mx-auto">
            {[
              {
                icon: Brain,
                title: 'Pomodoro',
                description: 'Work 25 min, break 5 min. After 4 cycles, take a 15-min break. Stay sharp without burnout.',
                color: 'from-primary to-accent'
              },
              {
                icon: Lightbulb,
                title: 'Feynman',
                description: 'Explain concepts simply. If you can\'t teach it to a child, you don\'t truly understand it.',
                color: 'from-amber-400 to-orange-500'
              },
              {
                icon: TimerIcon,
                title: 'Custom Timer',
                description: 'Set any duration for focused work. No rules, just pure concentration time.',
                color: 'from-violet-500 to-purple-500'
              }
            ].map(({ icon: Icon, title, description, color }, i) => (
              <div 
                key={title}
                className="glass-card rounded-xl p-5 space-y-3 animate-fade-in"
                style={{ animationDelay: `${0.5 + i * 0.1}s` }}
              >
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Timer;