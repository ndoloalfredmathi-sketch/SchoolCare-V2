
import { BellDot, Sun, User } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar p-1 md:p-2">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger />
        <span>Gestion d'établissement</span>
      </div>


      <div className="flex shrink-0 items-center gap-1">
        <Button variant="ghost" size="icon" aria-label="Changer le thème">
          <Sun className="size-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Notifications">
          <BellDot className="size-5" />
        </Button>

        <Button variant="ghost" size="icon" aria-label="Mon compte">
          <User className="size-5" />
        </Button>
      </div>
    </header>
  );
}
