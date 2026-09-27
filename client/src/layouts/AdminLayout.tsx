import { Outlet } from "react-router-dom";

// TODO(DEV5): sidebar nav for admin sections (Users, Listings, Reports, Categories)
const AdminLayout = () => (
  <div className="admin-layout">
    <aside>Admin sidebar</aside>
    <main>
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;
