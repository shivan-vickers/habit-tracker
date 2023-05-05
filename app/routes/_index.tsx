import {
  type LoaderArgs,
  type V2_MetaFunction,
  redirect,
} from "@remix-run/node";

import { requireUserId } from "~/utils/session.server";

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader({ request }: LoaderArgs) {
  await requireUserId(request);

  return redirect("/habits");
}
