"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavLink } from "react-router"
import {
  CalendarDays,
  ChevronRight,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  School,
  Settings,
  UserRound,
  Users,
  VerifiedIcon
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useState, type PropsWithChildren } from "react"
import { cn } from "cn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  {
    title: "Tableau de bord",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Élèves",
    url: "/students",
    icon: Users,
  },
  {
    title: "Classes",
    url: "/classes",
    icon: School,
  },
  {
    title: "Inscriptions",
    url: "/enrollments",
    icon: ClipboardList,
  },
  {
    title: "Années scolaires",
    url: "/school-years",
    icon: CalendarDays,
  },
];

export function AppSidebar({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <SidebarProvider>

      <Sidebar collapsible="icon">
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
          <SidebarGroup>
            <SidebarGroupLabel>Général</SidebarGroupLabel>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton render={
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                          : ""
                      }
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  }>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
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
                  <div className="flex items-center justify-center mr-1">
                    <div className="relative w-fit">
                      <Avatar size={"sm"} className="ring-offset-background ring-1 ring-primary ring-offset-2 dark:ring-teal-400">
                        <AvatarImage
                          src="https://images.shadcnspace.com/assets/profiles/user-2.jpg"
                          alt="border avatar"
                        />
                        <AvatarFallback className="text-xs">AN</AvatarFallback>
                      </Avatar>
                      <span className="absolute -right-1 -bottom-1 flex size-3 items-center justify-center rounded-full bg-background">
                        <VerifiedIcon className="size-full fill-primary text-white" />
                      </span>
                    </div>
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

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
