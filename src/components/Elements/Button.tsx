import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import { SpinnerIcon } from "./Icons";

export type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  responsive?: boolean;
  isLoading?: boolean;
  loadingChildren?: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

const buttonClasses = ({
  responsive,
  variant = "primary",
  disabled,
  isLoading,
  className,
}: ButtonProps) => {
  return twMerge(
    "inline-flex items-center justify-center transition-colors rounded focus-ring",
    responsive
      ? "px-3 h-8 text-xs sm:px-4 sm:text-sm sm:h-button"
      : "px-4 text-sm h-button",
    variant === "primary" && "bg-primary",
    variant === "secondary" && "border text-primary border-ourborder p-2",
    (disabled || isLoading) && "opacity-50 cursor-default",
    className
  );
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      responsive,
      type = "button",
      isLoading = false,
      loadingChildren,
      disabled,
      children,
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <button
        {...rest}
        ref={forwardedRef}
        type={type}
        disabled={disabled || isLoading}
        className={buttonClasses({
          className,
          disabled,
          variant,
          responsive,
          isLoading,
        })}
      >
        {isLoading && (
          <SpinnerIcon className="mr-2 -ml-1 h-4 w-4 animate-spin" />
        )}
        {isLoading && loadingChildren ? loadingChildren : children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
