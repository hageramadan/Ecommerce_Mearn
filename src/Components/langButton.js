import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../Redux/langSlice.js";

export default function LanguageDropdown() {
  const language = useSelector((state) => state.language.lang);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (lang) => {
    dispatch(setLanguage(lang));
    setIsOpen(false);
  };

  // إغلاق القائمة عند الضغط برة
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* الزرار */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex justify-center w-20 px-2 py-1 text-sm bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
      >
        {language.toUpperCase()}
        <svg
          className="w-4 h-4 ml-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* القائمة المنسدلة */}
      {isOpen && (
        <div className="absolute right-0 z-10 w-20 mt-1 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="py-1">
            <button
              className="w-full px-2 py-1 text-sm text-left hover:bg-gray-100"
              onClick={() => handleSelect("ar")}
            >
              AR
            </button>
            <button
              className="w-full px-2 py-1 text-sm text-left hover:bg-gray-100"
              onClick={() => handleSelect("en")}
            >
              EN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
