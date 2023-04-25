import {
  Form,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import { Sidebar } from "~/components/Sidebar";

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
  let error = useRouteError;

  function errorContainer(heading?: any, content?: any) {
    return (
      <div className="m-12 border border-redDark-red6 bg-redDark-red2 p-4 text-redDark-red9">
        {heading ? <h1 className="text-lg font-semibold">{heading}</h1> : null}
        {content ? <pre>{content}</pre> : null}
      </div>
    );
  }

  if (isRouteErrorResponse(error)) {
    return errorContainer(`${error.status} ${error.statusText}`, error.data);
  } else if (error instanceof Error) {
    return errorContainer(error.message, error.stack);
  } else {
    return errorContainer(
      "Unknown Error",
      "I actually have no idea what happened here. Sorry!"
    );
  }
}
