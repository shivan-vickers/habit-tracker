import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";

import type { ErrorMessage } from "~/components/ErrorContainer";
import { ErrorContainer } from "~/components/ErrorContainer";
import { Header } from "~/routes/_main/Header";

export default function Main() {
  return (
    <>
      <Header />
      <Outlet />
    </>
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
