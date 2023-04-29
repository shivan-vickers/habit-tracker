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
      <PlusIcon className="w-6 text-sageDark-sage11" size={18} />
      <input
        className="w-full border-0 bg-sageDark-sage2 placeholder-sageDark-sage9 caret-sageDark-sage12 focus:ring-0"
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
