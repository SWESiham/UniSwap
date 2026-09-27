import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => (
  <button className={`btn btn-${variant} ${className ?? ""}`} {...props} />
);

export default Button;
