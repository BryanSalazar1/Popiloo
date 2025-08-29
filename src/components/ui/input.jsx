import React from 'react'

export function Input({ className = '', ...props }) {
  const cls = `w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500 ${className}`
  return <input className={cls} {...props} />
}
