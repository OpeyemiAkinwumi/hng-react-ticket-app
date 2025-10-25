import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Toast from "../components/Toast";

export default function Tickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", status: "open" });
  const [editingTicket, setEditingTicket] = useState(null);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // ✅ Load session & tickets
  useEffect(() => {
    const session = JSON.parse(sessionStorage.getItem("ticketapp_session"));
    if (!session) {
      navigate("/login");
      return;
    }

    const savedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
    setTickets(savedTickets);
  }, [navigate]);

  // ✅ Toast handler
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2500);
  };

  // ✅ Validate fields
  const validateForm = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!["open", "in_progress", "closed"].includes(form.status))
      newErrors.status = "Status must be open, in_progress, or closed";
    return newErrors;
  };

  // ✅ Create or Update Ticket
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    let updatedTickets;

    if (editingTicket) {
      // Edit existing ticket
      updatedTickets = tickets.map((t) =>
        t.id === editingTicket.id ? { ...t, ...form } : t
      );
      showToast("Ticket updated successfully!", "success");
    } else {
      // Create new ticket
      const newTicket = {
        id: Date.now(),
        title: form.title,
        description: form.description,
        status: form.status,
      };
      updatedTickets = [...tickets, newTicket];
      showToast("Ticket created successfully!", "success");
    }

    setTickets(updatedTickets);
    localStorage.setItem("tickets", JSON.stringify(updatedTickets));
    setForm({ title: "", description: "", status: "open" });
    setEditingTicket(null);
  };

  // ✅ Edit ticket
  const handleEdit = (ticket) => {
    setForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
    });
    setEditingTicket(ticket);
  };

  // ✅ Delete ticket
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      const updated = tickets.filter((t) => t.id !== id);
      setTickets(updated);
      localStorage.setItem("tickets", JSON.stringify(updated));
      showToast("Ticket deleted successfully", "success");
    }
  };

  // ✅ Status color helper
  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "bg-green-100 text-green-600";
      case "in_progress":
        return "bg-amber-100 text-amber-600";
      case "closed":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <section className="min-h-screen bg-[#F3F2FF] py-10">
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <div className="mx-auto w-full max-w-[1440px] px-6">
        {/* Header */}
        <div className="mb-10 flex flex-col items-center justify-between md:flex-row">
          <h1 className="text-3xl font-bold text-[#2D2A3E]">
            Ticket Management
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 rounded-lg bg-[#6C63FF] px-5 py-2 font-medium text-white hover:bg-[#4B47CC] md:mt-0"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Ticket Form */}
        <div className="mb-10 rounded-2xl bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold text-[#2D2A3E]">
            {editingTicket ? "Edit Ticket" : "Create New Ticket"}
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="col-span-1">
              <label className="block font-medium text-[#2D2A3E] mb-1">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ticket title"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              />
              {errors.title && (
                <p className="text-sm text-red-500 mt-1">{errors.title}</p>
              )}
            </div>

            <div className="col-span-1">
              <label className="block font-medium text-[#2D2A3E] mb-1">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
              {errors.status && (
                <p className="text-sm text-red-500 mt-1">{errors.status}</p>
              )}
            </div>

            <div className="col-span-1 md:col-span-3">
              <label className="block font-medium text-[#2D2A3E] mb-1">
                Description
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the issue or details..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-[#6C63FF]"
              ></textarea>
            </div>

            <div className="col-span-1 md:col-span-3 flex justify-end">
              <button
                type="submit"
                className="rounded-lg bg-[#6C63FF] px-6 py-2 font-medium text-white hover:bg-[#4B47CC]"
              >
                {editingTicket ? "Update Ticket" : "Create Ticket"}
              </button>
            </div>
          </form>
        </div>

        {/* Ticket List */}
        <div>
          <h2 className="mb-4 text-xl font-semibold text-[#2D2A3E]">All Tickets</h2>
          {tickets.length === 0 ? (
            <p className="text-center text-[#6B6780]">No tickets available.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="rounded-2xl bg-white p-5 shadow-md transition hover:shadow-lg"
                >
                  <div className="mb-3 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-[#2D2A3E]">
                      {ticket.title}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6780] mb-4">
                    {ticket.description || "No description provided."}
                  </p>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleEdit(ticket)}
                      className="rounded-lg bg-[#A594F9] px-3 py-1 text-white hover:bg-[#8E7AF5]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ticket.id)}
                      className="rounded-lg bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
