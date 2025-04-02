import { Icons } from "@/assets/icons/icons";
import { Menu } from "./menu";
import { ToggleTheme } from "./toggle-theme";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="border-b border-dashed bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Icons.Logo className="w-32" />
        </Link>
        <div className="flex items-center gap-4">
          <Menu />
          <ToggleTheme />
        </div>
      </div>
    </header>
  );
};
