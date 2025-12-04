import { useState, type FormEvent } from 'react';
import { modes } from '../lib/modes';
import styles from '../styles/PromptForm.module.css';

interface PromptFormProps {
  onSubmit: (prompt: string, modeId: string) => void;
  isLoading?: boolean;
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [modeId, setModeId] = useState(modes[0]?.id ?? 'brainstorm');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit(prompt.trim(), modeId);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <textarea
          className={styles.textarea}
          placeholder="Ask a question, request ideas, or describe what you need."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          required
          disabled={isLoading}
        />
        <select
          className={styles.select}
          value={modeId}
          onChange={(event) => setModeId(event.target.value)}
          disabled={isLoading}
        >
          {modes.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.label}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.actions}>
        <button type="submit" className={styles.button} disabled={isLoading || !prompt.trim()}>
          {isLoading ? 'Generating…' : 'Send to AI'}
        </button>
        <span className="accent">Mode presets are optional—edit the prompt anytime.</span>
      </div>
    </form>
  );
}
