"use client"

import { Input } from "@/components/ui/input"
import type React from "react"

interface Props {
  labelPrefix?: string | React.ReactNode
  editableValue: string
  onChange: (value: string) => void
  labelSuffix?: string | React.ReactNode
  inputWidthClass?: string
  isTitle?: boolean
  className?: string
}

export default function EditableCalculationLine({
  labelPrefix,
  editableValue,
  onChange,
  labelSuffix,
  inputWidthClass = "w-32", // Default width for input
  isTitle = false,
  className = "",
}: Props) {
  const textSize = isTitle ? "text-base font-semibold" : "text-sm"
  return (
    <div className={`flex items-baseline gap-1 py-1 ${textSize} ${className}`}>
      {labelPrefix && <span className="text-slate-700 whitespace-pre-wrap">{labelPrefix}</span>}
      <Input
        type="text"
        value={editableValue}
        onChange={(e) => onChange(e.target.value)}
        className={`h-8 px-2 font-mono ${inputWidthClass} ${isTitle ? "font-semibold" : ""}`}
      />
      {labelSuffix && <span className="text-slate-600 whitespace-pre-wrap">{labelSuffix}</span>}
    </div>
  )
}
