import React from "react"

export function Button({ children, className = "", variant = "default", ...props }) {
  const base = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium"
  const variants = {
    default: "bg-black text-white hover:opacity-90",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
