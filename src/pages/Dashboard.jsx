import { Outlet } from "react-router";
import Footer from "../components/Footer";

function Dashboard() {
  return (
    <div>
      <div className="h-screen w-full overflow-hidden">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
