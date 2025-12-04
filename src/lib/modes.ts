import { ModeOption } from './types';

export const modes: ModeOption[] = [
  {
    id: 'brainstorm',
    label: 'Brainstorm campaign ideas',
    promptPrefix: 'Brainstorm 10 creative campaign ideas for a new product. Keep them concise and original.',
    description: 'Great for marketing and ideation sprints.',
  },
  {
    id: 'code-helper',
    label: 'Code helper',
    promptPrefix: 'You are a concise coding assistant. Provide step-by-step guidance.',
    description: 'Useful when prototyping or debugging.',
  },
  {
    id: 'storyteller',
    label: 'Storytelling',
    promptPrefix: 'Tell a short story in a warm, engaging tone based on the user prompt.',
  },
];
