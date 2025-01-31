import { useState, useEffect, useRef } from "react";

const Dropdown = ({ options, selected, setSelected, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between px-4 py-2 w-48 bg-white border border-[#ccc] rounded-md text-gray-800 font-medium"
      >
        <span className={`${!selected ? "text-gray-500" : ""}`}>
          {!selected ? placeholder : selected}
        </span>{" "}
        <svg
          className="w-4 h-4 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute left-0 w-full mt-2 bg-white border border-[#ccc] rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer select-none px-4 py-2 text-sm transition-all ${
                selected === option
                  ? "bg-[#0063Cf] text-white"
                  : "text-gray-800 hover:bg-[#0063Cf14] hover:text-[#0063Cf]"
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
