import { useFetcher } from "@remix-run/react";
import clsx from "clsx";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export type AddGroupBoxProps = {
  className?: string;
  userId: string;
};

export function AddGroupBox({ className, userId }: AddGroupBoxProps) {
  const fetcher = useFetcher();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "submitting") {
      ref.current?.reset();
    }
  }, [fetcher]);

  return (
    <fetcher.Form
      className={clsx(
        "flex justify-between rounded-lg border border-sage-sage8 dark:border-sageDark-sage8",
        className
      )}
      method="post"
      ref={ref}
    >
      <input type="hidden" name="intent" value="createGroup" />
      <input type="hidden" name="userId" value={userId} />
      <input
        className="w-full border-0 bg-sage-sage2 placeholder-sage-sage9 caret-sage-sage12 focus:ring-0 dark:bg-sageDark-sage2 dark:placeholder-sage-sage9 dark:caret-sageDark-sage12"
        type="text"
        name="groupName"
        placeholder="Create a new list..."
        autoComplete="off"
      />
      <button className="mr-3" type="submit">
        <PlusIcon
          className="h-6 w-6 text-sage-sage11 dark:text-sageDark-sage11"
          size={24}
        />
      </button>
    </fetcher.Form>
  );
}
