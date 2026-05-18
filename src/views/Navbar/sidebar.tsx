"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

import {
  IconBrandTabler,
  IconUserBolt,
  IconArrowLeft,
} from "@tabler/icons-react";

import { useAuthStore } from "@/stores/auth.store";

export default function AppSidebar() {
  const { role, isVerified } = useAuthStore();

  const links = [
    ...(isVerified && role === "TENANT"
      ? [
          {
            label: "Dashboard",
            href: "/tenant/properties",
            icon: <IconBrandTabler className="h-5 w-5" />,
          },
        ]
      : []),

    ...(isVerified
      ? [
          {
            label: "Profile",
            href: "/Profile",
            icon: <IconUserBolt className="h-5 w-5" />,
          },
        ]
      : []),

    {
      label: "Home",
      href: "/",
      icon: <IconArrowLeft className="h-5 w-5" />,
    },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>

          {/* LOGO */}
          <div className="p-4 font-semibold text-lg">
            Property App
          </div>

          {/* MENU */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                {links.map((link, idx) => (
                  <SidebarMenuItem key={idx}>
                    <SidebarMenuButton asChild>
                      <Link href={link.href}>
                        {link.icon}
                        <span>{link.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}