"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { initialCalculationData } from "@/lib/calculation-data"

export default function FinalReportPage() {
  const [reportText, setReportText] = useState(initialCalculationData.resultText)

  return (
    <div className="container mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      <Card className="w-full max-w-3xl mx-auto shadow-lg">
        <CardHeader className="bg-slate-100">
          <CardTitle className="text-2xl font-bold text-slate-800">概算検討結果</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Textarea
            value={reportText}
            onChange={(e) => setReportText(e.target.value)}
            className="w-full h-96 text-sm leading-relaxed bg-white"
            rows={25}
          />
        </CardContent>
        <CardFooter className="p-4 bg-slate-100 flex justify-between items-center">
          <Link href="/design-calculation" passHref>
            <Button variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              設計計算に戻る
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
