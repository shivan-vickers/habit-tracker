import { NavLink } from "@remix-run/react";

export function Sidebar() {
  return (
    <nav>
      <NavLink to="habits">Habits</NavLink>
    </nav>
  );
}
