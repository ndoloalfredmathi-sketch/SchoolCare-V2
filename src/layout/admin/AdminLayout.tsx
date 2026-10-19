import { Outlet } from "react-router";

export default function AdminLayout() {
  return <>
    <aside>Sidebar</aside>

    <main>
      <Outlet />
    </main>
  </>
}
