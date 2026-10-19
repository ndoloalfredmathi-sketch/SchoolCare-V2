import { AppSidebar } from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="p-2">
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  )
}
