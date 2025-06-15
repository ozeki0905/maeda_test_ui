"use client"
import CalculationDisplayBlock from "./CalculationDisplayBlock"
import EditableCalculationLine from "./EditableCalculationLine"
import type { SectionalForceData, DesignCalculationState } from "@/types/design-calculation"

interface Props {
  data: SectionalForceData
  updateData: (stepKey: keyof DesignCalculationState, fieldKey: keyof SectionalForceData, value: string) => void
}

export default function Step3SectionalForce({ data, updateData }: Props) {
  const handleChange = (field: keyof SectionalForceData, value: string) => {
    updateData("sectionalForce", field, value)
  }
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">
        (2)杭１本当たりの反力より、杭に作用する断面力（曲げモーメント・軸力・せん断力）を算出する。
      </p>
      <div className="p-4 bg-slate-100 rounded-md text-sm font-mono space-y-1">
        <p>曲げモーメントMd＝Hd／2β</p>
        <p>軸力（押込）Nd＝Pd</p>
        <p>軸力（引抜）Ntd＝Ptd</p>
        <p>せん断力Sd＝Hd</p>
      </div>
      <CalculationDisplayBlock title="①曲げモーメントMd">
        <p className="text-sm text-slate-600">
          ４.設計条件(3)地盤条件と杭仕様より、杭の影響範囲1/βを算定する。本基礎の杭仕様はPHC杭φ700のため、補足資料２：PHC杭のβ・kh一覧表より、各地盤のN値における杭の特性値β及び杭の影響範囲1/βは下記の通りとなる。
        </p>
        <EditableCalculationLine
          labelPrefix="0m ～ 5m：地盤改良 厚さ5.0m N=20 β＝"
          editableValue={data.beta_ground_improvement_value}
          onChange={(val) => handleChange("beta_ground_improvement_value", val)}
          labelSuffix={`⇒1/β＝${data.beta_ground_improvement_calc}(m)`}
        />
        <EditableCalculationLine
          labelPrefix="5m ～ 17m：シルト混じり砂層 厚さ12.0m N＝15 β＝"
          editableValue={data.beta_silt_layer_value}
          onChange={(val) => handleChange("beta_silt_layer_value", val)}
          labelSuffix={`⇒1/β＝${data.beta_silt_layer_calc}(m)`}
        />
        <EditableCalculationLine
          labelPrefix="よって、杭の影響範囲1/βは、全て地盤改良となるため、β＝"
          editableValue={data.effective_beta}
          onChange={(val) => handleChange("effective_beta", val)}
        />
        <EditableCalculationLine
          labelPrefix="Hd＝"
          editableValue={data.Md_Hd}
          onChange={(val) => handleChange("Md_Hd", val)}
          labelSuffix="(kN)であるため、"
        />
        <EditableCalculationLine
          labelPrefix={`Md＝H/2β＝${data.Md_calc_values}＝`}
          editableValue={data.Md_result}
          onChange={(val) => handleChange("Md_result", val)}
          labelSuffix="(kN・m)"
          isTitle
          className="border-t pt-2 mt-2"
        />
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="②軸力（押込）Nd">
        <EditableCalculationLine
          labelPrefix={`Nd＝Pd＝`}
          editableValue={data.Nd_result}
          onChange={(val) => handleChange("Nd_result", val)}
          labelSuffix="(kN)"
          isTitle
        />
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="③軸力（引抜）Ntd">
        <EditableCalculationLine
          labelPrefix={`Ntd＝Ptd＝`}
          editableValue={data.Ntd_result}
          onChange={(val) => handleChange("Ntd_result", val)}
          labelSuffix="(kN)"
          isTitle
        />
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="④せん断力Sd">
        <EditableCalculationLine
          labelPrefix={`Sd＝Hd＝`}
          editableValue={data.Sd_result}
          onChange={(val) => handleChange("Sd_result", val)}
          labelSuffix="(kN)"
          isTitle
        />
      </CalculationDisplayBlock>
    </div>
  )
}
