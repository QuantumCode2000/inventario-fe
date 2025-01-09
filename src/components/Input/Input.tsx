interface InputProps {
  id: string | number; // Permite tanto string como número
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  error?: boolean | string;
  helperText?: string;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  helperText = "",
  ...props
}) => {
  const hasError = !!error; // Convierte cualquier valor truthy en un booleano
  const stringId = String(id); // Convertir `id` a string para evitar el error

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={stringId} // Asegurar que `htmlFor` siempre reciba un string
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
      )}
      <input
        type={type}
        id={stringId} // Asegurar que `id` siempre reciba un string
        aria-describedby={`${stringId}-helper-text`}
        className={`bg-gray-50 border ${
          hasError ? "border-red-500" : "border-gray-300"
        } text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
      {helperText && (
        <p
          id={`${stringId}-helper-text`}
          className="mt-1 text-sm text-gray-500"
        >
          {helperText}
        </p>
      )}
      {hasError && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
