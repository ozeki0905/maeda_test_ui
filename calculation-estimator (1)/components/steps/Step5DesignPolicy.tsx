"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Step5Props {
  kisoKeishiki: string
  updateKisoKeishiki: (value: string) => void
}

export default function Step5DesignPolicy({ kisoKeishiki, updateKisoKeishiki }: Step5Props) {
  const estimatedFormats = ["杭基礎", "直接基礎+地盤改良工"]

  return (
    <div className="space-y-8">
      {/* 構造形式(推定) */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">構造形式(推定)</h3>
        <div className="flex flex-wrap gap-3">
          {estimatedFormats.map((format) => (
            <Badge key={format} variant="outline" className="text-base px-4 py-2">
              {format}
            </Badge>
          ))}
        </div>
      </div>

      {/* 構造形式の判定理由 */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">構造形式の判定理由</h3>
        <div className="p-4 border rounded-md bg-slate-50 text-sm text-slate-700 leading-relaxed space-y-3">
          <p>
            本施設は「特定屋外貯蔵タンク」に該当することから、一般的に選定される構造形式としては「直接基礎」および「杭基礎」が考えられる。一方、当該施設が求める耐震性能が「レベル2地震動相当」である点を踏まえると、耐震性能の観点から「直接基礎」は不適と判断される。
          </p>
          <p>
            また、設置予定地の地盤が「軟弱地盤」に分類されることから、「直接基礎」の採用には地盤改良を伴う必要がある。これに関連し、「危険物の規制に関する規則」においては、特定屋外タンクの基礎に対して以下のような基準が示されており、これらに適合しない場合は地盤改良または杭基礎等の補強措置が求められる：
          </p>
          <div className="p-3 bg-white border rounded">
            <p className="font-semibold mb-1">
              「危険物の規制に関する規則」より、特定屋外タンク基礎として適用可能な地盤条件は下記の通りである。
            </p>
            <ul className="list-disc list-inside pl-2 space-y-1">
              <li>イ：標準貫入試験N値20以上かつK30=100MN/m³以上</li>
              <li>ロ-1：支持力安全率1.5以上・不等沈下量D/300以下</li>
              <li>ロ-2：基礎直下3m以内が基礎と同等以上・15mまで不適地質なし</li>
              <li>ロ-3：砂質土で圧密度90%以上またはN値15以上</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 最終的な構造形式の選択 */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          最終的な構造形式の選択 <span className="text-red-500">*</span>
        </h3>
        <RadioGroup
          value={kisoKeishiki}
          onValueChange={updateKisoKeishiki}
          className="mt-2 p-4 border rounded-md bg-white"
        >
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="kui_kiso" id="kui_kiso" />
            <Label htmlFor="kui_kiso" className="text-base">
              杭基礎
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <RadioGroupItem value="chokusetsu_kiso_jiban_kairyo" id="chokusetsu_kiso_jiban_kairyo" />
            <Label htmlFor="chokusetsu_kiso_jiban_kairyo" className="text-base">
              直接基礎+地盤改良工
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* 設計方針の表示 */}
      {kisoKeishiki && (
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">
              {kisoKeishiki === "kui_kiso" ? "杭基礎の設計方針" : "直接基礎+地盤改良工の設計方針"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-slate-800 space-y-4">
            {kisoKeishiki === "kui_kiso" ? (
              <>
                <p>本タンク基礎における杭基礎設の設計方針は、下記の通りである。</p>
                <ul className="list-decimal list-inside pl-4 space-y-2">
                  <li>
                    「危険物の規制に関する技術上の基準の細目を定める告示（第四条の四）」及び「杭又はリングを用いた特定屋外貯蔵タンクの基礎及び地盤に関する運用基準」より、タンク荷重に対して支持力の安全率を確保すること
                  </li>
                  <li>杭体の応力度照査を行い、許容応力度以下となること</li>
                </ul>
                <div className="p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800">
                  <p>
                    <span className="font-bold">【仮定】</span>
                    なお、基礎の設計ではフーチングの応力度や接合部の検討も必要であるが、目的である事業性を確認するための基礎の仕様算出においては、支配的にならないため本計算書では省略する。
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 border-l-4 border-yellow-400 text-yellow-800">
                  <p>
                    <span className="font-bold">【仮定】</span>
                    また、成田空港近郊は軟弱地盤が分布しており、地震時にて液状化が発生する可能性が考えられる。タンク基礎の設計では液状化判定の実施や液状化しない地盤であることを確認することが一般的であるが、本設計では暫定的に杭の仕様を算出することから、液状化は非考慮とした。
                  </p>
                </div>
              </>
            ) : (
              <p className="text-slate-500 italic">
                （直接基礎+地盤改良工が選択された場合の設計方針がここに表示されます。）
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
