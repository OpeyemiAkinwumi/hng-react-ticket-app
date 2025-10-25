import { useState } from "react";
import { Link, useNavigate } from "react-router";
import Toast from "../components/Toast";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.confirmPassword !== formData.password)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((u) => u.email === formData.email);
    if (existingUser) {
      showToast("User with this email already exists", "error");
      return;
    }

    users.push({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("users", JSON.stringify(users));
    showToast("Account created successfully!", "success");

    setTimeout(() => {
      navigate("/sign-in");
    }, 1000);
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-[#F3F2FF] p-6">
      {toast.show && <Toast message={toast.message} type={toast.type} />}

      <div className="flex w-full max-w-[1440px] flex-col overflow-hidden rounded-2xl bg-white shadow-xl md:flex-row">
        {/* LEFT SIDE */}
        <div className="flex flex-1 flex-col items-center justify-center bg-linear-to-br from-[#6C63FF] to-[#A594F9] p-10 text-white">
          <h1 className="mb-4 text-3xl font-bold">Faaji Sticks</h1>
          <p className="mb-6 max-w-md text-center">
            Join Faaji Sticks and simplify ticket management — from creation to
            resolution.
          </p>
          <img
            src="ticket.jpg"
            alt="Login Illustration"
            className="w-[200px] md:w-[200px]"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 flex-col justify-center px-8 py-10 md:px-16">
          <h2 className="mb-1 text-2xl font-semibold text-[#2D2A3E]">
            Create Account
          </h2>
          <p className="mb-8 text-[#6B6780]">
            Sign up to start managing tickets
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1 block font-medium text-[#2D2A3E]"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="********"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-[#6C63FF] focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#6C63FF] py-3 font-medium text-white transition-all duration-300 hover:bg-[#4B47CC]"
            >
              Sign Up
            </button>

            <p className="mt-3 text-center text-[#6B6780]">
              Already have an account?{" "}
              <Link to="/sign-in" className="font-semibold text-[#6C63FF]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
