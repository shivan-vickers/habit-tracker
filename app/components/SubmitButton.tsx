import { useIsSubmitting } from "remix-validated-form";

export type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
};

export function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const isSubmitting = useIsSubmitting();

  return (
    <button
      className="h-9 w-full rounded border-2 border-tealDark-teal7 bg-tealDark-teal3 font-semibold text-tealDark-teal11 hover:bg-tealDark-teal4 hover:text-tealDark-teal8 active:bg-tealDark-teal5"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? `${pendingLabel}` : `${label}`}
    </button>
  );
}
