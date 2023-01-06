import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const FormFileUploader = ({ name, label }: { name: string; label: string }) => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={""}
      control={control}
      render={({ field: { name } }) => (
        <div className="mt-4 flex flex-col">
          <label className="text-white" htmlFor={name}>
            {label}
          </label>
          <input
            className="rounded border border-gray-400 bg-ourblack px-3 py-2"
            type="file"
            multiple={false}
            accept="image/jpg, image/png, image/jpeg"
            {...register(name)}
          />
          {/* <Spinner color="text-yellow-400" /> */}
          {errors[name] && (
            <span className="block pt-1 text-xs text-red-500">
              {errors[name]?.message as unknown as string}
            </span>
          )}
        </div>
      )}
    />
  );
};

export default FormFileUploader;
