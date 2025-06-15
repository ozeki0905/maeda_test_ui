"use client"

import type React from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import type { CalculationData, MaterialData } from "@/types/calculation"

interface Props {
  data: MaterialData
  setData: React.Dispatch<React.SetStateAction<CalculationData>>
}

const InputItem = ({
  label,
  value,
  onChange,
  unit,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  unit: string
}) => (
  <div className="grid grid-cols-3 items-center gap-4">
    <Label className="text-sm text-slate-600 col-span-1">{label}</Label>
    <div className="col-span-2 flex items-center">
      <Input type="text" value={value} onChange={onChange} className="flex-grow" />
      <span className="ml-2 text-sm text-slate-500 whitespace-nowrap">{unit}</span>
    </div>
  </div>
)

export default function Step2Material({ data, setData }: Props) {
  const handleRebarChange = (field: string, value: any) => {
    setData((prev) => ({
      ...prev,
      material: { ...prev.material, rebarConcrete: { ...prev.material.rebarConcrete, [field]: value } },
    }))
  }

  const handlePileChange = (field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      material: { ...prev.material, phcPile: { ...prev.material.phcPile, [field]: value } },
    }))
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rebar-enabled"
              checked={data.rebarConcrete.enabled}
              onCheckedChange={(checked) => handleRebarChange("enabled", !!checked)}
            />
            <CardTitle className="text-lg">鉄筋コンクリート</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4" hidden={!data.rebarConcrete.enabled}>
          <InputItem
            label="単位体積重量γc"
            value={data.rebarConcrete.unitWeight}
            onChange={(e) => handleRebarChange("unitWeight", e.target.value)}
            unit="kN/m³"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">PHC杭</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <InputItem
            label="有効プレストレス量σe"
            value={data.phcPile.prestress}
            onChange={(e) => handlePileChange("prestress", e.target.value)}
            unit="N/mm²"
          />
          <InputItem
            label="単位体積重量γc"
            value={data.phcPile.unitWeight}
            onChange={(e) => handlePileChange("unitWeight", e.target.value)}
            unit="kN/m³"
          />
          <InputItem
            label="許容応力度（短期） 圧縮fca"
            value={data.phcPile.compressiveStrength}
            onChange={(e) => handlePileChange("compressiveStrength", e.target.value)}
            unit="N/mm²"
          />
          <InputItem
            label="曲げ引張fba"
            value={data.phcPile.bendingTension}
            onChange={(e) => handlePileChange("bendingTension", e.target.value)}
            unit="N/mm²"
          />
          <InputItem
            label="斜引張σd"
            value={data.phcPile.shearTension}
            onChange={(e) => handlePileChange("shearTension", e.target.value)}
            unit="N/mm²"
          />
        </CardContent>
      </Card>
    </div>
  )
}
