"use client"

import type React from "react"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { CalculationData, GroundData, GroundLayer } from "@/types/calculation"

interface Props {
  data: GroundData
  setData: React.Dispatch<React.SetStateAction<CalculationData>>
}

const LayerInput = ({
  label,
  value,
  onChange,
  unit,
  className,
}: {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  unit: string
  className?: string
}) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <Label className="text-xs w-24 text-right">{label}</Label>
    <Input type="text" value={value} onChange={onChange} className="h-8" />
    <span className="text-xs text-slate-500 w-16">{unit}</span>
  </div>
)

export default function Step3Ground({ data, setData }: Props) {
  const handleLayerChange = (id: number, field: keyof GroundLayer, value: string) => {
    setData((prev) => ({
      ...prev,
      ground: {
        ...prev.ground,
        layers: prev.ground.layers.map((l) => (l.id === id ? { ...l, [field]: value } : l)),
      },
    }))
  }

  const handleImprovementLayerChange = (field: keyof GroundLayer, value: string) => {
    setData((prev) => ({
      ...prev,
      ground: {
        ...prev.ground,
        improvement: { ...prev.ground.improvement, layer: { ...prev.ground.improvement.layer, [field]: value } },
      },
    }))
  }

  const handleStandardNValueChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      ground: {
        ...prev.ground,
        improvement: { ...prev.ground.improvement, standardNValue: value },
      },
    }))
  }

  const toggleImprovement = () => {
    setData((prev) => ({
      ...prev,
      ground: {
        ...prev.ground,
        improvement: { ...prev.ground.improvement, enabled: !prev.ground.improvement.enabled },
      },
    }))
  }

  return (
    <div className="space-y-4">
      {data.layers.map((layer, index) => (
        <Card key={layer.id}>
          <CardHeader>
            <CardTitle className="text-base">{`①${index + 1} ${layer.depth}：${layer.name}`}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LayerInput
              label="N値"
              value={layer.nValue}
              onChange={(e) => handleLayerChange(layer.id, "nValue", e.target.value)}
              unit=""
            />
            <LayerInput
              label="単位体積重量γ"
              value={layer.unitWeight}
              onChange={(e) => handleLayerChange(layer.id, "unitWeight", e.target.value)}
              unit="kN/m³"
            />
            <LayerInput
              label="内部摩擦角φ"
              value={layer.frictionAngle}
              onChange={(e) => handleLayerChange(layer.id, "frictionAngle", e.target.value)}
              unit="°"
            />
            <LayerInput
              label="粘着力c"
              value={layer.cohesion}
              onChange={(e) => handleLayerChange(layer.id, "cohesion", e.target.value)}
              unit="kN/m²"
            />
          </CardContent>
        </Card>
      ))}
      <div className="flex items-center gap-2">
        <Label htmlFor="waterLevel" className="text-sm">
          地下水位:
        </Label>
        <Input
          id="waterLevel"
          type="text"
          value={data.waterLevel}
          onChange={(e) => setData((prev) => ({ ...prev, ground: { ...prev.ground, waterLevel: e.target.value } }))}
          className="w-40 h-9"
          placeholder="例: -2.0"
        />
        <span className="text-sm text-slate-500">m 以深と推察</span>
      </div>
      <div className="flex justify-center">
        <Button onClick={toggleImprovement} variant="outline">
          {data.improvement.enabled ? "地盤改良を非表示" : "地盤改良を検討する"}
        </Button>
      </div>
      {data.improvement.enabled && (
        <Card className="border-orange-400">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">地盤改良体</CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="standardNValue" className="text-sm">
                  基準：レベル２地震時/N=
                </Label>
                <Input
                  id="standardNValue"
                  type="text"
                  value={data.improvement.standardNValue}
                  onChange={(e) => handleStandardNValueChange(e.target.value)}
                  className="w-20 h-8"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm font-medium">改良箇所：</Label>
              <ul className="list-disc list-inside text-sm text-slate-700 pl-4 mt-1">
                {data.improvement.locations.map((loc, idx) => (
                  <li key={idx}>{loc}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <LayerInput
                label="N値"
                value={data.improvement.layer.nValue}
                onChange={(e) => handleImprovementLayerChange("nValue", e.target.value)}
                unit=""
              />
              <LayerInput
                label="単位体積重量γ"
                value={data.improvement.layer.unitWeight}
                onChange={(e) => handleImprovementLayerChange("unitWeight", e.target.value)}
                unit="kN/m³"
              />
              <LayerInput
                label="内部摩擦角φ"
                value={data.improvement.layer.frictionAngle}
                onChange={(e) => handleImprovementLayerChange("frictionAngle", e.target.value)}
                unit="°"
              />
              <LayerInput
                label="粘着力c"
                value={data.improvement.layer.cohesion}
                onChange={(e) => handleImprovementLayerChange("cohesion", e.target.value)}
                unit="kN/m²"
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
