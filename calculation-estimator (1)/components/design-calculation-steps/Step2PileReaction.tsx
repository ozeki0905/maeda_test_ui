"use client"
import CalculationDisplayBlock from "./CalculationDisplayBlock"
import EditableCalculationLine from "./EditableCalculationLine"
import type { PileReactionData, DesignCalculationState } from "@/types/design-calculation"

interface Props {
  data: PileReactionData
  updateData: (stepKey: keyof DesignCalculationState, fieldKey: keyof PileReactionData, value: string) => void
}

export default function Step2PileReaction({ data, updateData }: Props) {
  const handleChange = (field: keyof PileReactionData, value: string) => {
    updateData("pileReaction", field, value)
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">
        (1)荷重計算より、基礎スラブ下端における設計荷重を用いて杭１本当たりの反力を算出する。杭１本当たりの反力計算式は下記の通りとなる。
        <br />
        なお、本検討では設計鉛直力・設計引抜力は最大値のみを算定するため、設計鉛直力算出時が鉛直動下向き（ΣV(-))、設計引抜力算出時が鉛直上向き（ΣV(+))を用いることとする。
      </p>
      <div className="p-4 bg-slate-100 rounded-md text-sm font-mono space-y-1">
        <p>・杭１本当たりの設計鉛直力Pd＝ΣV(-)/Σn＋ΣM/Σx²×xi</p>
        <p>・杭１本当たりの設計引抜力Ptd＝ΣV(+)/Σn＋ΣM/Σx²×xi</p>
        <p>・杭１本当たりの設計水平力Hd＝ΣH/Σn</p>
      </div>
      <CalculationDisplayBlock title="①杭１本当たりの設計鉛直力Pd">
        <EditableCalculationLine
          labelPrefix="ΣV(-)＝"
          editableValue={data.Pd_Sigma_V_minus}
          onChange={(val) => handleChange("Pd_Sigma_V_minus", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="Σn＝"
          editableValue={data.Pd_Sigma_n}
          onChange={(val) => handleChange("Pd_Sigma_n", val)}
          labelSuffix="(本)"
        />
        <EditableCalculationLine
          labelPrefix="ΣM＝"
          editableValue={data.Pd_Sigma_M}
          onChange={(val) => handleChange("Pd_Sigma_M", val)}
          labelSuffix="(kN・m)"
        />
        <EditableCalculationLine
          labelPrefix="Σx²＝"
          editableValue={data.Pd_Sigma_x_squared}
          onChange={(val) => handleChange("Pd_Sigma_x_squared", val)}
          labelSuffix="(本・m²)"
        />
        <p className="mt-2">
          設計鉛直力Pdは、曲げモーメントが正の場合、正側の最外縁にある杭が最も大きくなるため、xi＝x1＝10.5m
        </p>
        <EditableCalculationLine
          labelPrefix={`杭１本当たりの設計鉛直力 Pd＝${data.Pd_calc_values}＝`}
          editableValue={data.Pd_result}
          onChange={(val) => handleChange("Pd_result", val)}
          labelSuffix="(kN)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="②杭１本当たりの設計引抜力Ptd">
        <EditableCalculationLine
          labelPrefix="ΣV(+)＝"
          editableValue={data.Ptd_Sigma_V_plus}
          onChange={(val) => handleChange("Ptd_Sigma_V_plus", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="Σn＝"
          editableValue={data.Ptd_Sigma_n}
          onChange={(val) => handleChange("Ptd_Sigma_n", val)}
          labelSuffix="(本)"
        />
        <EditableCalculationLine
          labelPrefix="ΣM＝"
          editableValue={data.Ptd_Sigma_M}
          onChange={(val) => handleChange("Ptd_Sigma_M", val)}
          labelSuffix="(kN・m)"
        />
        <EditableCalculationLine
          labelPrefix="Σx²＝"
          editableValue={data.Ptd_Sigma_x_squared}
          onChange={(val) => handleChange("Ptd_Sigma_x_squared", val)}
          labelSuffix="(本・m²)"
        />
        <p className="mt-2">
          設計引抜力Ptdは、曲げモーメントが正の場合、負側の最外縁にある杭が最も大きくなるため、xi＝x13＝-10.5m
        </p>
        <EditableCalculationLine
          labelPrefix={`杭１本当たりの設計引抜力 Ptd＝${data.Ptd_calc_values}＝`}
          editableValue={data.Ptd_result}
          onChange={(val) => handleChange("Ptd_result", val)}
          labelSuffix="(kN)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="③杭１本当たりの設計水平力Hd">
        <EditableCalculationLine
          labelPrefix="ΣH＝"
          editableValue={data.Hd_Sigma_H}
          onChange={(val) => handleChange("Hd_Sigma_H", val)}
          labelSuffix="(kN)"
        />
        <EditableCalculationLine
          labelPrefix="Σn＝"
          editableValue={data.Hd_Sigma_n}
          onChange={(val) => handleChange("Hd_Sigma_n", val)}
          labelSuffix="(本)"
        />
        <EditableCalculationLine
          labelPrefix={`杭１本当たりの設計水平力 Hd=ΣH/Σn＝${data.Hd_calc_values}＝`}
          editableValue={data.Hd_result}
          onChange={(val) => handleChange("Hd_result", val)}
          labelSuffix="(kN)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>
    </div>
  )
}
