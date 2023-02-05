import type { HTMLProps } from "react";
import styles from "./Input.module.css";

export const Input = (props: HTMLProps<HTMLInputElement>) => (
  <input {...props} className={styles.input} />
);
