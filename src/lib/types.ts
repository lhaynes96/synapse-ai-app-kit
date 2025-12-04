export type Role = 'user' | 'assistant';

export interface Message {
  role: Role;
  content: string;
}

export interface AIResponse {
  text: string;
}

export interface ModeOption {
  id: string;
  label: string;
  promptPrefix: string;
  description?: string;
}
