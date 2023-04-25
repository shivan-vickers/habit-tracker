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
  let error = useRouteError();

  function errorContainer(heading?: any, content?: any) {
    return (
      <Document>
        <div className="m-12 border border-redDark-red6 bg-redDark-red2 p-4 text-redDark-red9">
          {heading ? (
            <h1 className="text-lg font-semibold">{heading}</h1>
          ) : null}
          {content ? <pre>{content}</pre> : null}
        </div>
      </Document>
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
