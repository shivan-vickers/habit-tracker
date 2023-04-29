import { useField } from "remix-validated-form";

export type TextInputProps = {
  name: string;
  label: string;
  type: string;
  autoFocus?: boolean;
  autoComplete?: string;
};

export function TextInput({
  name,
  label,
  type,
  autoFocus,
  autoComplete,
}: TextInputProps) {
  const { error, getInputProps } = useField(name);

  return (
    <div className="w-full">
      <label htmlFor={name} className="hidden">
        {label}
      </label>
      <input
        className="w-full rounded border-sageDark-sage9 bg-sageDark-sage2 text-sm placeholder-sageDark-sage9 focus:border-tealDark-teal9 focus:ring-tealDark-teal9"
        name={name}
        placeholder={label}
        type={type}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={`${name}-error`}
        {...getInputProps({ id: name })}
      />
      {error ? (
        <span className="text-xs text-redDark-red11">{error}</span>
      ) : null}
    </div>
  );
}
