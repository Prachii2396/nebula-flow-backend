import { Link2, Youtube, FileUp } from 'lucide-react';
import { cn } from '@/lib/utils';

type ResourceType = 'url' | 'youtube' | 'file';

interface ResourceTypeSelectorProps {
  selected: ResourceType;
  onSelect: (type: ResourceType) => void;
}

const resourceTypes = [
  { id: 'url' as const, label: 'URL', icon: Link2 },
  { id: 'youtube' as const, label: 'YOUTUBE', icon: Youtube },
  { id: 'file' as const, label: 'FILE', icon: FileUp },
];

const ResourceTypeSelector = ({ selected, onSelect }: ResourceTypeSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {resourceTypes.map((type, index) => {
        const Icon = type.icon;
        const isSelected = selected === type.id;
        
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium",
              "transition-all duration-300 ease-out",
              "animate-fade-in",
              isSelected
                ? "bg-primary/20 text-primary border-2 border-primary shadow-lg shadow-primary/20"
                : "bg-muted/50 text-muted-foreground border-2 border-transparent hover:bg-muted hover:text-foreground hover:border-border"
            )}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Icon className="w-4 h-4" />
            <span>{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default ResourceTypeSelector;
