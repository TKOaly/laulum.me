import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import Logo from "./Logo";

export type HeaderProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & { children: ReactNode };

export const Header = ({ children, style, ...props }: HeaderProps) => (
  <header
    style={{
      display: "flex",
      gap: "1rem",
      alignItems: "center",
      height: "5rem",
      ...style,
    }}
    {...props}
  >
    {children}
    <Logo style={{ marginLeft: "auto" }} />
  </header>
);
