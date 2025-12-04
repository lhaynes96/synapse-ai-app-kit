import { useMemo, useState } from 'react';
import { ChatUI } from './components/ChatUI';
import { ProviderSwitcher } from './components/ProviderSwitcher';
import { callAI } from './lib/ai/aiRouter';
import { AIProvider, DEFAULT_PROVIDER } from './lib/ai/providers';
import { modes } from './lib/modes';
import { Message } from './lib/types';
import styles from './styles/App.module.css';

function applyModePrompt(prompt: string, modeId: string) {
  const mode = modes.find((item) => item.id === modeId);
  if (!mode) return prompt;
  return `${mode.promptPrefix}\n\n${prompt}`;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeProvider, setActiveProvider] = useState<AIProvider>(DEFAULT_PROVIDER);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const providerLabel = useMemo(() => (activeProvider === 'openai' ? 'OpenAI GPT-4o' : 'Google Gemini'), [activeProvider]);

  const handleSend = async (prompt: string, modeId: string) => {
    const preparedPrompt = applyModePrompt(prompt, modeId);
    const userMessage: Message = { role: 'user', content: preparedPrompt };

    const optimisticMessages = [...messages, userMessage];
    setMessages(optimisticMessages);
    setIsLoading(true);
    setError(null);

    try {
      const response = await callAI({
        provider: activeProvider,
        model: activeProvider === 'openai' ? 'gpt-4o-mini' : 'gemini-1.5-flash',
        messages: optimisticMessages,
      });

      setMessages([...optimisticMessages, { role: 'assistant', content: response.text }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <header className={`${styles.hero} card`}>
        <div>
          <div className={styles.badge}>Synapse AI App Kit</div>
          <h1>
            Production-ready starter for <span className="accent">multimodal</span> AI apps
          </h1>
          <p>Use OpenAI or Gemini, swap providers instantly, and start prototyping faster.</p>
        </div>
        <ProviderSwitcher value={activeProvider} onChange={setActiveProvider} />
      </header>

      <div className={styles.layout}>
        <section className={`card ${styles.panel}`}>
          <ChatUI messages={messages} isLoading={isLoading} error={error} onSend={handleSend} />
        </section>

        <aside className={`card ${styles.panel} ${styles.stack}`}>
          <div>
            <h3 className="accent">Preset modes</h3>
            <p className={styles.label}>Structured prompts you can tweak or extend.</p>
            <ul className={styles.infoList}>
              {modes.map((mode) => (
                <li key={mode.id}>
                  <span>•</span>
                  <div>
                    <strong>{mode.label}</strong>
                    <div>{mode.description || mode.promptPrefix}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="accent">Provider abstraction</h3>
            <p className={styles.label}>Current: {providerLabel}</p>
            <ul className={styles.infoList}>
              <li>
                <span>•</span> Swap API providers with a single dropdown.
              </li>
              <li>
                <span>•</span> Shared response shape: <code>{`{ text: string }`}</code>.
              </li>
              <li>
                <span>•</span> Add a backend proxy for secret management in production.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
