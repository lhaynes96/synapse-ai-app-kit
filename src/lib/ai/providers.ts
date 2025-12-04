export type AIProvider = 'openai' | 'gemini';

export const DEFAULT_PROVIDER: AIProvider =
  (import.meta.env.VITE_DEFAULT_AI_PROVIDER as AIProvider) || 'openai';

export const providerLabels: Record<AIProvider, string> = {
  openai: 'OpenAI',
  gemini: 'Gemini',
};

export const getEnvForProvider = (provider: AIProvider) => {
  if (provider === 'openai') {
    return import.meta.env.VITE_OPENAI_API_KEY;
  }
  return import.meta.env.VITE_GEMINI_API_KEY;
};

export const getActiveProvider = (override?: AIProvider): AIProvider => {
  if (override) return override;
  return DEFAULT_PROVIDER;
};
