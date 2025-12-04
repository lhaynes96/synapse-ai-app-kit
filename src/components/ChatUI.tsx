import { Message } from '../lib/types';
import { PromptForm } from './PromptForm';
import { ResponsePanel } from './ResponsePanel';
import styles from '../styles/ChatUI.module.css';

interface ChatUIProps {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  onSend: (prompt: string, modeId: string) => void;
}

export function ChatUI({ messages, isLoading, error, onSend }: ChatUIProps) {
  const lastAssistantMessage = [...messages].reverse().find((msg) => msg.role === 'assistant');

  return (
    <div className={styles.chatShell}>
      <div className={styles.feed}>
        {messages.length === 0 && <p>Start chatting with the AI to see the conversation flow.</p>}
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={`${styles.message} ${styles[message.role]}`}>
            <div className={styles.meta}>
              <strong>{message.role === 'assistant' ? 'AI' : 'You'}</strong>
            </div>
            <div>{message.content}</div>
          </div>
        ))}
        <div className={styles.spacer} />
        {error && <div className={styles.error}>{error}</div>}
      </div>

      <PromptForm onSubmit={onSend} isLoading={isLoading} />
      <ResponsePanel content={lastAssistantMessage?.content ?? ''} />
    </div>
  );
}
