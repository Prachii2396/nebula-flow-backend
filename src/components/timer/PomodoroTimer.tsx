import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, Coffee, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

const TIMER_DURATIONS = {
  work: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const PomodoroTimer = () => {
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS.work);
  const [isRunning, setIsRunning] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((TIMER_DURATIONS[mode] - timeLeft) / TIMER_DURATIONS[mode]) * 100;

  const handleComplete = useCallback(() => {
    if (mode === 'work') {
      const newCount = completedPomodoros + 1;
      setCompletedPomodoros(newCount);
      toast.success('🎉 Great focus session! Time for a break.');
      
      if (newCount % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(TIMER_DURATIONS.longBreak);
        toast.info('You\'ve completed 4 pomodoros! Take a longer break.');
      } else {
        setMode('shortBreak');
        setTimeLeft(TIMER_DURATIONS.shortBreak);
      }
    } else {
      toast.success('☕ Break over! Ready for another focus session?');
      setMode('work');
      setTimeLeft(TIMER_DURATIONS.work);
    }
    setIsRunning(false);
  }, [mode, completedPomodoros]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const getModeColor = () => {
    switch (mode) {
      case 'work': return 'from-primary to-accent';
      case 'shortBreak': return 'from-emerald-500 to-teal-500';
      case 'longBreak': return 'from-violet-500 to-purple-500';
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case 'work': return 'Focus Time';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Pomodoro Technique
        </h3>
        <p className="text-sm text-muted-foreground">
          25 min focus • 5 min break • Long break after 4 cycles
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex gap-2 p-1 glass-card rounded-xl">
        {[
          { mode: 'work' as TimerMode, label: 'Focus', icon: Brain },
          { mode: 'shortBreak' as TimerMode, label: 'Short', icon: Coffee },
          { mode: 'longBreak' as TimerMode, label: 'Long', icon: Coffee },
        ].map(({ mode: m, label, icon: Icon }) => (
          <button
            key={m}
            onClick={() => switchMode(m)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-300 flex items-center justify-center gap-1.5 ${
              mode === m
                ? 'bg-gradient-to-r ' + getModeColor() + ' text-white shadow-lg'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div className="relative flex items-center justify-center py-8">
        {/* Progress Ring */}
        <svg className="absolute w-48 h-48 md:w-56 md:h-56 -rotate-90">
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
            className="opacity-20"
          />
          <circle
            cx="50%"
            cy="50%"
            r="45%"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 45}%`}
            strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}%`}
            className="transition-all duration-1000 ease-linear"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time Display */}
        <div className="text-center z-10">
          <div className="text-5xl md:text-6xl font-mono font-bold text-foreground glow-text">
            {formatTime(timeLeft)}
          </div>
          <div className={`text-sm font-medium mt-2 bg-gradient-to-r ${getModeColor()} bg-clip-text text-transparent`}>
            {getModeLabel()}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={resetTimer}
          className="w-12 h-12 rounded-full glass-card hover:bg-muted/50"
        >
          <RotateCcw className="w-5 h-5" />
        </Button>
        
        <Button
          onClick={toggleTimer}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${getModeColor()} hover:opacity-90 shadow-lg transition-all duration-300 hover:scale-105`}
        >
          {isRunning ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </Button>

        <div className="w-12 h-12 rounded-full glass-card flex items-center justify-center">
          <span className="text-sm font-bold text-primary">{completedPomodoros}</span>
        </div>
      </div>

      {/* Pomodoro Count */}
      <div className="flex items-center justify-center gap-2">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < completedPomodoros % 4
                ? 'bg-gradient-to-r from-primary to-accent'
                : 'bg-muted/30'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-2">
          until long break
        </span>
      </div>
    </div>
  );
};

export default PomodoroTimer;