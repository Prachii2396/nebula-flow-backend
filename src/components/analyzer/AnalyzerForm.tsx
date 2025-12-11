import { useState, useRef } from 'react';
import { Sparkles, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import ResourceTypeSelector from './ResourceTypeSelector';
import { cn } from '@/lib/utils';

type ResourceType = 'url' | 'youtube' | 'file';

interface AnalyzerFormProps {
  onSubmit: (data: {
    resourceType: ResourceType;
    url?: string;
    file?: File;
    learningAnswers: string;
  }) => Promise<void>;
  isLoading?: boolean;
}

const AnalyzerForm = ({ onSubmit, isLoading = false }: AnalyzerFormProps) => {
  const [resourceType, setResourceType] = useState<ResourceType>('url');
  const [url, setUrl] = useState('');
  const [learningAnswers, setLearningAnswers] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      resourceType,
      url: resourceType !== 'file' ? url : undefined,
      file: resourceType === 'file' ? selectedFile || undefined : undefined,
      learningAnswers,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const placeholderText = resourceType === 'youtube' 
    ? 'https://youtube.com/watch?v=...'
    : 'https://example.com/article';

  const questions = [
    'What are you learning today?',
    'How much depth are you planning to learn?',
    'How much time do you have to achieve this?',
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Questions Card */}
      <div 
        className="glass-card p-6 rounded-2xl animate-fade-in-up"
        style={{ animationDelay: '0.1s' }}
      >
        <h3 className="text-sm font-semibold text-primary mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4" />
          Answer these questions:
        </h3>
        <ul className="space-y-2">
          {questions.map((question, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 text-foreground/90"
            >
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{question}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Resource Type */}
      <div 
        className="space-y-3 animate-fade-in-up"
        style={{ animationDelay: '0.2s' }}
      >
        <label className="text-sm font-medium text-foreground">
          Resource Type
        </label>
        <ResourceTypeSelector selected={resourceType} onSelect={setResourceType} />
      </div>

      {/* URL Input or File Upload */}
      {resourceType !== 'file' ? (
        <div 
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <label className="text-sm font-medium text-foreground">
            {resourceType === 'youtube' ? 'YouTube Video URL' : 'Web Page URL'}
          </label>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholderText}
            required
          />
        </div>
      ) : (
        <div 
          className="space-y-3 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          <label className="text-sm font-medium text-foreground">
            Upload File
          </label>
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
              isDragging
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.md"
            />
            <Upload className={cn(
              "w-10 h-10 mx-auto mb-3 transition-colors",
              isDragging ? "text-primary" : "text-muted-foreground"
            )} />
            {selectedFile ? (
              <p className="text-foreground font-medium">{selectedFile.name}</p>
            ) : (
              <>
                <p className="text-foreground mb-1">Drop your file here or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports PDF, DOC, DOCX, TXT, MD</p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Learning Answers */}
      <div 
        className="space-y-3 animate-fade-in-up"
        style={{ animationDelay: '0.4s' }}
      >
        <label className="text-sm font-medium text-foreground">
          Your Learning Answers
        </label>
        <Textarea
          value={learningAnswers}
          onChange={(e) => setLearningAnswers(e.target.value)}
          placeholder="Answer the questions above. Example: I want to master React and build production-ready applications. I need in-depth knowledge including advanced patterns. I have 3 months to learn this..."
          required
        />
      </div>

      {/* Submit Button */}
      <div 
        className="animate-fade-in-up"
        style={{ animationDelay: '0.5s' }}
      >
        <Button
          type="submit"
          variant="cosmic"
          size="xl"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Analyze Resource</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default AnalyzerForm;
