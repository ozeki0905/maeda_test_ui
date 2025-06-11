"use client" // クライアントコンポーネントとしてマーク

import type React from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input" // Inputをインポート
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select" // Selectをインポート
import { Separator } from "@/components/ui/separator"
import type { CalculationData, StructureData } from "@/types/calculation"

interface Props {
  data: StructureData
  setData: React.Dispatch<React.SetStateAction<CalculationData>>
}

// 編集可能な入力フィールドコンポーネント
const EditableSpecItem = ({
  label,
  value,
  onChange,
  unit,
  inputType = "text",
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  unit?: string
  inputType?: "text" | "number" | "select"
  options?: { value: string; label: string }[]
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b last:border-b-0">
    <Label className="w-full sm:w-1/3 font-semibold text-slate-600">{label}</Label>
    <div className="w-full sm:w-2/3 flex items-baseline">
      {inputType === "select" && options ? (
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="flex-grow">
            <SelectValue placeholder="選択..." />
          </SelectTrigger>
          <SelectContent>
            {options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input type={inputType} value={value} onChange={(e) => onChange(e.target.value)} className="flex-grow h-9" />
      )}
      {unit && <span className="text-xs ml-2 text-slate-500">{unit}</span>}
    </div>
  </div>
)

// 杭種と区分の選択肢
const KUI_SHU_OPTIONS = [{ value: "PHC杭", label: "PHC杭" }]
const KUBUN_OPTIONS = [{ value: "C種", label: "C種" }]
const SLAB_SHAPE_OPTIONS = [
  { value: "正方形", label: "正方形" },
  { value: "円形", label: "円形" },
  { value: "長方形", label: "長方形" },
]

export default function Step1Structure({ data, setData }: Props) {
  const handleChange = (field: keyof StructureData, value: string) => {
    setData((prev) => ({
      ...prev,
      structure: {
        ...prev.structure,
        [field]: value,
      },
    }))
  }

  return (
    <Card className="border-blue-300 bg-blue-50/50">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800">(1)構造条件の算出</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-4">
        <EditableSpecItem
          label="杭種"
          value={data.kuiShu}
          onChange={(val) => handleChange("kuiShu", val)}
          inputType="select"
          options={KUI_SHU_OPTIONS}
        />
        <EditableSpecItem
          label="区分"
          value={data.kubun}
          onChange={(val) => handleChange("kubun", val)}
          inputType="select"
          options={KUBUN_OPTIONS}
        />
        <EditableSpecItem
          label="杭径D"
          value={data.kuiKei}
          onChange={(val) => handleChange("kuiKei", val)}
          unit="mm"
          inputType="number"
        />
        <EditableSpecItem
          label="杭長L"
          value={data.kuiChou}
          onChange={(val) => handleChange("kuiChou", val)}
          unit="m"
          inputType="number"
        />
        <EditableSpecItem
          label="換算断面積Ae"
          value={data.kanzanDanmenseki}
          onChange={(val) => handleChange("kanzanDanmenseki", val)}
          unit="mm²"
          inputType="text" // 単位に上付き文字があるのでtext
        />
        <EditableSpecItem
          label="換算断面２次モーメントIe"
          value={data.kanzanDanmen2jiMoment}
          onChange={(val) => handleChange("kanzanDanmen2jiMoment", val)}
          unit="mm⁴"
          inputType="text" // 単位に上付き文字があるのでtext
        />
        <Separator className="my-4" />
        <EditableSpecItem
          label="スラブ幅・奥行きb1"
          value={data.slabWidth}
          onChange={(val) => handleChange("slabWidth", val)}
          unit="m"
          inputType="number"
        />
        <EditableSpecItem
          label="スラブ厚さh1"
          value={data.slabThickness}
          onChange={(val) => handleChange("slabThickness", val)}
          unit="m"
          inputType="number"
        />
        <Separator className="my-4" />
        <EditableSpecItem
          label="杭の中心間隔"
          value={data.pileInterval}
          onChange={(val) => handleChange("pileInterval", val)}
          unit="m"
          inputType="number"
        />
        <EditableSpecItem
          label="基礎スラブ形状"
          value={data.slabShape}
          onChange={(val) => handleChange("slabShape", val)}
          inputType="select"
          options={SLAB_SHAPE_OPTIONS}
        />
        <EditableSpecItem
          label="杭の総本数"
          value={data.totalPiles}
          onChange={(val) => handleChange("totalPiles", val)}
          unit="本"
          inputType="number"
        />
      </CardContent>
    </Card>
  )
}
