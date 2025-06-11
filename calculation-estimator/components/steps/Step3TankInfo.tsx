"use client"

import { useMemo } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface Step3Props {
  selectedFacilityName: string | null
  tekiyouHourei: string[]
  tankShape: string
  updateTankShape: (value: string) => void
  tankDiameter: string
  updateTankDiameter: (value: string) => void
  tankHeight: string
  updateTankHeight: (value: string) => void
}

const TANK_SHAPE_OPTIONS = [
  { value: "cylindrical", label: "円筒形" },
  { value: "spherical", label: "球形" },
]

export default function Step3TankInfo({
  selectedFacilityName,
  tekiyouHourei,
  tankShape,
  updateTankShape,
  tankDiameter,
  updateTankDiameter,
  tankHeight,
  updateTankHeight,
}: Step3Props) {
  const capacity = useMemo(() => {
    const d = Number.parseFloat(tankDiameter)
    const h = Number.parseFloat(tankHeight)

    if (isNaN(d) || isNaN(h) || d <= 0 || h <= 0) {
      return { formula: "", result: "諸元に有効な数値を入力してください" }
    }

    if (tankShape === "cylindrical") {
      const volume = (Math.PI * d * d * h) / 4
      return {
        formula: `π/4 × (${d}m)² × ${h}m`,
        result: `${volume.toLocaleString("ja-JP", { maximumFractionDigits: 0 })} m³`,
      }
    } else if (tankShape === "spherical") {
      // Assuming diameter is for the sphere
      const volume = (Math.PI * d * d * d) / 6
      return {
        formula: `π/6 × (${d}m)³`,
        result: `${volume.toLocaleString("ja-JP", { maximumFractionDigits: 0 })} m³`,
      }
    }
    return { formula: "", result: "" }
  }, [tankDiameter, tankHeight, tankShape])

  return (
    <div className="space-y-6 max-w-lg mx-auto">
      <div>
        <Label className="font-semibold text-slate-700">タンク種類の判定結果:</Label>
        <p className="text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-200 min-h-[40px]">
          {selectedFacilityName || "適用施設種別が選択されていません"}
        </p>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="font-semibold text-slate-700">タンク情報</h3>
        <div className="space-y-2">
          <Label htmlFor="tankShape">タンクの形状</Label>
          <Select value={tankShape} onValueChange={updateTankShape}>
            <SelectTrigger id="tankShape">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {TANK_SHAPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>諸元</Label>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="tankDiameter" className="text-xs text-slate-500">
                直径 d₀ (m)
              </Label>
              <Input
                id="tankDiameter"
                type="number"
                value={tankDiameter}
                onChange={(e) => updateTankDiameter(e.target.value)}
                placeholder="20"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="tankHeight" className="text-xs text-slate-500">
                高さ h₀ (m)
              </Label>
              <Input
                id="tankHeight"
                type="number"
                value={tankHeight}
                onChange={(e) => updateTankHeight(e.target.value)}
                placeholder="20"
                disabled={tankShape === "spherical"} // Height is not applicable for a sphere, diameter is enough
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>容量</Label>
          <div className="text-sm text-slate-600 p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <p>
              <span className="font-mono">{capacity.formula}</span>
            </p>
            <p className="font-semibold text-slate-800">= {capacity.result}</p>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <Label className="font-semibold text-slate-700">適用法令/技術基準:</Label>
        <ul className="list-disc list-inside text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-200">
          {tekiyouHourei.map((hourei, index) => (
            <li key={index}>{hourei}</li>
          ))}
        </ul>
      </div>
      <div>
        <Label className="font-semibold text-slate-700">耐震性能:</Label>
        <p className="text-sm text-slate-600 p-2 bg-slate-50 rounded border border-slate-200">レベル２地震時相当</p>
        <p className="text-xs text-slate-500 mt-1">基準：高圧ガス設備等耐震設計指針レベル2耐震性能評価</p>
      </div>
    </div>
  )
}
