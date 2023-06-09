import type { ActionArgs, LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Link, useSearchParams } from "@remix-run/react";
import { ValidatedForm, validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";
import { z } from "zod";

import { createUser, getUserByUsername } from "~/models/user.server";
import { SubmitButton } from "~/routes/_auth/SubmitButton";
import { TextInput } from "~/routes/_auth/TextInput";
import { createUserSession, getUserId } from "~/utils/session.server";
import { safeRedirect } from "~/utils/utils";

const schema = z
  .object({
    username: z
      .string()
      .min(1, { message: "Username must be at least 3 characters" }),
    password: z.string().min(5, {
      message: "Password must be at least 5 characters",
    }),
    passwordConfirm: z.string(),
    redirectTo: z.string().optional(),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords must match",
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
        const usernameTaken = await getUserByUsername(data.username);
        return usernameTaken ? false : true;
      },
      { message: "Sorry, that username is taken.", path: ["username"] }
    )
  );

  const formData = await serverValidator.validate(await request.formData());

  if (formData.error) {
    return validationError(formData.error);
  }

  const redirectTo = safeRedirect(formData.data.redirectTo, "/habits");

  const user = await createUser(formData.data.username, formData.data.password);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
}

export default function Login() {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/habits";

  return (
    <>
      <h1 className="text-center text-2xl">Create an account</h1>
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
        <TextInput
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
        />
        <SubmitButton
          label="Create account"
          pendingLabel="Creating account..."
        />
      </ValidatedForm>
      <div className="w-full text-center">
        <span>Already have an account? </span>
        <Link
          className="font-medium text-teal-teal9 dark:text-tealDark-teal9"
          to={{ pathname: "/login", search: searchParams.toString() }}
        >
          Log in
        </Link>
      </div>
    </>
  );
}
