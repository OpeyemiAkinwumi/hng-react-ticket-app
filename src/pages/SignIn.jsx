import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Toast from "../components/Toast";

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // 🔹 Get registered users (from localStorage)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);

    // 🔹 Find user by email + password
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      showToast("Invalid email or password", "error");
      return;
    }

    // ✅ Save fullName + email in sessionStorage
    sessionStorage.setItem(
      "ticketapp_session",
      JSON.stringify({
        name: user.name,
        email: user.email,
      }),
    );

    showToast("Login successful!", "success");

    // Redirect to dashboard after 1 second
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F3F2FF] p-6">
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
        {/* LEFT SIDE */}
        <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-br from-[#6C63FF] to-[#A594F9] p-10 text-white">
          <h1 className="mb-4 text-3xl font-bold">Faaji Sticks</h1>
          <p className="mb-6 max-w-md text-center">
            Your seamless way to create, track, and resolve tickets — all in one
            place.
          </p>
          <img
            src="ticket.jpg"
            alt="Login Illustration"
            className="w-[200px] md:w-[220px]"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-16">
          <h2 className="mb-1 text-2xl font-semibold text-[#2D2A3E]">
            Welcome Back
          </h2>
          <p className="mb-8 text-[#6B6780]">Login to manage your tickets</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-lg bg-[#6C63FF] py-3 font-medium text-white transition-all duration-300 hover:bg-[#4B47CC]"
            >
              Login
            </button>

            {/* Redirect to Signup */}
            <p className="mt-3 text-center text-[#6B6780]">
              Don’t have an account?{" "}
              <Link
                to="/sign-up"
                className="font-semibold text-[#6C63FF] hover:underline"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
