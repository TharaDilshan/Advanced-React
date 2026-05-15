/**
 * Reusable Button component.
 * Use this across the app for consistent button styling and behavior.
 */

import styles from './Button.module.css';
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
}

export default function Button({
  children,
  type = 'button',
  disabled = false,
  variant = 'primary',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${styles.btn} ${styles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
