"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation" // useRouterをインポート
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

import ProgressBar from "@/components/ProgressBar"
import Step1BasicInfo from "@/components/steps/Step1BasicInfo"
import Step2ItemLocation, { type ItemLocationResult, type FacilityCheck } from "@/components/steps/Step2ItemLocation"
import Step3TankInfo from "@/components/steps/Step3TankInfo"
import Step4SiteEvaluation, { type SiteEvaluationResult } from "@/components/steps/Step4SiteEvaluation"
import Step5DesignPolicy from "@/components/steps/Step5DesignPolicy"

import type { RyousouLayer, FormData } from "@/types/index"
import { INITIAL_FACILITY_CHECKS, TEKIYOU_HOUREI_LIST } from "@/lib/options"

export interface EnvironmentalCharacteristic {
  id: number
  category: "terrain" | "surrounding"
  value: string
}

const STEPS = [
  { id: 1, title: "基本情報入力" },
  { id: 2, title: "物品及び設置場所情報" },
  { id: 3, title: "タンク情報" },
  { id: 4, title: "設置場所評価" },
  { id: 5, title: "設計方針" },
]

export default function CalculationEstimatorPage() {
  const router = useRouter() // useRouterフックを使用
  const [formData, setFormData] = useState<FormData>({
    jitsubutsuShubetsuShu: "",
    jitsubutsuShubetsuJu: "",
    nenryoumei: "",
    suuryou: "",
    itemLocationResult: null,
    facilityChecks: INITIAL_FACILITY_CHECKS.map((check) => ({ ...check })),
    selectedFacilityName: null,
    tankShape: "cylindrical",
    tankDiameter: "20",
    tankHeight: "20",
    ichiJouhou: "",
    siteEvaluationResult: { chiban: "" },
    ryousouLayers: [
      { id: 1, start: "0", end: "1", description: "表土・盛土" },
      { id: 2, start: "1", end: "5", description: "関東ローム層" },
      { id: 3, start: "5", end: "17", description: "シルト混じり砂層" },
      { id: 4, start: "17", end: "", description: "砂質土層（支持層）" },
    ],
    environmentalCharacteristics: [
      { id: 1, category: "terrain", value: "平野部" },
      { id: 2, category: "surrounding", value: "河川沿い" },
    ],
    importance: "high",
    seismicPerformance: "level2",
    kisoKeishiki: "", // 初期値を空にしてユーザーに選択を促す
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [tekiyouHourei, setTekiyouHourei] = useState<string[]>([])

  useEffect(() => {
    if (currentStep >= 3) {
      setTekiyouHourei(TEKIYOU_HOUREI_LIST)
    } else {
      setTekiyouHourei([])
    }
  }, [currentStep])

  useEffect(() => {
    if (formData.importance === "high") {
      setFormData((prev) => ({ ...prev, seismicPerformance: "level2" }))
    } else if (formData.importance === "medium") {
      setFormData((prev) => ({ ...prev, seismicPerformance: "level1" }))
    } else if (formData.importance === "low") {
      setFormData((prev) => ({ ...prev, seismicPerformance: "normal" }))
    }
  }, [formData.importance])

  const handleNext = () => {
    if (currentStep === 1 && (formData.jitsubutsuShubetsuShu === "" || formData.jitsubutsuShubetsuJu === "")) {
      alert("実件種別（主）と実件種別（従）を選択してください。")
      return
    }
    if (currentStep === 2) {
      if (!formData.itemLocationResult || formData.nenryoumei.trim() === "" || formData.suuryou.trim() === "") {
        alert("燃料名と数量を入力し、「判定」ボタンを押して結果を確認してください。")
        return
      }
      if (formData.ichiJouhou.trim() === "") {
        alert("位置情報を入力してください。")
        return
      }
      const checkedCount = formData.facilityChecks.filter((check) => check.isChecked).length
      if (checkedCount !== 1) {
        alert("適用施設種別の判定は、1つだけ選択してください。")
        return
      }
      const selectedFacility = formData.facilityChecks.find((check) => check.isChecked)
      setFormData((prev) => ({ ...prev, selectedFacilityName: selectedFacility?.applicableName || null }))
    }
    if (currentStep === 4) {
      if (!formData.siteEvaluationResult || formData.siteEvaluationResult.chiban === "") {
        alert("「判定」ボタンを押して地盤情報を入力してください。")
        return
      }
      if (formData.ryousouLayers.some((l) => l.description.trim() === "")) {
        alert("量層の情報をすべて入力してください。")
        return
      }
    }

    if (currentStep < STEPS.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleFinalStepSubmit = () => {
    if (formData.kisoKeishiki === "") {
      alert("最終的な構造形式を選択してください。")
      return
    }
    router.push("/calculation")
  }

  const updateFormDataGeneric = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateItemLocationResult = (result: ItemLocationResult | null) => {
    setFormData((prev) => ({ ...prev, itemLocationResult: result }))
  }

  const updateFacilityChecks = (checks: FacilityCheck[]) => {
    setFormData((prev) => ({ ...prev, facilityChecks: checks }))
  }

  const updateSiteEvaluationResult = (result: SiteEvaluationResult | null) => {
    setFormData((prev) => ({ ...prev, siteEvaluationResult: result }))
  }

  const updateRyousouLayers = (layers: RyousouLayer[]) => {
    setFormData((prev) => ({ ...prev, ryousouLayers: layers }))
  }

  const updateEnvironmentalCharacteristics = (characteristics: EnvironmentalCharacteristic[]) => {
    setFormData((prev) => ({ ...prev, environmentalCharacteristics: characteristics }))
  }

  const currentStepTitle = useMemo(() => {
    return STEPS.find((step) => step.id === currentStep)?.title || ""
  }, [currentStep])

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-100 border-b">
          <CardTitle className="text-2xl font-bold text-slate-800 text-center">設計計算書 概算見積システム</CardTitle>
          <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} stepTitles={STEPS.map((s) => s.title)} />
        </CardHeader>

        <CardContent className="p-6 min-h-[450px]">
          <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center">
            {currentStep}. {currentStepTitle}
          </h2>
          {currentStep === 1 && <Step1BasicInfo formData={formData} updateFormData={updateFormDataGeneric} />}
          {currentStep === 2 && (
            <Step2ItemLocation
              nenryoumei={formData.nenryoumei}
              suuryou={formData.suuryou}
              updateNenryoumei={(value) => updateFormDataGeneric("nenryoumei", value)}
              updateSuuryou={(value) => updateFormDataGeneric("suuryou", value)}
              itemLocationResult={formData.itemLocationResult}
              updateItemLocationResult={updateItemLocationResult}
              facilityChecks={formData.facilityChecks}
              updateFacilityChecks={updateFacilityChecks}
              ichiJouhou={formData.ichiJouhou}
              updateIchiJouhou={(value) => updateFormDataGeneric("ichiJouhou", value)}
            />
          )}
          {currentStep === 3 && (
            <Step3TankInfo
              selectedFacilityName={formData.selectedFacilityName}
              tekiyouHourei={tekiyouHourei}
              tankShape={formData.tankShape}
              updateTankShape={(value) => updateFormDataGeneric("tankShape", value)}
              tankDiameter={formData.tankDiameter}
              updateTankDiameter={(value) => updateFormDataGeneric("tankDiameter", value)}
              tankHeight={formData.tankHeight}
              updateTankHeight={(value) => updateFormDataGeneric("tankHeight", value)}
              importance={formData.importance}
              updateImportance={(value) => updateFormDataGeneric("importance", value)}
              seismicPerformance={formData.seismicPerformance}
              updateSeismicPerformance={(value) => updateFormDataGeneric("seismicPerformance", value)}
            />
          )}
          {currentStep === 4 && (
            <Step4SiteEvaluation
              ichiJouhou={formData.ichiJouhou}
              siteEvaluationResult={formData.siteEvaluationResult}
              updateSiteEvaluationResult={updateSiteEvaluationResult}
              ryousouLayers={formData.ryousouLayers}
              updateRyousouLayers={updateRyousouLayers}
              environmentalCharacteristics={formData.environmentalCharacteristics}
              updateEnvironmentalCharacteristics={updateEnvironmentalCharacteristics}
            />
          )}
          {currentStep === 5 && (
            <Step5DesignPolicy
              kisoKeishiki={formData.kisoKeishiki}
              updateKisoKeishiki={(value) => updateFormDataGeneric("kisoKeishiki", value)}
            />
          )}
        </CardContent>

        <CardFooter className="p-6 border-t flex justify-between items-center bg-slate-50">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrev}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              戻る
            </Button>
          )}
          {currentStep < STEPS.length && (
            <Button onClick={handleNext} className="ml-auto">
              次へ <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
          {currentStep === STEPS.length && (
            <Button onClick={handleFinalStepSubmit} className="ml-auto bg-blue-600 hover:bg-blue-700 text-white">
              設計計算に移る <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
