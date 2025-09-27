import { useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import SearchOverlay from "./Search";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="px-9 py-2 flex items-center relative shadow">
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <Link to="/">
            <img
              className="w-40 h-26 cursor-pointer"
              src="./logo.png"
              alt="buy"
            />
          </Link>

          {/* Links (Desktop) */}
          <ul
            className={`hidden md:flex  laptop:hidden gap-6 absolute md:static left-1/2 transform -translate-x-1/2 z-50`}
          >
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
          <div className="flex gap-4 cursor-pointer items-center">
            <SearchOverlay />
            <Link to="/wishlist" className="icon-link">
              <HeartIcon className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="icon-link">
              <ShoppingBagIcon className="w-6 h-6" />
            </Link>
            <Link to="/login" className="icon-link">
              <UserIcon className="w-6 h-6" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className=" laptop:block hidden  icon-link"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar (Mobile) */}
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
    </>
  );
}

export default Navbar;
