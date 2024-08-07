import React from "react";
import logo from "/logo.png";
import Logo from "../ui/Logo";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useCart } from "../contexts/CartContext";
import hamburger from "/hamburger.svg";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, isLoggedIn, user } = useAppContext();
  const { itemCount, subtotal } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("tokens");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 navbar-start">
        <Logo icon={logo} />
      </div>
      <div className="form-control navbar-center hidden md:block">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-72 rounded-lg"
        />
      </div>
      <div className="flex-1 navbar-end flex gap-2 items-center">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{itemCount}</span>
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
          >
            <div className="card-body">
              <span className="text-lg font-bold">{itemCount} Items</span>
              <span className="text-info">
                Subtotal: ${subtotal.toFixed(2)}
              </span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">
                  View cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        {!isLoggedIn && (
          <a
            className="btn btn-primary w-24 rounded-lg"
            onClick={() => navigate("/sign-in")}
          >
            Login
          </a>
        )}
        {isLoggedIn && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user?.avatar ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user.avatar.url}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                )}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between" href="/profile">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              {user?.role === "ADMIN" && (
                <li>
                  <a className="justify-between" href="/admin">
                    Admin
                  </a>
                </li>
              )}
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        )}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden w-12 h-6 rounded-full"
        >
          <picture className="block w-6 h-6">
            <img
              src={hamburger}
              alt="logo"
              className="w-full h-full object-cover"
            />
          </picture>
        </label>
      </div>
    </div>
  );
};

export default Navbar;
