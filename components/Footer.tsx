import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export type FooterProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & { children: ReactNode };

export const Footer = ({ style, ...props }: FooterProps) => (
  <footer style={{ marginBlock: "2rem", ...style }} {...props} />
);
