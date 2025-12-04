import { AIResponse, Message } from '../types';
import { AIProvider } from './providers';

interface GeminiChatParams {
  model: string;
  messages: Message[];
  provider?: AIProvider;
}

// Placeholder Google Gemini REST API call. Adjust endpoint/payload to match current API version.
export async function callGeminiChat({ model, messages }: GeminiChatParams): Promise<AIResponse> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('Missing VITE_GEMINI_API_KEY. Add it to your .env file or proxy this call through a backend.');
  }

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          role: 'user',
          parts: messages.map((message) => ({ text: message.content })),
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error?.message || 'Gemini request failed');
  }

  const data = await response.json();
  const text: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? 'No response received.';
  return { text };
}
