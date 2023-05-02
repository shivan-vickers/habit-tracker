import { Form, NavLink, Link } from "@remix-run/react";
import * as Avatar from "@radix-ui/react-avatar";
import * as Popover from "@radix-ui/react-popover";

import { useOptionalUser } from "~/utils/utils";
import { LogOutIcon } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  const user = useOptionalUser();

  const dicebearAvatar = `https://api.dicebear.com/6.x/notionists-neutral/svg?seed=${user?.username}&backgroundColor=10b3a3&radius=50`;

  return (
    <div className="fixed top-0 flex h-16 w-full flex-row items-center justify-between bg-sage-sage2 px-6 shadow-md shadow-blackA-blackA8 dark:bg-sageDark-sage2">
      <Logo size="md" />
      <div className="flex flex-row items-center gap-6">
        <nav className="flex flex-row gap-6">
          <NavLink
            className={({ isActive, isPending }) =>
              isPending
                ? "border-spacing-1 border-b-2 border-teal-teal6 dark:border-tealDark-teal6"
                : isActive
                ? "border-spacing-1 border-b-2 border-teal-teal8 dark:border-tealDark-teal8"
                : ""
            }
            to="habits"
          >
            Habits
          </NavLink>
          <Link
            to="https://github.com/shivan-vickers/habit-tracker"
            reloadDocument
          >
            GitHub
          </Link>
        </nav>
        <Popover.Root>
          <Popover.Trigger asChild>
            <Avatar.Root className="h-12 w-12 overflow-hidden rounded-full p-1 hover:bg-sage-sage6 dark:hover:bg-sageDark-sage6">
              <Avatar.AvatarImage src={dicebearAvatar} alt={user?.username} />
              <Avatar.Fallback className="flex h-12 w-12 items-center justify-center bg-teal-teal9 dark:bg-tealDark-teal9">
                <p>{user ? user.username.at(0)?.toUpperCase() : "User"}</p>
              </Avatar.Fallback>
            </Avatar.Root>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              className="mr-4 h-44 w-72 rounded-2xl bg-sage-sage4 pt-2 shadow-lg shadow-blackA-blackA8 dark:bg-sageDark-sage5"
              sideOffset={20}
            >
              <div className="mx-auto mb-[2px] flex w-[17rem] flex-row items-center rounded-xl bg-sage-sage8 dark:bg-sageDark-sage1">
                <Avatar.Root className="m-2 h-20 w-20 overflow-hidden rounded-full p-1">
                  <Avatar.AvatarImage
                    src={dicebearAvatar}
                    alt={user?.username}
                  />
                  <Avatar.Fallback>
                    {user ? user.username.at(0)?.toUpperCase() : "User"}
                  </Avatar.Fallback>
                </Avatar.Root>
                <p className=" ml-2 font-semibold">{user?.username}</p>
              </div>
              <Form action="/logout" method="post">
                <button
                  className="flex w-full flex-row items-center overflow-hidden border-b border-sage-sage8 hover:bg-sage-sage6 dark:border-sageDark-sage8 dark:hover:bg-sageDark-sage6"
                  type="submit"
                >
                  <LogOutIcon className="mx-4 my-2 h-6 w-20" />
                  <p className="font-semibold">Sign out</p>
                </button>
              </Form>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  );
}
