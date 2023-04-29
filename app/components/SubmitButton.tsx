import { useIsSubmitting } from "remix-validated-form";

export type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
};

export function SubmitButton({ label, pendingLabel }: SubmitButtonProps) {
  const isSubmitting = useIsSubmitting();

  return (
    <button
      className="h-9 w-full rounded border-2 border-teal-teal7 bg-teal-teal3 font-semibold text-teal-teal11 hover:border-teal-teal8 hover:bg-teal-teal4 active:bg-teal-teal5 dark:border-tealDark-teal7 dark:bg-tealDark-teal3 dark:text-tealDark-teal11 dark:hover:border-tealDark-teal8 dark:hover:bg-tealDark-teal4 dark:active:bg-tealDark-teal5"
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting ? `${pendingLabel}` : `${label}`}
    </button>
  );
}
