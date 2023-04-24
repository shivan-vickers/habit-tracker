import { redirect } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";

import { requireUserId } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  return redirect("/habits");
}

// TODO: Default export currently is never seen
// remove this or change the loader function and turn this into a landing page
export default function Index() {
  return (
    <div className="grid h-screen place-items-center bg-mauve-mauve1 dark:bg-mauveDark-mauve1 ">
      <h1 className="font-mono text-3xl text-mauve-mauve12 underline dark:text-mauveDark-mauve12">
        Welcome to Remix
      </h1>
    </div>
  );
}
