import Image, { ImageProps } from "next/image";

import styles from "./Icon.module.css";

export const Icon = ({
  size = 64,
  ...props
}: Omit<ImageProps, "src" | "alt"> & { size?: number }) => (
  <Image
    {...props}
    className={styles.icon}
    src="/icon.svg"
    width={size}
    height={size}
    alt=""
  />
);
