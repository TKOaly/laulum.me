import styles from './TagBadge.module.css';

export const TagBadge = ({ tag }: { tag: string }) => {
  return <span className={styles.badge}>{tag}</span>;
};

