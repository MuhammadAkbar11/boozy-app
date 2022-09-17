import React from "react";
import clsx from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "error" | "success" | "info" | "warning";
  loading?: boolean;
  children: React.ReactNode;
}

function Button({
  variant = "primary",
  children,
  loading = false,
  ...props
}: ButtonProps) {
  const color = clsx({
    "btn-primary": variant === "primary",
    "btn-secondary": variant === "secondary",
    "btn-error": variant === "error",
    "btn-success": variant === "success",
    "btn-info": variant === "info",
    "btn-warning": variant === "warning",
  });

  const btnClassName = clsx(props.className, {
    [`${color}`]: !loading,
    loading: loading,
    "bg-slate-600": loading,
  });

  return (
    <button type="submit" className={`btn w-full ${btnClassName} `} {...props}>
      {children}
    </button>
  );
}

export default Button;
