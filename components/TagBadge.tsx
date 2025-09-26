import Link from 'next/link';
import styles from './TagBadge.module.css';

export const TagBadge = ({ tag }: { tag: string }) => {
  return (
    <Link href={`/?${encodeURIComponent(tag)}`}>
      <span className={styles.badge}>{tag}</span>
    </Link>
  );
};
