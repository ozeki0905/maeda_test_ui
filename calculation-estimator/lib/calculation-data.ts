import type { CalculationData } from "@/types/calculation"

export const initialCalculationData: CalculationData = {
  structure: {
    kuiShu: "PHC杭",
    kubun: "C種",
    kuiKei: "700",
    kuiChou: "18.0",
    kanzanDanmenseki: "1,985",
    kanzanDanmen2jiMoment: "9,185×10^6",
    slabWidth: "23.0",
    slabThickness: "1.0",
    pileInterval: "1.75",
    slabShape: "正方形",
    totalPiles: "169",
  },
  material: {
    rebarConcrete: {
      enabled: true,
      unitWeight: "24.5",
    },
    phcPile: {
      prestress: "10",
      unitWeight: "24.5",
      compressiveStrength: "48",
      bendingTension: "5.0",
      shearTension: "1.5",
    },
  },
  ground: {
    layers: [
      {
        id: 1,
        depth: "0m ～ 1m",
        name: "表土・盛土",
        nValue: "5",
        unitWeight: "18.0",
        frictionAngle: "25",
        cohesion: "0.0",
      },
      {
        id: 2,
        depth: "1m ～ 5m",
        name: "関東ローム層",
        nValue: "3",
        unitWeight: "16.0",
        frictionAngle: "0",
        cohesion: "30.0",
      },
      {
        id: 3,
        depth: "5m ～ 17m",
        name: "シルト混じり砂層",
        nValue: "15",
        unitWeight: "18.0",
        frictionAngle: "30",
        cohesion: "0.0",
      },
      {
        id: 4,
        depth: "17m ～ ",
        name: "砂質土層（支持層）",
        nValue: "30",
        unitWeight: "18.0",
        frictionAngle: "35",
        cohesion: "0.0",
      },
    ],
    waterLevel: "-2.0",
    improvement: {
      enabled: false,
      standardNValue: "20", // 初期値を追加
      locations: ["① 0m ～ 1m：表土・盛土", "② 1m ～ 5m：関東ローム層"], // 初期値を追加
      layer: {
        id: 5,
        depth: "0m ～ 5m",
        name: "地盤改良体",
        nValue: "20",
        unitWeight: "18.0",
        frictionAngle: "35",
        cohesion: "0.0",
      },
    },
  },
  load: {
    tankWeight: {
      capacity: "6000",
      weight: "300",
      v1: "3000",
    },
    fuelWeight: {
      name: "航空燃料",
      capacity: "6000",
      density: "0.840",
      v2: "約50,000",
      v2_detail: "49,426",
    },
    seismicLoad: {
      kh: "0.300",
      kv: "0.150",
      kmh: "0.600",
      kmv: "0.300",
    },
    slabWeight: {
      unitWeight: "24.5",
      v3: "12,961",
    },
  },
  resultText: `(1)基礎構造形式
・基礎スラブの形状は、幅23.0(m)×奥行き23.0(m)×厚さ1.0(m)、体積は529.0(m3)となる。ただし、タンク形状と直径20.0(m)×高さ20.0(m)と仮定している。
・杭基礎は、PHC杭C種、杭径φ700(mm)、杭長L＝18.0(m)、本数が計169(本)となる。
・重要施設であることからレベル２地震時での検討、成田空港の軟弱な地盤であることから、地表面から5m程度にてN値が20程度となる地盤改良（サンドコンパクション工法等）が必要である。

(2)詳細設計時の留意点
・液状化判定を省略したため、詳細設計時に別途検討が必要である。
・概略設計のため、レベル２地震時での検討に際して、短期許容応力度にて評価している。このため、降伏応力度まで見込む場合は、杭仕様の低減によるコストダウンが可能である。
・荷重条件は概略で設定しているため、詳細設計時にて風荷重や内圧等を考慮する必要がある。
・詳細設計の段階にて、本タンク基礎近傍のおける地質調査及び土質試験が必要である`,
}
