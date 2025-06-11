"use client"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface Step5Props {
  kisoKeishiki: string
  updateKisoKeishiki: (value: string) => void
}

const KISO_KEISHIKI_OPTIONS = [
  { value: "kui_kiso", label: "杭基礎" },
  { value: "chokusetsu_kiso", label: "直接基礎" },
  { value: "chokusetsu_kiso_jiban_kairyo", label: "直接基礎+地盤改良工" },
]

export default function Step5DesignPolicy({ kisoKeishiki, updateKisoKeishiki }: Step5Props) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <p className="text-sm text-slate-700 leading-relaxed">
        本タンク基礎の設計に当たり、特定屋外タンク貯蔵所の基礎（以降、特定屋外タンク基礎）であることから、設計方針は下記の通りとする。
      </p>
      <Separator />
      <div>
        <Label htmlFor="kisoKeishikiSelect" className="font-semibold text-slate-700">
          構造形式:
        </Label>
        <Select value={kisoKeishiki} onValueChange={updateKisoKeishiki}>
          <SelectTrigger id="kisoKeishikiSelect" className="mt-1">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {KISO_KEISHIKI_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
