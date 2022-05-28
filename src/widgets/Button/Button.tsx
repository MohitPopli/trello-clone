import * as React from "react";
import "./Button.css";

type ButtonProps = {
  customClass?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({
  customClass,
  children,
  ...rest
}) => {
  return (
    <button className={`btn ${customClass}`} {...rest}>
      {children}
    </button>
  );
};

export { Button };
