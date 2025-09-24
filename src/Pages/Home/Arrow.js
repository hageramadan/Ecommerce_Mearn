import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

function NextArrow({ onClick }) {
  return (
    <div
      className="group-hover:flex hidden absolute right-0 top-0 h-full w-16  items-center justify-center cursor-pointer z-10 transition"
      onClick={onClick}
    >
      <ChevronRightIcon className="h-11 w-11 text-black" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      className="group-hover:flex hidden absolute left-0 top-0 h-full w-16  items-center justify-center cursor-pointer z-10 transition"
      onClick={onClick}
    >
      <ChevronLeftIcon className="h-11 w-11 text-black" />
    </div>
  );
}

export { NextArrow, PrevArrow };
