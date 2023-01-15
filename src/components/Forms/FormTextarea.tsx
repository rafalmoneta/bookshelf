import { useFormContext } from "react-hook-form";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
}

const FormTextarea: React.FC<TextareaProps> = ({
  name,
  label,
  ...restProps
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mt-4 flex flex-col">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="min-h-[300px] resize-y whitespace-pre-wrap rounded border border-gray-400 bg-transparent px-3 py-2 dark:bg-ourblack"
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

export default FormTextarea;
