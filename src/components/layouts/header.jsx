import { Icons } from "@/assets/icons/icons";
import { Menu } from "./menu";
import { ToggleTheme } from "./toggle-theme";
import Link from "next/link";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="border-b backdrop-blur-xs border-dashed h-[85px] w-full flex items-center sticky top-0 z-[1000]">
      <div className="max-w-7xl w-full mx-auto flex justify-between items-center border-x border-dashed p-4">
        <Link href="/">
          <Icons.Logo className="w-26" />
        </Link>
        <div className="flex items-center gap-4">
          <Menu />
          <ToggleTheme />
          <div className="md:hidden">
            <SidebarTrigger />
          </div>
        </div>
      </div>
    </header>
  );
};
