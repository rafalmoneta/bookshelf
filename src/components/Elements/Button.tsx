import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: string;
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button" | undefined;
}

interface ButtonVariantsType {
  [key: string]: string;
}

const buttonVariants: ButtonVariantsType = {
  primary: "bg-primary text-base",
  // secondary: "bg-gray text-white",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  ...restProps
}) => {
  return (
    <button
      className={twMerge(
        "w-full rounded border-none px-4 py-2 leading-none",
        buttonVariants[variant]
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
