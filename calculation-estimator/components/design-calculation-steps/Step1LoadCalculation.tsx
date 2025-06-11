"use client"

import CalculationDisplayBlock from "./CalculationDisplayBlock"
import EditableCalculationLine from "./EditableCalculationLine"
import type { LoadCalculationData, DesignCalculationState } from "@/types/design-calculation"

interface Props {
  data: LoadCalculationData
  updateData: (stepKey: keyof DesignCalculationState, fieldKey: keyof LoadCalculationData, value: string) => void
}

export default function Step1LoadCalculation({ data, updateData }: Props) {
  const handleChange = (field: keyof LoadCalculationData, value: string) => {
    updateData("loadCalculation", field, value)
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">
        ４.設計条件(4)荷重条件より、基礎スラブ下端における設計荷重は下記の通りとなる。
        <br />
        なお、本検討では杭仕様算定の概略検討のため、設計ケースはL2地震時のみ（上下動込み）とする。
      </p>
      <CalculationDisplayBlock title="①-1 鉛直力ΣV">
        <EditableCalculationLine
          labelPrefix="貯蔵タンク自重V1＝"
          editableValue={data.V1_tankWeight}
          onChange={(val) => handleChange("V1_tankWeight", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="貯蔵する危険物の重量V2＝"
          editableValue={data.V2_fuelWeight}
          onChange={(val) => handleChange("V2_fuelWeight", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="基礎スラブ自重V3＝"
          editableValue={data.V3_slabWeight}
          onChange={(val) => handleChange("V3_slabWeight", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="鉛直力ΣV＝V1＋V2＋V3＝"
          editableValue={data.Sigma_V_result}
          onChange={(val) => handleChange("Sigma_V_result", val)}
          labelSuffix="(kN)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>

      <CalculationDisplayBlock title="②水平力ΣH">
        <EditableCalculationLine
          labelPrefix="水平方向の設計修正震度KMH＝"
          editableValue={data.KMH}
          onChange={(val) => handleChange("KMH", val)}
        />
        <EditableCalculationLine
          labelPrefix={`貯蔵タンク慣性力H1＝V1×KMH＝${data.H1_calc_values}＝`}
          editableValue={data.H1_result}
          onChange={(val) => handleChange("H1_result", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix={`貯蔵する危険物の慣性力H2＝V2×KMH＝${data.H2_calc_values}＝`}
          editableValue={data.H2_result}
          onChange={(val) => handleChange("H2_result", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix={`基礎スラブの慣性力H3＝V3×KMH＝${data.H3_calc_values}＝`}
          editableValue={data.H3_result}
          onChange={(val) => handleChange("H3_result", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="水平力ΣH＝H1＋H2＋H3＝"
          editableValue={data.Sigma_H_result}
          onChange={(val) => handleChange("Sigma_H_result", val)}
          labelSuffix="(kN)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>

      <CalculationDisplayBlock title="③曲げモーメントΣM">
        <EditableCalculationLine
          labelPrefix={`貯蔵タンク慣性力のアーム長L1＝貯蔵タンク高さh0/2＋基礎スラブ厚さh1＝${data.L1_calc_values}＝`}
          editableValue={data.L1_result}
          onChange={(val) => handleChange("L1_result", val)}
          labelSuffix="(m)"
        />
        <EditableCalculationLine
          labelPrefix={`貯蔵タンク慣性力による曲げモーメントM1＝H1×L1＝${data.M1_calc_values}＝`}
          editableValue={data.M1_result}
          onChange={(val) => handleChange("M1_result", val)}
          labelSuffix="(kN・m)"
        />
        <EditableCalculationLine
          labelPrefix="貯蔵する危険物の慣性力のアーム長L2＝L1＝"
          editableValue={data.L2_result}
          onChange={(val) => handleChange("L2_result", val)}
          labelSuffix="(m)"
        />
        <EditableCalculationLine
          labelPrefix={`貯蔵する危険物の慣性力による曲げモーメントM2＝H2×L2＝${data.M2_calc_values}＝`}
          editableValue={data.M2_result}
          onChange={(val) => handleChange("M2_result", val)}
          labelSuffix="(kN・m)"
        />
        <EditableCalculationLine
          labelPrefix={`基礎スラブの慣性力のアーム長L3＝基礎スラブ厚さh1/2＝${data.L3_calc_values}＝`}
          editableValue={data.L3_result}
          onChange={(val) => handleChange("L3_result", val)}
          labelSuffix="(m)"
        />
        <EditableCalculationLine
          labelPrefix={`基礎スラブの慣性力による曲げモーメントM3＝H3×L3＝${data.M3_calc_values}＝`}
          editableValue={data.M3_result}
          onChange={(val) => handleChange("M3_result", val)}
          labelSuffix="(kN・m)"
        />
        <EditableCalculationLine
          labelPrefix="曲げモーメントΣM＝M1＋M2＋M3＝"
          editableValue={data.Sigma_M_result}
          onChange={(val) => handleChange("Sigma_M_result", val)}
          labelSuffix="(kN・m)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>

      <CalculationDisplayBlock title="①-2 鉛直地震動を考慮した鉛直力ΣV(+)、ΣV(-)">
        <EditableCalculationLine
          labelPrefix="鉛直方向の設計修正震度KMV＝"
          editableValue={data.KMV}
          onChange={(val) => handleChange("KMV", val)}
        />
        <EditableCalculationLine
          labelPrefix={`上向きの鉛直地震動を考慮した鉛直力ΣV(+)＝ΣV×(1-KMV)＝${data.Sigma_V_plus_calc_values}＝`}
          editableValue={data.Sigma_V_plus_result}
          onChange={(val) => handleChange("Sigma_V_plus_result", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix={`下向きの鉛直地震動を考慮した鉛直力ΣV(-)＝ΣV×(1+KMV)＝${data.Sigma_V_minus_calc_values}＝`}
          editableValue={data.Sigma_V_minus_result}
          onChange={(val) => handleChange("Sigma_V_minus_result", val)}
          labelSuffix="(kN)"
        />
      </CalculationDisplayBlock>
    </div>
  )
}
