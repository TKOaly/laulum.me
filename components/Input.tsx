import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(function Input(props, ref) {
  return <input ref={ref} {...props} className={styles.input} />;
});
