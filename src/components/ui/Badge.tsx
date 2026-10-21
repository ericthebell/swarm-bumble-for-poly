import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  variant?: 'honey' | 'nectar' | 'hive'
  className?: string
}

const variants = {
  honey: 'bg-honey-100 text-honey-700',
  nectar: 'bg-nectar-100 text-nectar-600',
  hive: 'bg-hive-100 text-hive-600',
}

export default function Badge({ children, variant = 'honey', className = '' }: Props) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
