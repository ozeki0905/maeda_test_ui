"use client"

import CalculationDisplayBlock from "./CalculationDisplayBlock"
import EditableCalculationLine from "./EditableCalculationLine"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { BearingPulloutData, DesignCalculationState } from "@/types/design-calculation"

interface Props {
  data: BearingPulloutData
  updateData: (stepKey: keyof DesignCalculationState, fieldKey: keyof BearingPulloutData, value: string) => void
}

export default function Step6BearingPullout({ data, updateData }: Props) {
  const handleChange = (field: keyof BearingPulloutData, value: string) => {
    updateData("bearingPullout", field, value)
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-slate-700">
        「杭又はリングを用いた特定屋外貯蔵タンクの基礎及び地盤に関する運用基準」より、杭の許容支持力・許容引抜力は、各々下記の通り算出する。
      </p>

      {/* ①杭の許容支持力 */}
      <CalculationDisplayBlock title="①杭の許容支持力">
        <div className="space-y-4">
          <div className="p-2 bg-slate-100 rounded-md text-sm font-mono">
            <p>Ra＝Ru／F</p>
          </div>
          <div className="text-xs space-y-1 my-2 text-slate-600">
            <p>Ra：杭頭における杭の軸方向許容押込み支持力(kN)</p>
            <p>Ru：杭の極限支持力(kN)</p>
            <p>F：安全率(常時3、地震時1.5)</p>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-base">杭の極限支持力Ruの算出</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="p-2 bg-slate-100 rounded-md font-mono">
                <p>Ru＝qp・Ap＋Σ10Ns／3・Ls・ψ＋Σqu/2・Lc・ψ</p>
              </div>
              <div className="text-xs space-y-1 my-2 text-slate-600">
                <p>qp：杭先端で支持する単位面積あたりの極限支持力(kN/m²)</p>
                <p className="pl-4">打込み杭：qp＝400N, 中掘り杭：qp＝200N, 場所打ち杭：qp＝150N</p>
                <p>本検討では、PHC杭のため中掘り杭として、qp＝200N</p>
              </div>

              <Separator />

              <p>
                まず、４．設計条件(3)地盤条件より及び杭長L=17.9m（基礎スラブへの根入れ0.1mを除した）に応じた地盤条件を整理する。
              </p>
              <ul className="list-disc list-inside pl-2">
                <li>①②0m ～ 5m：地盤改良 Ｎs1＝20、Ls1＝5.0m</li>
                <li>③5m ～ 17m：シルト混じり砂層 Ｎs2＝15、Ls2＝12.0m</li>
                <li>④17m ～ 17.9m（杭下端）：砂質土層（支持層） Ｎs3＝30、Ls3＝0.9m</li>
              </ul>

              <Separator />

              <p>また、N（杭先端上方4d、下方1dの平均Ｎ値）は下記の通りである。</p>
              <EditableCalculationLine
                labelPrefix="上方4d＝4×0.7m＝2.8m："
                editableValue={data.N_avg_upper_4d_calc}
                onChange={(val) => handleChange("N_avg_upper_4d_calc", val)}
                labelSuffix={`＝${data.N_avg_upper_4d_result}`}
                inputWidthClass="w-48"
              />
              <EditableCalculationLine
                labelPrefix="下方1d＝1×0.7m＝0.7m："
                editableValue={data.N_avg_lower_1d_calc}
                onChange={(val) => handleChange("N_avg_lower_1d_calc", val)}
                labelSuffix={`＝${data.N_avg_lower_1d_result}`}
                inputWidthClass="w-24"
              />
              <EditableCalculationLine
                labelPrefix="よって、N＝"
                editableValue={data.N_avg_calc}
                onChange={(val) => handleChange("N_avg_calc", val)}
                labelSuffix={`＝${data.N_avg_result}`}
                inputWidthClass="w-48"
              />

              <Separator />

              <p>杭の極限支持力Ruは、</p>
              <div className="p-2 bg-slate-100 rounded-md font-mono">
                <p>Ru＝200・N・Ap＋10／3ψ・Σ（Ns・Ls）</p>
              </div>
              <EditableCalculationLine
                labelPrefix="＝"
                editableValue={data.Ru_calc_final}
                onChange={(val) => handleChange("Ru_calc_final", val)}
                labelSuffix={`＝${data.Ru_result} (kN)`}
                inputWidthClass="w-full"
              />
            </CardContent>
          </Card>

          <Separator />

          <EditableCalculationLine
            labelPrefix="よって、杭の許容支持力Ra＝Ru／F＝"
            editableValue={data.Ra_calc}
            onChange={(val) => handleChange("Ra_calc", val)}
            labelSuffix={`＝${data.Ra_result} (kN)`}
            isTitle
            className="border-t pt-2 mt-2"
          />
        </div>
      </CalculationDisplayBlock>

      {/* ②杭の許容引抜力 */}
      <CalculationDisplayBlock title="②杭の許容引抜力">
        <div className="space-y-4">
          <div className="p-2 bg-slate-100 rounded-md text-sm font-mono">
            <p>Pa＝Pu/Ｆ＋Ｗ</p>
          </div>
          <div className="text-xs space-y-1 my-2 text-slate-600">
            <p>Pa：杭頭における杭の軸方向許容引抜き力(kN)</p>
            <p>Pu：杭の極限引抜き力(kN)</p>
            <p>F：安全率(地震時1.5)</p>
            <p>W：杭の有効重量(kN)</p>
          </div>
          <EditableCalculationLine
            labelPrefix="杭の極限引抜き力Pu＝10／3ψ・Σ（Ns・Ls）＝"
            editableValue={data.Pu_sum_Ns_Ls_psi_result}
            onChange={(val) => handleChange("Pu_sum_Ns_Ls_psi_result", val)}
            labelSuffix="(kN)"
          />
          <p>よって、杭の許容引抜き力Paは、</p>
          <div className="p-2 bg-slate-100 rounded-md font-mono">
            <p>Pa＝Pu/Ｆ＋Ｗ＝Pu/Ｆ＋γ・Ａ・L</p>
          </div>
          <EditableCalculationLine
            labelPrefix="＝"
            editableValue={data.Pa_calc}
            onChange={(val) => handleChange("Pa_calc", val)}
            labelSuffix={`＝${data.Pa_result} (kN)`}
            inputWidthClass="w-full"
          />
        </div>
      </CalculationDisplayBlock>
    </div>
  )
}
