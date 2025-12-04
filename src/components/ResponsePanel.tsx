import styles from '../styles/ResponsePanel.module.css';

interface ResponsePanelProps {
  heading?: string;
  content: string;
}

export function ResponsePanel({ heading = 'Assistant response', content }: ResponsePanelProps) {
  return (
    <div className={styles.panel}>
      <p className={styles.title}>{heading}</p>
      <div className={styles.content}>{content || 'Responses will appear here.'}</div>
    </div>
  );
}
