import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Minus, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const GeneralTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(5 * 60);
  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isEditing) {
      const total = hours * 3600 + minutes * 60 + seconds;
      setTotalSeconds(total);
      setTimeLeft(total);
    }
  }, [hours, minutes, seconds, isEditing]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      toast.success('⏰ Time\'s up!');
      // Play a sound or notification
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const formatDisplay = (totalSecs: number) => {
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);
    const s = totalSecs % 60;
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0'),
    };
  };

  const display = formatDisplay(timeLeft);
  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  const toggleTimer = () => {
    if (isEditing && totalSeconds > 0) {
      setIsEditing(false);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsEditing(true);
    setTimeLeft(totalSeconds);
  };

  const adjustTime = (type: 'hours' | 'minutes' | 'seconds', delta: number) => {
    if (!isEditing) return;
    
    switch (type) {
      case 'hours':
        setHours(Math.max(0, Math.min(23, hours + delta)));
        break;
      case 'minutes':
        setMinutes(Math.max(0, Math.min(59, minutes + delta)));
        break;
      case 'seconds':
        setSeconds(Math.max(0, Math.min(59, seconds + delta)));
        break;
    }
  };

  const TimeUnit = ({ 
    value, 
    label, 
    type 
  }: { 
    value: string; 
    label: string; 
    type: 'hours' | 'minutes' | 'seconds';
  }) => (
    <div className="flex flex-col items-center">
      {isEditing && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => adjustTime(type, 1)}
          className="w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          <Plus className="w-4 h-4" />
        </Button>
      )}
      <div className="text-4xl md:text-5xl font-mono font-bold text-foreground glow-text">
        {value}
      </div>
      <span className="text-xs text-muted-foreground mt-1">{label}</span>
      {isEditing && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => adjustTime(type, -1)}
          className="w-8 h-8 text-muted-foreground hover:text-foreground"
        >
          <Minus className="w-4 h-4" />
        </Button>
      )}
    </div>
  );

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-bold text-foreground flex items-center justify-center gap-2">
          <Timer className="w-5 h-5 text-primary" />
          General Timer
        </h3>
        <p className="text-sm text-muted-foreground">
          Set any duration for your focus session
        </p>
      </div>

      {/* Timer Display */}
      <div className="relative py-8">
        {/* Progress Ring */}
        {!isEditing && (
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="3"
              className="opacity-20"
            />
            <circle
              cx="50%"
              cy="50%"
              r="40%"
              fill="none"
              stroke="url(#timerGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}%`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}%`}
              className="transition-all duration-1000 ease-linear"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
        )}

        {/* Time Display */}
        <div className="flex items-center justify-center gap-2 relative z-10">
          <TimeUnit value={display.hours} label="HRS" type="hours" />
          <span className="text-4xl md:text-5xl font-mono font-bold text-muted-foreground mt-[-20px]">:</span>
          <TimeUnit value={display.minutes} label="MIN" type="minutes" />
          <span className="text-4xl md:text-5xl font-mono font-bold text-muted-foreground mt-[-20px]">:</span>
          <TimeUnit value={display.seconds} label="SEC" type="seconds" />
        </div>
      </div>

      {/* Quick Presets */}
      {isEditing && (
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: '5m', h: 0, m: 5, s: 0 },
            { label: '10m', h: 0, m: 10, s: 0 },
            { label: '15m', h: 0, m: 15, s: 0 },
            { label: '30m', h: 0, m: 30, s: 0 },
            { label: '1h', h: 1, m: 0, s: 0 },
          ].map(({ label, h, m, s }) => (
            <Button
              key={label}
              variant="outline"
              size="sm"
              onClick={() => { setHours(h); setMinutes(m); setSeconds(s); }}
              className="text-xs"
            >
              {label}
            </Button>
          ))}
        </div>
      )}

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
          disabled={totalSeconds === 0}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent hover:opacity-90 shadow-lg transition-all duration-300 hover:scale-105"
        >
          {isRunning ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </Button>

        <div className="w-12 h-12" /> {/* Spacer for symmetry */}
      </div>
    </div>
  );
};

export default GeneralTimer;