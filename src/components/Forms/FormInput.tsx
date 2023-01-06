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
      <label className="text-white" htmlFor={name}>
        {label}
      </label>
      <input
        type={type}
        className="rounded border border-gray-400 bg-ourblack px-3 py-2"
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
