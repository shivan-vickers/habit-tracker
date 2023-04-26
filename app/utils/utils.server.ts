import { json } from "@remix-run/node";
import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

import type { User, SafeUser } from "~/models/user.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This helper function helps us returning the accurate HTTP status,
 * 400 Bad Request, to the client.
 */
export const badRequest = <T>(data: T) => json<T>(data, { status: 400 });

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );
  return route?.data;
}

function isUser(user: any): user is User {
  return user && typeof user === "object" && typeof user.username === "string";
}

export function useOptionalUser(): SafeUser | undefined {
  const data = useMatchesData("root");

  if (!data || !isUser(data.user)) {
    return undefined;
  }

  const safeUser = { id: data.user.id, username: data.user.username };

  return safeUser;
}

export function useUser(): SafeUser {
  const maybeUser = useOptionalUser();

  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  }

  return maybeUser;
}
