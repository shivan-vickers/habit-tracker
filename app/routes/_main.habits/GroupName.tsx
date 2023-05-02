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
        className="w-full border-0 bg-sage-sage2 px-4 font-semibold leading-tight caret-sage-sage12 focus:ring-0 dark:bg-sageDark-sage2 dark:caret-sageDark-sage12"
        type="text"
        name="groupName"
        defaultValue={name}
        autoComplete="off"
      />
      <input type="hidden" name="intent" value="updateGroup" />
      <input type="hidden" name="groupId" value={id} />
      <input type="hidden" name="previousName" value={name} />
    </fetcher.Form>
  );
}
