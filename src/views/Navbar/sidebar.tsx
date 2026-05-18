"use client";

import Link from "next/link";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import {
  IconBrandTabler,
  IconUserBolt,
  IconArrowLeft,
} from "@tabler/icons-react";

import { PanelLeftClose } from "lucide-react";

import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfile } from "@/hooks/useProfile";

export default function AppSidebar() {
  const { role, isVerified, token } = useAuthStore();

  const { profile } = useProfile();

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.replace("/Login/tenant");
      return;
    }

    if (!isVerified) {
      router.replace("/verify-email");
      return;
    }

    if (role !== "TENANT") {
      router.replace("/");
      return;
    }
  }, [token, role, isVerified, router]);

  if (!token || !isVerified || role !== "TENANT") {
    return null;
  }

  const links = [
    {
      label: "Dashboard",
      href: "/tenant/properties",
      icon: <IconBrandTabler className="h-5 w-5" />,
    },
    {
      label: "Profile",
      href: "/Profile",
      icon: <IconUserBolt className="h-5 w-5" />,
    },
    {
      label: "Home",
      href: "/",
      icon: <IconArrowLeft className="h-5 w-5" />,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>

        {/* HEADER */}
        <div className="flex items-center justify-between p-4">
          <h1 className="truncate text-lg font-semibold">
            Property App
          </h1>

          <SidebarTrigger>
            <PanelLeftClose className="h-5 w-5" />
          </SidebarTrigger>
        </div>

        <div className="group-data-[collapsible=icon]:hidden px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border shrink-0">
              <Image
                src={
                  profile?.profileImage ||
                  "https://ui-avatars.com/api/?name=User"
                }
                alt="profile"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold">
                {profile?.name || "Loading..."}
              </span>

              <span className="truncate text-xs text-muted-foreground">
                {profile?.email}
              </span>
            </div>
          </div>
        </div>


        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link, idx) => (
                <SidebarMenuItem key={idx}>
                  <SidebarMenuButton asChild tooltip={link.label}>
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
  );
}