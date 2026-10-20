"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { sidebarSections } from "@/navigation/admin-sidebar"
import { NavLink, useLocation } from "react-router"
import {
  ChevronRight,
  GraduationCap,
  LogOut,
  Settings,
  UserRound
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu"
import { useState } from "react"
import { cn } from "cn"

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              tooltip="SchoolCare"
              render={<NavLink to="/" end />}
              className="cursor-pointer"
            >
              <div className="flex aspect-square size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="size-5" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold">
                  SchoolCare
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Gestion scolaire
                </span>
                
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {sidebarSections.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarMenu>
              {section.items.map((item) => {
                const Icon = item.icon
                const isActive = item.path === "/"
                  ? pathname === "/"
                  : pathname === item.path || pathname.startsWith(`${item.path}/`)

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      isActive={isActive}
                      tooltip={item.label}
                      render={<NavLink to={item.path} end={item.path === "/"} />}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
                  />
                }
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <span className="font-bold text-primary-foreground">
                    AN
                  </span>
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate text-xs font-semibold">
                    Alfred Mathi NDOLO
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    ndoloalfredmathi@gmail.com
                  </span>
                </div>

                <ChevronRight
                  className={cn(
                    "ml-auto size-4 transition-transform duration-200",
                    open ? "rotate-90" : "rotate-0"
                  )}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                side="right"
                align="end"
                className="w-56"
              >
                <DropdownMenuItem
                  onClick={() => {
                    // TODO : ouvrir la page de profil
                  }}
                >
                  <UserRound className="mr-2 size-4" />
                  Mon profil
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => {
                    // TODO : ouvrir les paramètres
                  }}
                >
                  <Settings className="mr-2 size-4" />
                  Paramètres
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    // TODO : exécuter la déconnexion
                  }}
                >
                  <LogOut className="mr-2 size-4" />
                  Déconnexion
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar >
  )
}
