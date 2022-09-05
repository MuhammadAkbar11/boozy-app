import React from "react";
import clsx from "classnames";

type Props = {
  variant?: "error" | "success";
  text: string;
};

function InputAlertLabel({ variant = "error", text }: Props) {
  const textColor = clsx({
    "text-red-500": variant === "error",
    "text-green-500": variant === "success",
  });

  return (
    <label className="label">
      <span className={`label-text-alt ${textColor}`}>{text}</span>
    </label>
  );
}

export default InputAlertLabel;
