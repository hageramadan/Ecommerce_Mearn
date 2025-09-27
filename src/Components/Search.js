import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

function SearchOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      navigate(`/products?query=${encodeURIComponent(query)}`);
      setQuery("");       // يمسح قيمة الـ input
      setIsOpen(false);   // يقفل الـ overlay
    }
  };

  return (
    <div>
      {/* أيقونة البحث الرئيسية */}
      <div className="icon-link">
         <MagnifyingGlassIcon
        onClick={() => setIsOpen(true)}
        className="w-6 h-6 cursor-pointer"
      />
      </div>
     

     
      <div
        className={`fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        
        <div
          className={`fixed top-0 left-0 w-full h-1/4 bg-white shadow-lg z-[9999]
            transform transition-transform duration-500
            ${isOpen ? "translate-y-0" : "-translate-y-full"}
          `}
        >
          <div className="p-6 relative h-full flex flex-col justify-center">
           
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

          
            <div className="relative w-full max-w-lg mx-auto">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="w-full border rounded-full py-4  pl-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
                placeholder="search"
              />

              <button
                onClick={handleSearch}
                className="absolute right-[7px]  h-[3rem] top-1/2 -translate-y-1/2 group flex items-center gap-2 px-3  py-1 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition-all duration-300"
              >
                <MagnifyingGlassIcon className="w-6 h-7" />
                <span className="overflow-hidden max-w-0 opacity-0 group-hover:opacity-100 group-hover:max-w-[70px] transition-all duration-300">
                  search
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;
