import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
} from "@remix-run/react";

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
      <body className="h-full min-w-fit max-w-full bg-sage-sage2 text-sage-sage12 dark:bg-sageDark-sage1 dark:text-sageDark-sage12">
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
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <div>
          <h1>
            {error.status} {error.statusText}
          </h1>
          <p>{error.data}</p>
        </div>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document>
        <div>
          <h1>Error</h1>
          <p>{error.message}</p>
          <p>The stack trace is:</p>
          <pre>{error.stack}</pre>
        </div>
      </Document>
    );
  } else {
    return (
      <Document>
        <h1>Unknown Error</h1>
      </Document>
    );
  }
}
