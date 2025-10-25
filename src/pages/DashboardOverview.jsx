import { useNavigate, Link } from "react-router";
import { logoutUser } from "../utils/auth";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    resolved: 0,
  });

// Load user and tickets from sessionStorage/localStorage
useEffect(() => {
  const session = JSON.parse(sessionStorage.getItem("ticketapp_session"));
  if (!session) {
    navigate("/sign-in");
    return;
  }
  setUser(session);

  // Fetch tickets from localStorage
  const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];

  // Calculate stats
  const total = savedTickets.length;
  const open = savedTickets.filter((t) => t.status === "open").length;
  const resolved = savedTickets.filter((t) => t.status === "closed").length;

  setStats({ total, open, resolved });
}, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/sign-in");
  };

  // console.log(user);
  return (
    <section className="flex min-h-screen flex-col items-center bg-[#F3F2FF]">
      <div className="w-full max-w-[1440px] px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-3xl font-bold text-[#2D2A3E]">
            Welcome, {user?.name || "User"} 👋
          </h1>

          <button
            onClick={handleLogout}
            className="mt-4 rounded-lg bg-[#6C63FF] px-5 py-2 font-medium text-white transition-all hover:bg-[#4B47CC] md:mt-0"
          >
            Logout
          </button>
        </div>

        {/* Stats Section */}
        <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <p className="text-5xl font-bold text-[#6C63FF]">{stats.total}</p>
            <p className="mt-2 font-medium text-[#6B6780]">Total Tickets</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <p className="text-5xl font-bold text-green-500">{stats.open}</p>
            <p className="mt-2 font-medium text-[#6B6780]">Open Tickets</p>
          </div>

          <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-md">
            <p className="text-5xl font-bold text-gray-500">{stats.resolved}</p>
            <p className="mt-2 font-medium text-[#6B6780]">Resolved Tickets</p>
          </div>
        </div>

        {/* Navigation to Ticket Management */}
        <div className="flex justify-center">
          <Link
            to="tickets"
            className="rounded-lg bg-[#A594F9] px-8 py-3 font-semibold text-white shadow transition-all hover:bg-[#8E7AF5]"
          >
            Go to Ticket Management
          </Link>
        </div>
      </div>
    </section>
  );
}
