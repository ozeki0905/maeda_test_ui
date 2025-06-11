"use client"

import { useState, useEffect } from "react" // useEffectを追加
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { INITIAL_FACILITY_CHECKS } from "@/lib/options"

export interface ItemLocationResult {
  classification: string
  estimatedItemName: string
  designatedQuantity: string
  quantityMultiplier: string
  referenceLaw: string
}

export interface FacilityCheck {
  id: number
  location: string
  facilityType: string
  applicableName: string
  judgment: string
  remarks: string
  isChecked: boolean
}

interface Step2Props {
  nenryoumei: string
  suuryou: string
  updateNenryoumei: (value: string) => void
  updateSuuryou: (value: string) => void
  itemLocationResult: ItemLocationResult | null
  updateItemLocationResult: (result: ItemLocationResult | null) => void
  facilityChecks: FacilityCheck[]
  updateFacilityChecks: (checks: FacilityCheck[]) => void
}

const BUNRUI_OPTIONS = [
  { value: "1", label: "第1類" },
  { value: "2", label: "第2類" },
  { value: "3", label: "第3類" },
  { value: "4", label: "第4類" },
  { value: "5", label: "第5類" },
  { value: "6", label: "第6類" },
]

export default function Step2ItemLocation({
  nenryoumei,
  suuryou,
  updateNenryoumei,
  updateSuuryou,
  itemLocationResult,
  updateItemLocationResult,
  facilityChecks,
  updateFacilityChecks,
}: Step2Props) {
  const [showResult, setShowResult] = useState(!!itemLocationResult)

  // 判定結果が更新されたら、showResultも更新
  useEffect(() => {
    setShowResult(!!itemLocationResult)
  }, [itemLocationResult])

  const handleJudge = () => {
    if (nenryoumei.trim() === "" || suuryou.trim() === "") {
      alert("燃料名と数量を入力してください。")
      return
    }

    const qty = Number.parseFloat(suuryou)
    const designatedQty = 200
    const multiplier = isNaN(qty) ? 0 : qty / designatedQty

    const initialResult: ItemLocationResult = {
      classification: "4",
      estimatedItemName: "航空タービン燃料",
      designatedQuantity: designatedQty.toString(),
      quantityMultiplier: multiplier.toFixed(1),
      referenceLaw: "「消防法」および「危険物の規制に関する政令（昭和34年政令第300号）」",
    }
    updateItemLocationResult(initialResult)

    const newChecks = INITIAL_FACILITY_CHECKS.map((check) => {
      let isChecked = false
      if (check.applicableName === "特定屋外タンク貯蔵所" && multiplier >= 10) {
        isChecked = true
      } else if (check.applicableName === "特定地下タンク貯蔵所" && multiplier >= 10) {
        isChecked = true
      }
      return { ...check, isChecked }
    })
    updateFacilityChecks(newChecks)
    // setShowResult(true); // itemLocationResultのuseEffectで制御
  }

  const handleResultChange = (field: keyof ItemLocationResult, value: string) => {
    if (itemLocationResult) {
      updateItemLocationResult({ ...itemLocationResult, [field]: value })
    }
  }

  const handleFacilityCheckChange = (id: number, checked: boolean) => {
    const newChecks = facilityChecks.map((check) => {
      if (check.id === id) {
        return { ...check, isChecked: checked }
      }
      // 他のチェックボックスのチェックを外す（1つだけ選択可能にするため）
      // ただし、今回チェックされたものがtrueの場合のみ
      if (checked) {
        return { ...check, isChecked: false }
      }
      return check
    })
    updateFacilityChecks(newChecks)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="nenryoumei" className="text-slate-600">
            燃料名 <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nenryoumei"
            value={nenryoumei}
            onChange={(e) => updateNenryoumei(e.target.value)}
            placeholder="例: 軽油、灯油"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="suuryou" className="text-slate-600">
            数量 (リットル) <span className="text-red-500">*</span>
          </Label>
          <Input
            id="suuryou"
            type="number"
            value={suuryou}
            onChange={(e) => updateSuuryou(e.target.value)}
            placeholder="例: 6000"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleJudge}>判定</Button>
      </div>

      {showResult && itemLocationResult && (
        <>
          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-slate-700 mb-4">判定結果</h3>
          <div className="space-y-4 p-4 border rounded-md bg-slate-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="classification" className="text-slate-600">
                  分類（危険物の類別）
                </Label>
                <Select
                  value={itemLocationResult.classification}
                  onValueChange={(value) => handleResultChange("classification", value)}
                >
                  <SelectTrigger id="classification">
                    <SelectValue placeholder="選択してください" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUNRUI_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="estimatedItemName" className="text-slate-600">
                  推定される品名（危険物品名）
                </Label>
                <Input
                  id="estimatedItemName"
                  value={itemLocationResult.estimatedItemName}
                  onChange={(e) => handleResultChange("estimatedItemName", e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="designatedQuantity" className="text-slate-600">
                  指定数量 (リットル)
                </Label>
                <Input
                  id="designatedQuantity"
                  type="number"
                  value={itemLocationResult.designatedQuantity}
                  onChange={(e) => handleResultChange("designatedQuantity", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="quantityMultiplier" className="text-slate-600">
                  指定数量に対する倍率
                </Label>
                <Input
                  id="quantityMultiplier"
                  type="number"
                  step="0.1"
                  value={itemLocationResult.quantityMultiplier}
                  onChange={(e) => handleResultChange("quantityMultiplier", e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="referenceLaw" className="text-slate-600">
                参考法規
              </Label>
              <Input
                id="referenceLaw"
                value={itemLocationResult.referenceLaw}
                onChange={(e) => handleResultChange("referenceLaw", e.target.value)}
              />
            </div>
          </div>

          <Separator className="my-6" />
          <h3 className="text-lg font-semibold text-slate-700 mb-4">適用施設種別の判定</h3>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>設置場所</TableHead>
                  <TableHead>施設種別</TableHead>
                  <TableHead>適用名称</TableHead>
                  <TableHead>判定（今回）</TableHead>
                  <TableHead>備考</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {facilityChecks.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Checkbox
                        id={`check-${item.id}`}
                        checked={item.isChecked}
                        onCheckedChange={(checked) => handleFacilityCheckChange(item.id, !!checked)}
                      />
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>{item.facilityType}</TableCell>
                    <TableCell>{item.applicableName}</TableCell>
                    <TableCell>{item.judgment}</TableCell>
                    <TableCell className="text-xs">{item.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
