import { useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  type?: string;
}

const FormInput: React.FC<InputProps> = ({
  name,
  label,
  type = "text",
  ...restProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-4 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="rounded border border-gray-400 bg-transparent px-3 py-2 dark:bg-ourblack"
        {...register(name)}
        {...restProps}
      />
      {errors[name] && (
        <span className="block pt-1 text-xs text-red-500">
          {errors[name]?.message as unknown as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;
