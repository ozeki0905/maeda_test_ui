"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import ProgressBar from "@/components/ProgressBar"

import Step1Structure from "@/components/calculation-steps/Step1Structure"
import Step2Material from "@/components/calculation-steps/Step2Material"
import Step3Ground from "@/components/calculation-steps/Step3Ground"
import Step4Load from "@/components/calculation-steps/Step4Load"
// Step5Resultは不要になったため削除
import { initialCalculationData } from "@/lib/calculation-data"
import type { CalculationData } from "@/types/calculation"

// ステップを4つに修正
const STEPS = [
  { id: 1, title: "(1)構造条件" },
  { id: 2, title: "(2)材料条件" },
  { id: 3, title: "(3)地盤条件" },
  { id: 4, title: "(4)荷重条件" },
]

export default function CalculationPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<CalculationData>(initialCalculationData)

  const handleNext = () => setStep((s) => Math.min(s + 1, STEPS.length))
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1))

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <Card className="w-full max-w-4xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-100 border-b">
          {/* タイトルを「各設計条件」に変更 */}
          <CardTitle className="text-2xl font-bold text-slate-800 text-center">各設計条件</CardTitle>
          <ProgressBar currentStep={step} totalSteps={STEPS.length} stepTitles={STEPS.map((s) => s.title)} />
        </CardHeader>

        <CardContent className="p-6 min-h-[500px]">
          {step === 1 && <Step1Structure data={data.structure} setData={setData} />}
          {step === 2 && <Step2Material data={data.material} setData={setData} />}
          {step === 3 && <Step3Ground data={data.ground} setData={setData} />}
          {step === 4 && <Step4Load data={data.load} setData={setData} />}
        </CardContent>

        <CardFooter className="p-6 border-t flex justify-between items-center bg-slate-50">
          <Link href="/" passHref>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              入力画面に戻る
            </Button>
          </Link>

          <div className="flex items-center gap-4">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
            )}
            {/* 最終ステップでない場合は次のステップへのボタン */}
            {step < STEPS.length && (
              <Button onClick={handleNext}>
                {STEPS[step].title}へ <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
            {/* 最終ステップ(4)では「設計計算に移る」ボタンを表示 */}
            {step === STEPS.length && (
              <Link href="/design-calculation" passHref>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  設計計算に移る <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
