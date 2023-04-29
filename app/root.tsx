import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import type { ErrorMessage } from "./components/ErrorContainer";
import { ErrorContainer } from "./components/ErrorContainer";
import stylesheet from "~/styles/tailwind.css";
import { getUser } from "./utils/session.server";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesheet }];
};

export async function loader({ request }: LoaderArgs) {
  return json({ user: await getUser(request) });
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full min-w-fit max-w-full bg-sage-sage2 text-sage-sage12 dark:bg-sageDark-sage2 dark:text-sageDark-sage12">
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
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
