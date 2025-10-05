import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HeartIcon,
  ShoppingBagIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";
import SearchOverlay from "./Search";
import { useDispatch, useSelector } from "react-redux";
import { toggeleLang } from "../Redux/lang.slice.js";
import { toggeleTheme } from "../Redux/theme.slice.js";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [wishlistNumber, setwishlistNumber] = useState(0);
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

  useEffect(() => {
    console.log({ wishlistItems });
    setwishlistNumber(wishlistItems.length);
  }, [wishlistItems]);
  // Define navbar classes based on theme
  const navbarBg = theme === "dark" ? "bg-gray-800" : "bg-white";
  const textColor = theme === "dark" ? "text-gray-100" : "text-gray-900";
  const hoverColor =
    theme === "dark" ? "hover:text-gray-300" : "hover:text-black/60";
  const iconColor = theme === "dark" ? "text-yellow-400" : "text-gray-900";

  return (
    <>
      <nav
        className={`flex items-center relative shadow px-2 md:px-20 ${navbarBg} ${textColor}`}
      >
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
              <Link to="/" className={hoverColor}>
                {content.navbar.home}
              </Link>
            </li>
            <li>
              <Link to="/products" className={hoverColor}>
                {content.navbar.products}
              </Link>
            </li>
            <li>
              <Link to="/about" className={hoverColor}>
                {content.navbar.about}
              </Link>
            </li>
            <li>
              <Link to="/contact" className={hoverColor}>
                {content.navbar.contact}
              </Link>
            </li>
          </ul>

          {/* Icons */}
          <div className="flex cursor-pointer items-center gap-2">
            <SearchOverlay />

            {/* Theme Toggle */}
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

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="icon-link relative"
              aria-label="Toggle language"
            >
              <LanguageIcon className={`w-6 h-6 ${textColor}`} />
              <span
                className={`absolute -bottom-1 -right-1 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                  theme === "dark"
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
                  className={`absolute -top-2 -right-2 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${
                    theme === "dark"
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

            <Link to="/login" className="icon-link">
              <UserIcon className={`w-6 h-6 ${textColor}`} />
            </Link>

            {/* Mobile Menu Button */}
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 laptop:block shadow-lg z-50 transform transition-transform duration-500 1160:flex ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          theme === "dark"
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
