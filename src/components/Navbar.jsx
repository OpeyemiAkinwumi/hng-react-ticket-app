import { useState } from "react";
import { Link } from "react-router";
import { FaBars, FaTimes } from "react-icons/fa"; // imported from react-icons

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-primary-dark/40 flex h-[70px] w-full items-center justify-center border-b-[3px] bg-white">
      <div className="text-primary-dark flex w-[90%] max-w-[1440px] items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-main text-lg font-bold lg:text-xl">
          Faaji-Sticks
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center justify-center gap-5 text-xs lg:flex">
          <Link className="text-sm font-semibold" to="sign-in">
            Login
          </Link>
          <Link
            className="hover:bg-accent bg-primary-dark rounded-full px-5 py-2 font-semibold text-white transition-all"
            to="sign-up"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-primary-dark lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="animate-slide-down absolute top-[70px] left-0 z-50 w-full bg-white shadow-md lg:hidden">
          <div className="text-primary-dark flex flex-col items-center gap-4 py-6">
            <Link
              className="text-sm font-semibold"
              to="sign-in"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              className="hover:bg-accent bg-primary-dark rounded-full px-5 py-2 font-semibold text-white"
              to="sign-up"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
