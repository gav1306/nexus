import { Icons } from "@/assets/icons";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [
  {
    title: "Crypto",
    url: "/crypto",
  },
  {
    title: "Weather",
    url: "/weather",
  },
  {
    title: "News",
    url: "/news",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <Icons.Logo className="w-26" />
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-2xl" asChild>
                    <Link href={item.url} className="p-6">
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
