import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  variant?: "primary" | "secondary";
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const Button: FC<ButtonProps> = ({ variant, ...props }) => {
  return (
    <button
      {...props}
      className={`${styles.button} ${variant ? styles[variant] : ""}`}
    />
  );
};
