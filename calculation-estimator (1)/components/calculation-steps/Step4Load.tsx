"use client"

import type React from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import type { CalculationData, LoadData } from "@/types/calculation"

interface Props {
  data: LoadData
  setData: React.Dispatch<React.SetStateAction<CalculationData>>
}

const LoadInput = ({
  label,
  value,
  onChange,
  unit,
  sublabel,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  unit?: string
  sublabel?: string
}) => (
  <div className="space-y-1">
    <div className="flex justify-between items-baseline">
      <Label className="text-sm">{label}</Label>
      {sublabel && <span className="text-xs text-slate-500">{sublabel}</span>}
    </div>
    <div className="flex items-center">
      <Input type="text" value={value} onChange={onChange} />
      {unit && <span className="ml-2 text-sm text-slate-500">{unit}</span>}
    </div>
  </div>
)

export default function Step4Load({ data, setData }: Props) {
  const handleChange = (section: keyof LoadData, field: string, value: string) => {
    setData((prev) => ({
      ...prev,
      load: {
        ...prev.load,
        [section]: {
          ...prev.load[section],
          [field]: value,
        },
      },
    }))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">① 貯蔵タンク自重V1</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoadInput
            label="タンク容量"
            value={data.tankWeight.capacity}
            onChange={(e) => handleChange("tankWeight", "capacity", e.target.value)}
            unit="L"
          />
          <LoadInput
            label="貯蔵タンクの重量（推定）"
            value={data.tankWeight.weight}
            onChange={(e) => handleChange("tankWeight", "weight", e.target.value)}
            unit="t"
          />
          <LoadInput
            label="V1"
            value={data.tankWeight.v1}
            onChange={(e) => handleChange("tankWeight", "v1", e.target.value)}
            unit="kN"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">② 貯蔵する危険物の重量V2</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoadInput
            label="燃料名"
            value={data.fuelWeight.name}
            onChange={(e) => handleChange("fuelWeight", "name", e.target.value)}
          />
          <LoadInput
            label="密度(推定)"
            value={data.fuelWeight.density}
            onChange={(e) => handleChange("fuelWeight", "density", e.target.value)}
            unit="kg/L"
          />
          <LoadInput
            label="V2（内容物×密度）"
            value={data.fuelWeight.v2}
            onChange={(e) => handleChange("fuelWeight", "v2", e.target.value)}
            unit="kN"
            sublabel={`※ ${data.fuelWeight.v2_detail} kN`}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">③ 地震の影響等による従荷重</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-slate-600">レベル２地震時における設計修正震度</p>
          <LoadInput
            label="水平方向の設計修正震度KMH"
            value={data.seismicLoad.kmh}
            onChange={(e) => handleChange("seismicLoad", "kmh", e.target.value)}
          />
          <LoadInput
            label="鉛直方向の設計修正震度KMV"
            value={data.seismicLoad.kmv}
            onChange={(e) => handleChange("seismicLoad", "kmv", e.target.value)}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-base">④ 基礎スラブ自重V3</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoadInput
            label="単位体積重量γc"
            value={data.slabWeight.unitWeight}
            onChange={(e) => handleChange("slabWeight", "unitWeight", e.target.value)}
            unit="kN/m³"
          />
          <LoadInput
            label="V3"
            value={data.slabWeight.v3}
            onChange={(e) => handleChange("slabWeight", "v3", e.target.value)}
            unit="kN"
            sublabel="b1×b1×h1×γc"
          />
        </CardContent>
      </Card>
    </div>
  )
}
