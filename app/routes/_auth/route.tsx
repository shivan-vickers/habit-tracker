import { Outlet } from "@remix-run/react";
import { Logo } from "~/components/Logo";

export default function Auth() {
  return (
    <>
      <div className="absolute left-6 top-3">
        <Logo size="md" />
      </div>
      <div className="flex max-h-fit min-h-screen w-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-teal-teal4 from-5% to-sage-sage2 to-40% dark:from-tealDark-teal2 dark:from-5% dark:to-sageDark-sage2 dark:to-40%">
        <div className="relative flex h-fit w-80 flex-col items-center gap-4 rounded-md border-2 border-sage-sage6 bg-sage-sage1 px-8 py-6 shadow-md shadow-blackA-blackA10 dark:border-sageDark-sage6 dark:bg-sageDark-sage2">
          <Outlet />
        </div>
      </div>
    </>
  );
}
