import { useRouter } from "next/router";
import { useCallback } from "react";
import { Link } from "./Link";

export const BackButton = () => {
  const router = useRouter();
  const goBack = useCallback(() => router.back(), [router]);
  return (
    <Link variant="primary" href="/" onClick={goBack}>
      Back
    </Link>
  );
};
