import Button from "../Elements/Button";
import Spinner from "../Elements/Spinner";

type LoadingButtonProps = {
  loading: boolean;
  btnColor?: string;
  textColor?: string;
  children: React.ReactNode;
};

export const FormButton: React.FC<LoadingButtonProps> = ({
  children,
  loading = false,
}) => {
  return (
    <Button
      type="submit"
      isLoading={loading}
      className="w-full px-4 py-2 text-base leading-none"
    >
      <span>{children}</span>
    </Button>
  );
};
