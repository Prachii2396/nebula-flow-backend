// API Service to connect to Python backend
// Configure the BASE_URL to point to your Python backend server

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

type ResourceType = 'url' | 'youtube' | 'file';

interface AnalyzeRequest {
  resourceType: ResourceType;
  url?: string;
  file?: File;
  learningAnswers: string;
}

interface AnalyzeResponse {
  success: boolean;
  data?: {
    summary: string;
    keyPoints: string[];
    learningPlan: string;
    estimatedTime: string;
  };
  error?: string;
}

export const analyzeResource = async (request: AnalyzeRequest): Promise<AnalyzeResponse> => {
  try {
    const formData = new FormData();
    formData.append('resource_type', request.resourceType);
    formData.append('learning_answers', request.learningAnswers);

    if (request.resourceType === 'file' && request.file) {
      formData.append('file', request.file);
    } else if (request.url) {
      formData.append('url', request.url);
    }

    const response = await fetch(`${BASE_URL}/api/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to analyze resource',
    };
  }
};

export const getAnalysisHistory = async (): Promise<{ success: boolean; data?: any[]; error?: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/api/history`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch history',
    };
  }
};

export const signOut = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to sign out',
    };
  }
};
