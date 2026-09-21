import styles from "./Card.module.css";
import { CardProps } from "./Card.types";

export function Card({ children, className }: CardProps): JSX.Element {
  return (
    <div className={[styles.itemCard, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
