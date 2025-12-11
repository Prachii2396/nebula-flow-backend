import { Sparkles, Clock, LogOut, Rocket, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  username?: string;
  onHistoryClick: () => void;
  onSignOut: () => void;
}

const Header = ({ username = 'Demo User', onHistoryClick, onSignOut }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-glass-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Rocket className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
            </div>
            <span className="font-display font-bold text-xl md:text-2xl text-foreground glow-text">
              Insight
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Welcome Message */}
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Welcome, <span className="text-foreground font-medium">{username}</span></span>
            </div>

            {/* Timer Button */}
            <Link to="/timer">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary animate-fade-in"
                style={{ animationDelay: '0.15s' }}
              >
                <Timer className="w-4 h-4" />
                <span className="hidden sm:inline">Timer</span>
              </Button>
            </Link>

            {/* History Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onHistoryClick}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              <Clock className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Button>

            {/* Sign Out Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              className="flex items-center gap-2 text-muted-foreground hover:text-destructive animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
