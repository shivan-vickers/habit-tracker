import { useFetcher } from "@remix-run/react";
import { PlusIcon } from "lucide-react";
import { useEffect, useRef } from "react";

export type NewListItemProps = {
  groupId: string;
};

export function NewListItem({ groupId }: NewListItemProps) {
  const fetcher = useFetcher();
  const ref = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (fetcher.state === "idle") {
      ref.current?.reset();
    }
  }, [fetcher]);

  return (
    <fetcher.Form
      className="flex flex-row items-center px-2"
      method="post"
      ref={ref}
      onBlur={(e) => fetcher.submit(e.currentTarget)}
    >
      <PlusIcon
        className="w-6 text-sage-sage11 dark:text-sageDark-sage11"
        size={18}
      />
      <input
        className="w-full border-0 bg-sage-sage2 placeholder-sage-sage9 caret-sage-sage12 focus:ring-0 dark:bg-sageDark-sage2 dark:placeholder-sageDark-sage9 dark:caret-sageDark-sage12"
        type="text"
        name="content"
        placeholder="New habit"
        autoComplete="off"
      />
      <input type="hidden" name="intent" value="create" />
      <input type="hidden" name="groupId" value={groupId} />
    </fetcher.Form>
  );
}
