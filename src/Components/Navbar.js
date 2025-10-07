import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import SearchOverlay from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { toggeleLang } from "../Redux/lang.slice.js";
import { toggeleTheme } from "../Redux/theme.slice.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistNumber, setwishlistNumber] = useState(0);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const lang = useSelector((state) => state.langReducer.lang);
  const theme = useSelector((state) => state.themeReducer);
  const wishlistItems = useSelector((state) => state.wishlistReducer.items);
  const content = useSelector((state) => state.langReducer.content);

  const dispatch = useDispatch();

  console.log({ lang, theme });

  const toggleTheme = () => {
    dispatch(toggeleTheme());
  };

  const toggleLanguage = () => {
    dispatch(toggeleLang());
  };

  const handleSignOut = () => {
    if (localStorage.getItem("authToken") || localStorage.getItem("Bearer")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("Bearer");
    }
    navigate("/login");
  };

  useEffect(() => {
    console.log({ wishlistItems });
    setwishlistNumber(wishlistItems.length);
  }, [wishlistItems]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navbarBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const hoverColor =
    theme === "dark" ? "hover:text-gray-300" : "hover:text-black/60";
  const iconColor = theme === "dark" ? "text-yellow-400" : "text-gray-900";
  const dropdownBg = theme === "dark" ? "bg-gray-700" : "bg-white";
  const dropdownHover = theme === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-100";

  return (
    <>
      <nav
        className={`flex items-center relative shadow px-2 md:px-20 ${navbarBg} ${textColor}`}
      >
        <div className="flex w-full items-center justify-between">
          <div className="py-2">
            <Link to="/">
              <img
                className="w-40 h-26 cursor-pointer"
                src="/logo.png"
                alt="buy"
              />
            </Link>
          </div>

          <ul className={`gap-4 hidden md:flex labtop:hidden`}>
            <li>
              <Link to="/" className={hoverColor}>
                {content.navbar.home}
              </Link>
            </li>
            <li>
              <Link to="/products" className={hoverColor}>
                {content.navbar.products}
              </Link>
            </li>

          </ul>

          <div className="flex cursor-pointer items-center gap-2">
            <SearchOverlay />

            <button
              onClick={toggleTheme}
              className="icon-link"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <SunIcon className={`w-6 h-6 ${iconColor}`} />
              ) : (
                <MoonIcon className={`w-6 h-6 ${iconColor}`} />
              )}
            </button>

            <button
              onClick={toggleLanguage}
              className="icon-link relative"
              aria-label="Toggle language"
            >
              <LanguageIcon className={`w-6 h-6 ${textColor}`} />
              <span
                className={`absolute -bottom-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-gray-900"
                  }`}
              >
                {lang.toUpperCase()}
              </span>
            </button>

            <Link to="/wishlist" className="icon-link relative">
              <HeartIcon className={`w-6 h-6 ${textColor}`} />
              {wishlistNumber > 0 && (
                <span
                  className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${theme === "dark"
                      ? "bg-red-600 text-white"
                      : "bg-red-500 text-white"
                    }`}
                >
                  {wishlistNumber}
                </span>
              )}
            </Link>

            <Link to="/cart" className="icon-link">
              <ShoppingBagIcon className={`w-6 h-6 ${textColor}`} />
            </Link>

            {/* User Menu with Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="icon-link"
                aria-label="User menu"
              >
                <UserIcon className={`w-6 h-6 ${textColor}`} />
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <div
                  className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg ${dropdownBg} border ${theme === "dark" ? "border-gray-600" : "border-gray-200"
                    } z-50`}
                >
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className={`flex items-center gap-3 px-4 py-2 text-sm ${textColor} ${dropdownHover}`}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <UserCircleIcon className="w-5 h-5" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className={`flex items-center gap-3 px-4 py-2 text-sm ${textColor} ${dropdownHover}`}
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Cog6ToothIcon className="w-5 h-5" />
                      <span>Settings</span>
                    </Link>
                    <hr className={`my-1 ${theme === "dark" ? "border-gray-600" : "border-gray-200"}`} />
                    <button
                      onClick={() => {
                        handleSignOut();
                        setIsUserMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2 text-sm text-left ${theme === "dark" ? "text-red-400 hover:bg-gray-600" : "text-red-600 hover:bg-gray-100"
                        }`}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              className="block md:hidden icon-link"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <XMarkIcon className={`w-6 h-6 ${textColor}`} />
              ) : (
                <Bars3Icon className={`w-6 h-6 ${textColor}`} />
              )}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full w-64 laptop:block shadow-lg z-50 transform transition-transform duration-500 1160:flex ${isOpen ? "translate-x-0" : "-translate-x-full"
          } ${theme === "dark"
            ? "bg-gray-800 text-gray-100"
            : "bg-white text-gray-900"
          }`}
      >
        <ul className="p-4 flex flex-col gap-4 pt-8">
          <li>
            <Link
              to="/"
              className={
                theme === "dark"
                  ? "hover:text-orange-400"
                  : "hover:text-orange-500"
              }
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={
                theme === "dark"
                  ? "hover:text-orange-400"
                  : "hover:text-orange-500"
              }
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={
                theme === "dark"
                  ? "hover:text-orange-400"
                  : "hover:text-orange-500"
              }
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={
                theme === "dark"
                  ? "hover:text-orange-400"
                  : "hover:text-orange-500"
              }
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;