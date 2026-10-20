
import { BellDot, Sun, Search, User, Command } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  return (
    <header className="flex w-full items-center justify-between gap-3 border-b border-sidebar-border bg-sidebar p-1 md:p-2">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger />
      </div>

      <InputGroup className="max-w-md border border-sidebar-border rounded-md">
        <InputGroupInput className="rounded-sm" placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align={"inline-end"}>
            <Command />K
        </InputGroupAddon>
      </InputGroup>

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
