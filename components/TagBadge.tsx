import Link from 'next/link';
import styles from './TagBadge.module.css';
import slugify from "@/lib/slugify";

export const TagBadge = ({ tag }: { tag: string }) => {
  return (
    <Link href={`/?tag=${encodeURIComponent(slugify(tag))}`}>
      <span className={styles.badge}>{tag}</span>
    </Link>
  );
};
