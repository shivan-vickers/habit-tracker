import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import { requireUser } from "~/utils/session.server";

export async function loader({ request }: LoaderArgs) {
  const userWithPassword = await requireUser(request);

  const { passwordHash: _password, ...userWithoutPassword } = userWithPassword;

  // get habits and groups

  return json({ user: userWithoutPassword });
}

export default function Main() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>logged in as {data.user.username}</p>
      <Form action="/logout" method="post">
        <button type="submit">Logout</button>
      </Form>
    </div>
  );
}
