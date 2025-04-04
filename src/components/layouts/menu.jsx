"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";

export function Menu() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/crypto" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              data-active={pathname.startsWith("/crypto")}
            >
              Crypto
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/weather" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              data-active={pathname.startsWith("/weather")}
            >
              Weather
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              data-active={pathname.startsWith("/news")}
            >
              News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
