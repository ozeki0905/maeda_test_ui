import CalculationDisplayBlock from "./CalculationDisplayBlock"

export default function Step5AllowableStress() {
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-700">４.設計条件(2)材料条件より、下記の通りとなる。</p>
      <div className="p-4 bg-slate-100 rounded-md text-sm font-mono space-y-1">
        <p>・短期許容曲げ引張応力度-ft＝-5.0(N/mm²)</p>
        <p>・短期許容曲げ圧縮応力度fc＝48.0(N/mm²)</p>
      </div>
      <CalculationDisplayBlock title="許容せん断応力度">
        <p>許容せん断応力度については、PHC杭の場合、下記の通りとなる。</p>
        <p>許容せん断応力度τa＝1/2×√｛（σg＋２σd）²－σg²｝</p>
        <p>＝1/2×√｛(8.731＋２×1.8）²－8.731²｝</p>
        <p>＝4.354(N/mm²)</p>
        <div className="text-xs pt-2 border-t mt-2 space-y-1">
          <p>σg：軸方向応力度</p>
          <p>σg＝σe＋N/Ac＝10.0＋（－239.3）×10³/188,500＝8.731(N/mm²)</p>
          <p>σd：コンクリートの許容斜応力度 σd＝1.8(N/mm²)</p>
        </div>
        <p className="mt-2">短期許容せん断応力度は長期の1.5倍となるため、</p>
        <p className="font-semibold border-t pt-2 mt-2">τa＝1.5×4.354(N/mm²)＝6.531(N/mm²)</p>
      </CalculationDisplayBlock>
    </div>
  )
}
