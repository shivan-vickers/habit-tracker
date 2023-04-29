import { useFetcher } from "@remix-run/react";

export type HabitListItemProps = {
  id: number;
  content: string;
};

export function HabitListItem({ id, content }: HabitListItemProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" onBlur={(e) => fetcher.submit(e.currentTarget)}>
      <input
        className="w-full border-0 bg-sageDark-sage2 caret-sageDark-sage12 focus:ring-0"
        type="text"
        name="content"
        defaultValue={content}
        autoComplete="off"
      />
      <input type="hidden" name="intent" value="update" />
      <input type="hidden" name="habitId" value={id} />
      <input type="hidden" name="previousContent" value={content} />
    </fetcher.Form>
  );
}
