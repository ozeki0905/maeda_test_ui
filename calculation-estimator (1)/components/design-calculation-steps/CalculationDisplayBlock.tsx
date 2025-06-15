import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import type { ReactNode } from "react"

interface Props {
  title: string
  children: ReactNode
  className?: string
}

export default function CalculationDisplayBlock({ title, children, className }: Props) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2 pl-8 font-mono">{children}</CardContent>
    </Card>
  )
}
