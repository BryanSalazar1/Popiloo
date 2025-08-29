import React from "react";

export function Select({ value, onValueChange, children }) {
  return <div data-select-context data-value={value}>{children}</div>;
}
export function SelectTrigger({ children, className = "", ...props }) {
  return <div className={`rounded-xl border px-3 py-2 text-sm cursor-pointer ${className}`} {...props}>{children}</div>;
}
export function SelectValue({ placeholder }) {
  return <span className="text-gray-600">{placeholder}</span>;
}
export function SelectContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}
export function NativeSelect({ value, onChange, children, className = "" }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      className={`w-full rounded-xl border px-3 py-2 text-sm bg-white ${className}`}
    >
      {children}
    </select>
  );
}
export function SelectItem({ value, children }) {
  return <option value={value}>{children}</option>;
}
