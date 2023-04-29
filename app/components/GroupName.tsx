import { useFetcher } from "@remix-run/react";

export type GroupNameProps = {
  id: string;
  name: string;
};

export function GroupName({ id, name }: GroupNameProps) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post" onBlur={(e) => fetcher.submit(e.currentTarget)}>
      <input
        className="w-full border-0 bg-sageDark-sage2 px-4 font-semibold leading-tight caret-sageDark-sage12 focus:ring-0"
        type="text"
        name="content"
        defaultValue={name}
        autoComplete="off"
      />
      <input type="hidden" name="intent" value="update" />
      <input type="hidden" name="groupId" value={id} />
      <input type="hidden" name="previousContent" value={name} />
    </fetcher.Form>
  );
}