"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import type { FormData } from "@/app/page"

// Step1で直接定義
const JITSUBUTSU_SHUBETSU_SHU_OPTIONS_STEP1 = [{ value: "tank", label: "タンク" }]
const JITSUBUTSU_SHUBETSU_JU_OPTIONS_STEP1 = [{ value: "kiso", label: "基礎" }]

interface Step1Props {
  formData: Pick<FormData, "jitsubutsuShubetsuShu" | "jitsubutsuShubetsuJu">
  updateFormData: (field: keyof FormData, value: any) => void
}

export default function Step1BasicInfo({ formData, updateFormData }: Step1Props) {
  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="jitsubutsuShubetsuShu" className="text-slate-600">
          実件種別（主） <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.jitsubutsuShubetsuShu}
          onValueChange={(value) => updateFormData("jitsubutsuShubetsuShu", value)}
        >
          <SelectTrigger id="jitsubutsuShubetsuShu">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {JITSUBUTSU_SHUBETSU_SHU_OPTIONS_STEP1.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="jitsubutsuShubetsuJu" className="text-slate-600">
          実件種別（従） <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.jitsubutsuShubetsuJu}
          onValueChange={(value) => updateFormData("jitsubutsuShubetsuJu", value)}
        >
          <SelectTrigger id="jitsubutsuShubetsuJu">
            <SelectValue placeholder="選択してください" />
          </SelectTrigger>
          <SelectContent>
            {JITSUBUTSU_SHUBETSU_JU_OPTIONS_STEP1.map((option) => (
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
