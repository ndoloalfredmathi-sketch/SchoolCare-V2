import { Route, Routes } from "react-router";
import AdminLayout from "./layout/admin/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />}/>
        <Route path="/students" element={<Students/>}/>
      </Route>
    </Routes>
  )
}
