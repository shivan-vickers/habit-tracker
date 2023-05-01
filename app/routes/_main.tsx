import {
  Form,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import type { ErrorMessage } from "~/components/ErrorContainer";
import { ErrorContainer } from "~/components/ErrorContainer";

export default function Main() {
  return (
    <div>
      <p>logged in</p>
      <Form action="/logout" method="post">
        <button type="submit">Logout</button>
      </Form>
      <Sidebar />
      <Outlet />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  let { heading, content }: ErrorMessage = {
    heading: "Unknown Error",
    content: "I actually have no idea what happened here. Sorry!",
  };

  if (isRouteErrorResponse(error)) {
    heading = ` ${error.status} ${error.statusText}`;
    content = error.data;
  } else if (error instanceof Error) {
    heading = error.message;
    content = error.stack;
  }

  return <ErrorContainer heading={heading} content={content} />;
}
