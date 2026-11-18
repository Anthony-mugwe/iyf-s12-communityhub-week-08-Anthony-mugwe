import styles from './StatusMessage.module.css';

function StatusMessage({ type = 'info', message, onRetry }) {
  const isError = type === 'error';
  const isLoading = type === 'loading';
  return (
    <div className={`${styles.box} ${isError ? styles.error : ''} ${isLoading ? styles.loading : ''}`}
      role={isError ? 'alert' : 'status'} aria-live={isError ? 'assertive' : 'polite'}>
      {isLoading && <span className={styles.spinner} aria-hidden="true" />}
      <p className={styles.message}>{message}</p>
      {isError && onRetry && <button type="button" className={styles.retryBtn} onClick={onRetry}>Try Again</button>}
    </div>
  );
}
export default StatusMessage;
