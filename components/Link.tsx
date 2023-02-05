import type { LinkProps as NextLinkProps } from "next/link";
import type { FC, HTMLProps } from "react";

import NextLink from "next/link";
import styles from "./Link.module.css";

export type LinkProps = {
  variant?: "primary" | "secondary" | "telegram";
} & NextLinkProps &
  HTMLProps<HTMLAnchorElement> &
  React.RefAttributes<HTMLAnchorElement>;

export const Link: FC<LinkProps> = ({ variant, ...props }) => {
  return (
    <NextLink
      {...props}
      className={`${styles.link} ${variant ? styles[variant] : ""}`}
    />
  );
};
