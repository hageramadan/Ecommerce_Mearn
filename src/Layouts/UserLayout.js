import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar.js";

function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow px-4">
        <Outlet />
      </main>
    </div>
  );
}

export default UserLayout;
