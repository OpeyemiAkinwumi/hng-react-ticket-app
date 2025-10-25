import { Link } from "react-router";

function Navbar() {
  return (
    <nav className="border-primary-dark/40 flex h-[70px] w-full items-center justify-center border-b-3">
      <div className="text-primary-dark flex w-[90%] items-center justify-between">
        <Link to="/" className="font-main font-bold lg:text-xl">
          Faaji-Sticks
        </Link>
        <div className="flex items-center justify-center gap-2 text-xs lg:gap-5">
          <Link className="text-sm font-semibold" to="sign-in">
            Login
          </Link>
          <Link
            className="bg-accent hover:bg-primary-dark rounded-full px-3 py-2 font-semibold text-white lg:px-5"
            to="sign-up"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
