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
  importance: string // Add importance
  updateImportance: (value: string) => void // Add update function for importance
  seismicPerformance: string // Add seismicPerformance
  updateSeismicPerformance: (value: string) => void // Add update function for seismicPerformance
}

const TANK_SHAPE_OPTIONS = [
  { value: "cylindrical", label: "円筒形" },
  { value: "spherical", label: "球形" },
]

const IMPORTANCE_OPTIONS_STEP3 = [
  // Renamed to avoid conflict if used elsewhere
  { value: "high", label: "高" },
  { value: "medium", label: "中" },
  { value: "low", label: "低" },
]

const SEISMIC_PERFORMANCE_OPTIONS = [
  { value: "level2", label: "レベル2" },
  { value: "level1", label: "レベル1相当" },
  { value: "normal", label: "常時" },
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
  importance, // Destructure importance
  updateImportance, // Destructure updateImportance
  seismicPerformance, // Destructure seismicPerformance
  updateSeismicPerformance, // Destructure updateSeismicPerformance
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
                disabled={tankShape === "spherical"}
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

      {/* Add Importance and Seismic Performance here */}
      <div className="space-y-2">
        <Label htmlFor="importance" className="font-semibold text-slate-700">
          構造物の重要度 <span className="text-red-500">*</span>
        </Label>
        <Select value={importance} onValueChange={updateImportance}>
          <SelectTrigger id="importance">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {IMPORTANCE_OPTIONS_STEP3.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {importance && ( // Show seismic performance only if importance is selected
        <div className="space-y-2">
          <Label htmlFor="seismicPerformance" className="font-semibold text-slate-700">
            耐震性能 <span className="text-red-500">*</span>
          </Label>
          <Select value={seismicPerformance} onValueChange={updateSeismicPerformance}>
            <SelectTrigger id="seismicPerformance">
              <SelectValue placeholder="選択してください" />
            </SelectTrigger>
            <SelectContent>
              {SEISMIC_PERFORMANCE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-slate-500 mt-1">
            {importance === "high" && "基準：高圧ガス設備等耐震設計指針レベル2耐震性能評価"}
            {importance === "medium" && "基準：建築基準法レベル1相当"}
            {importance === "low" && "基準：常時の安定性確保"}
          </p>
        </div>
      )}
    </div>
  )
}
