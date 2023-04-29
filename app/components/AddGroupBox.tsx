import clsx from "clsx";

export type AddGroupBoxProps = {
  className?: string;
};

export function AddGroupBox({ className }: AddGroupBoxProps) {
  return (
    <div
      className={clsx(
        "rounded border border-sage-sage8 dark:border-sageDark-sage8",
        className
      )}
    >
      <p>Create a new list...</p>
    </div>
  );
}
