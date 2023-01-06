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
    <Button type="submit">
      {loading ? (
        <div className="flex items-center justify-center gap-3">
          <Spinner color="fill-black" />
          <span>Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};
