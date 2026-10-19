import { Home, Users, type LucideIcon } from "lucide-react"

export type SidebarItem = {
  label: string
  path: string
  icon: LucideIcon
}

export type SidebarSection = {
  label: string
  items: SidebarItem[]
}

export const sidebarSections: SidebarSection[] = [
  {
    label: "Général",
    items: [
      {
        icon: Home,
        label: "Tableau de bord",
        path: "/",
      },
      {
        icon: Users,
        label: "Gestion des élèves",
        path: "/students"
      }
    ],
  },
]
