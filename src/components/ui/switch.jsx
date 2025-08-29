import React from 'react'

export function Switch({ checked = false, onCheckedChange = () => {}, className = '', id }) {
  return (
    <button
      id={id}
      type="button"
      aria-pressed={checked}
      onClick={() => onCheckedChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? 'bg-blue-600' : 'bg-gray-300'} ${className}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${checked ? 'translate-x-5' : 'translate-x-1'}`}
      />
    </button>
  )
}
