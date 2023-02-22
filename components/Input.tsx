import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export const Input = forwardRef<
  HTMLInputElement,
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>((props, ref) => <input ref={ref} {...props} className={styles.input} />);
