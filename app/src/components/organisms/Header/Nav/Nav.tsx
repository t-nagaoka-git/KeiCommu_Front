import AuthButtons from '@/components/molecules/AuthButtons';
import styles from './styles.module.css';

export function Nav() {
  return (
    <nav className={styles.module}>
      <AuthButtons />
    </nav>
  );
}
