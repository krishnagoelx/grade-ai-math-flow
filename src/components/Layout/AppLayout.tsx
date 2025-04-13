
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export const AppLayout = () => {
  return (
    <div className="app-container">
      <AppSidebar />
      <main className="p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};
