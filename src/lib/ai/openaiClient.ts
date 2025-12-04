import { AIResponse, Message } from '../types';
import { AIProvider } from './providers';

interface OpenAIChatParams {
  model: string;
  messages: Message[];
  provider?: AIProvider;
}

// Placeholder endpoint/body matching the OpenAI Chat Completions API.
export async function callOpenAIChat({ model, messages }: OpenAIChatParams): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_OPENAI_API_KEY. Add it to your .env file or proxy this call through a backend.');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || 'OpenAI request failed');
  }

  const data = await response.json();
  const text: string = data?.choices?.[0]?.message?.content ?? 'No response received.';
  return { text };
}
