import useMounted from "@/lib/useMounted";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Link } from "./Link";

import styles from "./Link.module.css";

export const BackButton = () => {
  const mounted = useMounted();
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);

  // Show normal link until mounted
  if (!mounted) {
    return (
      <Link variant="primary" href="/">
        Back
      </Link>
    );
  }

  // When mounted, display button to go back.
  // This is not accessible!
  return (
    <button
      onClick={goBack}
      className={`${styles.link} ${styles.primary}`}
      style={{ cursor: "pointer" }}
    >
      Back
    </button>
  );
};
