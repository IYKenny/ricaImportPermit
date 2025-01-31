import React from "react";

export default function CustomInput({
  value,
  onChange,
  placeholder,
  error,
  required,
  type = "text",
  maxLength,
  className = "",
  ...props
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder={placeholder}
        type={type}
        className={`w-full px-4 py-2 border rounded-md text-sm focus:outline-none ${
          error
            ? "border-red-500"
            : "border-[#ccc] focus:border-[#0063Cf] focus:ring-1 focus:ring-[#0063Cf]"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error}</span>
      )}
    </div>
  );
}
