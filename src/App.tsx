import { Route, Routes } from "react-router";
import AdminLayout from "./layout/admin/AdminLayout";
import Dashboard from "./layout/admin/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />}/>
      </Route>
    </Routes>
  )
}
