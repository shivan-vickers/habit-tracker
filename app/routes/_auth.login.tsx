import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { getUserByUsername, verifyLogin } from "~/models/user.server";
import { SubmitButton } from "~/routes/_auth/SubmitButton";
import { TextInput } from "~/routes/_auth/TextInput";
import { createUserSession, getUserId } from "~/utils/session.server";
import { safeRedirect } from "~/utils/utils";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  remember: z.literal("on").optional(),
  redirectTo: z.string().optional(),
});

const clientValidator = withZod(schema);

export const meta: V2_MetaFunction = () => [{ title: "Login" }];

export async function loader({ request }: LoaderArgs) {
  const userId = await getUserId(request);
  if (userId) return redirect("/habits");
  return null;
}

export async function action({ request }: ActionArgs) {
  const serverValidator = withZod(
    schema.refine(
      async (data) => {
        return await verifyLogin(data.username, data.password);
      },
      { message: "Invalid username or password.", path: ["password"] }
    )
  );

  const formData = await serverValidator.validate(await request.formData());

  if (formData.error) {
    return validationError(formData.error);
  }

  const user = await getUserByUsername(formData.data.username);

  if (!user) {
    throw new Error("zod validation error");
  }

  const redirectTo = safeRedirect(formData.data.redirectTo, "/habits");

  return createUserSession({
    request,
    userId: user.id,
    remember: formData.data.remember === "on" ? true : false,
    redirectTo,
  });
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/habits";

  return (
    <>
      <h1 className="text-center text-2xl">Welcome back!</h1>
      <ValidatedForm
        className="w-full space-y-2"
        validator={clientValidator}
        method="post"
      >
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <TextInput
          name="username"
          label="Username"
          type="text"
          autoComplete="username"
        />
        <TextInput
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        <div className="flex flex-row items-center space-x-2 text-sm">
          <input
            className="rounded bg-sage-sage2 text-teal-teal9 checked:bg-teal-teal9 focus:ring-teal-teal9 dark:bg-sageDark-sage2 dark:text-tealDark-teal9 dark:checked:bg-tealDark-teal9 dark:focus:ring-tealDark-teal9"
            id="remember"
            name="remember"
            type="checkbox"
          />
          <label htmlFor="remember">Remember me</label>
        </div>
        <SubmitButton label="Log in" pendingLabel="Logging in..." />
      </ValidatedForm>
      <div className="w-full text-center">
        <span>Don't have an account? </span>
        <Link
          className="font-medium text-teal-teal9 dark:text-tealDark-teal9"
          to={{ pathname: "/signup", search: searchParams.toString() }}
        >
          Sign up
        </Link>
      </div>
    </>
  );
}
