import CalculationDisplayBlock from "./CalculationDisplayBlock"

export default function Step7EvaluationResult() {
  return (
    <div className="space-y-4">
      <CalculationDisplayBlock title="(1)支持力" className="border-green-300">
        <p>下記のとおり、支持力が満足することを確認した。</p>
        <p className="font-semibold text-green-700">①杭の支持力: Pd＝1019.9(kN) ＜ Ra＝2631.45(kN) 【OK】</p>
        <p className="font-semibold text-green-700">②杭の引抜力: Ptd＝239.3(kN) ＜ Pa＝1592.58(kN) 【OK】</p>
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="(2)応力度照査" className="border-green-300">
        <p>下記のとおり、杭体の応力度を満足することを確認した。</p>
        <p className="font-semibold text-green-700">
          ①コンクリートの曲げ引張応力度fb: 2.65(N/mm²) ＜ fba＝5.0(N/mm²) 【OK】
        </p>
        <p className="font-semibold text-green-700">
          ②コンクリートの曲げ圧縮応力度fc: 26.57(N/mm²) ＜ fca＝48.0(N/mm²) 【OK】
        </p>
        <p className="font-semibold text-green-700">③最大せん断応力度τmax: 2.441(N/mm²) &lt; τa＝6.531(N/mm²) 【OK】</p>
      </CalculationDisplayBlock>
    </div>
  )
}
