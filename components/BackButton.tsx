import useMounted from "@/lib/useMounted";
import { Roboto } from "@next/font/google";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { Link } from "./Link";

import styles from "./Link.module.css";
const roboto = Roboto({ subsets: ["latin"], weight: "400" });

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
      className={`${styles.link} ${styles.primary} ${roboto.className}`}
      style={{ cursor: "pointer", fontSize: "16px" }}
    >
      Back
    </button>
  );
};
