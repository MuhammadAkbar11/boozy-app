import React from "react";
import clsx from "classnames";
import { mapToCssModules } from "./utils";
import AlertIcon from "./AlertIcon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "error" | "success" | "info" | "warning";
  children: React.ReactNode;
}

function Alert(props: Props) {
  const { variant = "success", children, className, ...attr } = props;

  const color = clsx({
    "alert-error": variant === "error",
    "alert-success": variant === "success",
    "alert-info": variant === "info",
    "alert-warning": variant === "warning",
  });

  const classes = mapToCssModules(clsx(className, "alert", "shadow-lg", color));

  return (
    <div {...attr} className={classes}>
      <AlertIcon variant={variant} />
      <div className="w-full">{children}</div>
    </div>
  );
}

export default Alert;
