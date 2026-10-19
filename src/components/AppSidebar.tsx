"use client"

import * as React from "react"

import {
  Sidebar,
  SidebarContent,
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

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <div className="size-8 bg-primary rounded">
                <label className="flex items-center justify-center text-white h-full font-bold">SC</label>
              </div>
              SchoolCare
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
      <SidebarRail />
    </Sidebar>
  )
}
