import type { HTMLProps } from "react";

import Image from "next/image";
import styles from "./Logo.module.css";

export const Logo = ({
  size = 72,
  ...props
}: HTMLProps<HTMLAnchorElement> & { size?: number }) => (
  <a
    href="https://tko-aly.fi"
    target="_blank"
    rel="noreferrer noopener"
    {...props}
  >
    <Image
      className={styles.logo}
      src="/logo.svg"
      width={size}
      height={size}
      alt="Logo of TKO-äly ry"
    />
  </a>
);
