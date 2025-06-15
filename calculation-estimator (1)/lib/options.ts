// (既存の定数からJITSUBUTSU_SHUBETSU_SHU_OPTIONS, JITSUBUTSU_SHUBETSU_JU_OPTIONS, CHIBAN_OPTIONSを削除)
// (他は変更なし)
import type { FacilityCheck } from "@/components/steps/Step2ItemLocation"

export const INITIAL_FACILITY_CHECKS: FacilityCheck[] = [
  {
    id: 1,
    location: "屋外",
    facilityType: "特定",
    applicableName: "特定屋外タンク貯蔵所",
    judgment: "◯（適合）",
    remarks: "指定数量の10倍以上（6000L ÷ 200L ＝ 30倍）",
    isChecked: false,
  },
  {
    id: 2,
    location: "屋外",
    facilityType: "準特定",
    applicableName: "準特定屋外タンク貯蔵所",
    judgment: "×（不適）",
    remarks: "10倍未満の場合に適用",
    isChecked: false,
  },
  {
    id: 3,
    location: "屋外",
    facilityType: "普通",
    applicableName: "屋外貯蔵所",
    judgment: "×（不適）",
    remarks: "一般に指定数量未満または可燃物用",
    isChecked: false,
  },
  {
    id: 4,
    location: "屋内",
    facilityType: "特定",
    applicableName: "特定屋内貯蔵所",
    judgment: "△（要構造検討）",
    remarks: "法定要件は満たすが構造基準が厳しい",
    isChecked: false,
  },
  {
    id: 5,
    location: "屋内",
    facilityType: "準特定",
    applicableName: "準特定屋内タンク貯蔵所",
    judgment: "×（不適）",
    remarks: "軽微な取扱いに限定",
    isChecked: false,
  },
  {
    id: 6,
    location: "屋内",
    facilityType: "普通",
    applicableName: "屋内貯蔵所",
    judgment: "×（不適）",
    remarks: "指定数量超では許可不要施設に該当しない",
    isChecked: false,
  },
  {
    id: 7,
    location: "地下",
    facilityType: "特定",
    applicableName: "特定地下タンク貯蔵所",
    judgment: "◯（適合）",
    remarks: "指定数量の10倍以上に対応",
    isChecked: false,
  },
  {
    id: 8,
    location: "地下",
    facilityType: "準特定",
    applicableName: "準特定地下タンク貯蔵所",
    judgment: "×（不適）",
    remarks: "少量限定",
    isChecked: false,
  },
  {
    id: 9,
    location: "地下",
    facilityType: "普通",
    applicableName: "地下貯蔵所",
    judgment: "×（不適）",
    remarks: "非タンク方式・条件不適合",
    isChecked: false,
  },
]

export const TEKIYOU_HOUREI_LIST = ["消防法", "危険物の規制に関する政令", "危険物の規制に関する規則"]

export const TERRAIN_CLASSIFICATION_OPTIONS = [
  { value: "山間部", label: "山間部" },
  { value: "丘陵地", label: "丘陵地" },
  { value: "平野部", label: "平野部" },
  { value: "沿岸部", label: "沿岸部" },
  { value: "干拓地", label: "干拓地" },
  { value: "台地", label: "台地" },
]

export const SURROUNDING_ENVIRONMENT_OPTIONS = [
  { value: "河川沿い", label: "河川沿い" },
  { value: "海岸沿い", label: "海岸沿い" },
  { value: "埋立地", label: "埋立地" },
  { value: "山麓地帯", label: "山麓地帯" },
  { value: "火山地域", label: "火山地域" },
]
