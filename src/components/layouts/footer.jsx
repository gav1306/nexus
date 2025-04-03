"use client";
import { Icons } from "@/assets/icons/icons";
import { useTheme } from "next-themes";
import Link from "next/link";

export const Footer = () => {
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";
  return (
    <footer className="border-t border-dashed">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-6 border-x border-dashed">
        <div className="flex flex-col items-center gap-2">
          <span>&copy; 2025 Nexus, Inc.</span>
          <ul className="flex items-center gap-4">
            <li>
              <Link href="https://github.com/gav1306/nexus" target="_blank">
                {isDarkMode ? (
                  <Icons.Github width={22} height={22} />
                ) : (
                  <Icons.GithubDark width={22} height={22} />
                )}
              </Link>
            </li>
            <li>
              <Link href="https://x.com/dev_gav05" target="_blank">
                {isDarkMode ? (
                  <Icons.X width={22} height={22} />
                ) : (
                  <Icons.XDark width={22} height={22} />
                )}
              </Link>
            </li>
            <li>
              <Link href="https://gayatripatil.vercel.app/" target="_blank">
                {isDarkMode ? (
                  <Icons.Butterfly width={24} height={24} />
                ) : (
                  <Icons.ButterflyDark width={24} height={24} />
                )}
              </Link>
            </li>
          </ul>
        </div>
        <p>Made by Gav with ❤️</p>
      </div>
    </footer>
  );
};
