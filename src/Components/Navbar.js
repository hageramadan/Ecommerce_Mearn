import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import SearchOverlay from "./Search";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center relative shadow px-2 md:px-20">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <div className="py-2">
            <Link to="/">
              <img
                className="w-40 h-26 cursor-pointer"
                src="/logo.png"
                alt="buy"
              />
            </Link>
          </div>

          {/* Links (Desktop) */}
          <ul className={`gap-4 hidden md:flex labtop:hidden`}>
            <li>
              <Link to="/" className="hover:text-black/60">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-black/60">
                Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-black/60">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-black/60">
                Contact
              </Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex cursor-pointer items-center gap-2">
            <SearchOverlay />
            <Link to="/wishlist" className="icon-link ">
              <HeartIcon className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="icon-link ">
              <ShoppingBagIcon className="w-6 h-6" />
            </Link>
            <Link to="/login" className="icon-link ">
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="block md:hidden icon-link"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 laptop:block bg-white shadow-lg z-50 transform transition-transform duration-500 1160:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="p-4 flex flex-col gap-4 pt-8">
          <li>
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/products" className="hover:text-orange-500">
              Products
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-orange-500">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-orange-500">
              Contact
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom Bar */}
      <div className="flex items-center justify-between px-2 md:px-20">
        <h2>shop</h2>
        <div className="flex gap-5 py-2">
          <p className="flex items-center gap-1 cursor-pointer">
            <SunIcon className="w-5 h-5 " />
            Theme
          </p>
          <p className="flex items-center gap-1 cursor-pointer">
            <LanguageIcon className="w-5 h-5 " />
            Lang
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;
