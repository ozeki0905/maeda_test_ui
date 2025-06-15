import CalculationDisplayBlock from "./CalculationDisplayBlock"

export default function Step4BendingShearStress() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">
        (3)杭に作用する断面力より、各杭の断面力を用いて杭に発生する応力度を算出する。PHC杭に発生する曲げ応力度及びせん断応力度は、下記の通りとなる。
      </p>
      <div className="p-4 bg-slate-100 rounded-md text-sm font-mono space-y-1">
        <p>・コンクリートの曲げ引張応力度ft＝Ntd／Ae＋σe＋Md/Ie×ro</p>
        <p>・コンクリートの曲げ圧縮応力度fc＝Nd／Ae＋σe＋Md/Ie×ro</p>
        <p>・最大せん断応力度τmax＝Q・So／(2・t・I)</p>
        <p className="text-xs mt-2">
          ro：杭の外半径(mm)、曲げ圧縮側のとき正値、曲げ引張り側のとき負値とする。ro＝700／2＝350mm
        </p>
      </div>
      <CalculationDisplayBlock title="①コンクリートの曲げ引張応力度fb">
        <p>fb＝Ntd／Ae＋σe＋Md/Ie×ro</p>
        <p>＝-239.3×10³/1,985×10²＋10.0＋300.3×10⁶/9,185×10⁶×(-350)</p>
        <p className="font-semibold border-t pt-2 mt-2">＝-2.65(N/mm²)</p>
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="②コンクリートの曲げ圧縮応力度fc">
        <p>fc＝Nd／Ae＋σe＋Md/Ie×ro</p>
        <p>＝1019.9×10³/1,985×10²＋10.0＋300.3×10⁶/9,185×10⁶×350</p>
        <p className="font-semibold border-t pt-2 mt-2">＝26.57(N/mm²)</p>
      </CalculationDisplayBlock>
      <CalculationDisplayBlock title="③最大せん断応力度τmax">
        <p>τmax＝Q・So／(2・t・I)＝Sd・So／(2・t・I)</p>
        <p>＝234.2×10³×1.817×10⁷／（2・100・8.718×10⁹）</p>
        <p className="font-semibold border-t pt-2 mt-2">＝2.441(N/mm²)</p>
        <div className="text-xs pt-2 border-t mt-2 space-y-1">
          <p>So：杭の中立軸より片側にある杭断面の中立軸に対する断面１次モーメント</p>
          <p>So＝2/3（ro³－ri³）＝2/3×（350³－250³）＝1.817×10⁷(mm³)</p>
          <p>I：杭の中立軸に対する断面２次モーメント</p>
          <p>I＝π/4（ro⁴－ri⁴）＝π/4×（350⁴－250⁴）＝8.718×10⁹(mm⁴)</p>
          <p>t：杭の肉厚 t＝100(mm)</p>
          <p>ri：杭の内半径 ri＝（ro-2・t）＝(700-2・100)/2＝250(mm)</p>
        </div>
      </CalculationDisplayBlock>
    </div>
  )
}
