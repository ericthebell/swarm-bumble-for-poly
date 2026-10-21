import { forwardRef, type InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-hive-700">{label}</label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 bg-white border rounded-xl text-hive-800 placeholder:text-hive-400 focus:outline-none focus:ring-2 focus:ring-honey-500 focus:border-transparent transition-shadow ${
          error ? 'border-nectar-500' : 'border-hive-200'
        } ${className}`}
        {...props}
      />
      {error && <p className="text-sm text-nectar-500">{error}</p>}
    </div>
  )
})

Input.displayName = 'Input'
export default Input
