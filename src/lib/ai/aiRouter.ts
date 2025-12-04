import { AIResponse, Message } from '../types';
import { AIProvider, getActiveProvider } from './providers';
import { callOpenAIChat } from './openaiClient';
import { callGeminiChat } from './geminiClient';

export interface CallAIParams {
  provider?: AIProvider;
  model: string;
  messages: Message[];
}

export async function callAI({ provider, model, messages }: CallAIParams): Promise<AIResponse> {
  const activeProvider = getActiveProvider(provider);

  try {
    if (activeProvider === 'openai') {
      return await callOpenAIChat({ model, messages, provider: activeProvider });
    }

    if (activeProvider === 'gemini') {
      return await callGeminiChat({ model, messages, provider: activeProvider });
    }

    throw new Error(`Unsupported provider: ${activeProvider}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown AI provider error';
    throw new Error(message);
  }
}
