import { FC, HTMLInputTypeAttribute } from "react";

type FormFieldProps = {
  label: string;
  type: HTMLInputTypeAttribute; // e.g., 'text' | 'email' | 'password'
  name: string;
  required?: boolean;
  isSignUp?: boolean;
};

export const FormField: FC<FormFieldProps> = ({
  label,
  type,
  name,
  required = true,
  isSignUp = false,
}) => (
  <div>
    <div
      className={`${
        !isSignUp && type === "password"
          ? "flex items-center justify-between"
          : ""
      }`}
    >
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-900"
      >
        {label}
      </label>
      {type === "password" && !isSignUp && (
        <div className="text-sm">
          <a
            href="#"
            className="font-semibold text-mint-500 hover:text-mint-300"
          >
            Forgot password?
          </a>
        </div>
      )}
    </div>
    <div className="mt-2">
      <input
        type={type}
        name={name}
        id={name}
        required={required}
        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-mint-500 sm:text-sm/6"
      />
    </div>
  </div>
);
