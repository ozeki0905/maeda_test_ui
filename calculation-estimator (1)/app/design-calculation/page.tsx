"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ProgressBar from "@/components/ProgressBar"

import Step1LoadCalculation from "@/components/design-calculation-steps/Step1LoadCalculation"
import Step2PileReaction from "@/components/design-calculation-steps/Step2PileReaction"
import Step3SectionalForce from "@/components/design-calculation-steps/Step3SectionalForce"
import Step4BendingShearStress from "@/components/design-calculation-steps/Step4BendingShearStress"
import Step5AllowableStress from "@/components/design-calculation-steps/Step5AllowableStress"
import Step6BearingPullout from "@/components/design-calculation-steps/Step6BearingPullout"
import Step7EvaluationResult from "@/components/design-calculation-steps/Step7EvaluationResult"

// Import new types and initial data
import { initialDesignCalculationState } from "@/lib/design-calculation-data"
import type { DesignCalculationState } from "@/types/design-calculation"

// Updated shorter step titles
const STEPS = [
  { id: 1, title: "荷重計算" },
  { id: 2, title: "杭反力" },
  { id: 3, title: "断面力" },
  { id: 4, title: "曲げ・せん断応力" },
  { id: 5, title: "許容応力度" },
  { id: 6, title: "支持力・引抜力" },
  { id: 7, title: "評価結果" },
]

export default function DesignCalculationPage() {
  const [step, setStep] = useState(1)
  // Use new state and initial data
  const [designData, setDesignData] = useState<DesignCalculationState>(initialDesignCalculationState)

  const handleNext = () => setStep((s) => Math.min(s + 1, STEPS.length))
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1))

  // Generic update function for nested state
  const updateDesignData = (
    stepKey: keyof DesignCalculationState,
    fieldKey: keyof DesignCalculationState[keyof DesignCalculationState],
    value: string,
  ) => {
    setDesignData((prev) => ({
      ...prev,
      [stepKey]: {
        ...prev[stepKey],
        [fieldKey]: value,
      },
    }))
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-100 border-b">
          <CardTitle className="text-2xl font-bold text-slate-800 text-center">設計計算</CardTitle>
          {/* Pass updated titles to ProgressBar */}
          <ProgressBar currentStep={step} totalSteps={STEPS.length} stepTitles={STEPS.map((s) => s.title)} />
        </CardHeader>

        <CardContent className="p-6 min-h-[500px] overflow-y-auto">
          {/* Pass data and update function to each step */}
          {step === 1 && <Step1LoadCalculation data={designData.loadCalculation} updateData={updateDesignData} />}
          {step === 2 && <Step2PileReaction data={designData.pileReaction} updateData={updateDesignData} />}
          {step === 3 && <Step3SectionalForce data={designData.sectionalForce} updateData={updateDesignData} />}
          {step === 4 && <Step4BendingShearStress data={designData.bendingShearStress} updateData={updateDesignData} />}
          {step === 5 && <Step5AllowableStress data={designData.allowableStress} updateData={updateDesignData} />}
          {step === 6 && <Step6BearingPullout data={designData.bearingPullout} updateData={updateDesignData} />}
          {step === 7 && <Step7EvaluationResult />}
        </CardContent>

        <CardFooter className="p-6 border-t flex justify-between items-center bg-slate-50">
          <Link href="/calculation" passHref>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              各設計条件に戻る
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
            )}
            {step < 6 && (
              <Button onClick={handleNext}>
                {STEPS[step].title}へ <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {step === 6 && (
              <Button onClick={handleNext}>
                評価する <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {step === 7 && (
              <Link href="/final-report" passHref>
                <Button className="bg-green-600 hover:bg-green-700">
                  概算検討を出力 <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
