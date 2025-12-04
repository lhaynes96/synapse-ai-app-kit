import { AIProvider, providerLabels } from '../lib/ai/providers';
import styles from '../styles/ProviderSwitcher.module.css';

interface ProviderSwitcherProps {
  value: AIProvider;
  onChange: (provider: AIProvider) => void;
}

export function ProviderSwitcher({ value, onChange }: ProviderSwitcherProps) {
  return (
    <div className={styles.switcher}>
      <label htmlFor="provider" className="accent">
        Provider
      </label>
      <select
        id="provider"
        className={styles.select}
        value={value}
        onChange={(event) => onChange(event.target.value as AIProvider)}
      >
        {Object.entries(providerLabels).map(([key, label]) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>
      <span className={styles.helper}>Swap between OpenAI and Gemini.</span>
    </div>
  );
}
