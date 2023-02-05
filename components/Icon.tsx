import Image, { ImageProps } from "next/image";

import styles from "./Icon.module.css";

const Icon = ({
  size = 64,
  ...props
}: Omit<ImageProps, "src" | "alt"> & { size?: number }) => (
  <Image
    {...props}
    className={styles.icon}
    src="/icons/icon.svg"
    width={size}
    height={size}
    alt=""
  />
);

export default Icon;
