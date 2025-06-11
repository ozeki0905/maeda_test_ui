export interface StructureData {
  kuiShu: string
  kubun: string
  kuiKei: string
  kuiChou: string
  kanzanDanmenseki: string
  kanzanDanmen2jiMoment: string
  slabWidth: string
  slabThickness: string
  pileInterval: string
  slabShape: string
  totalPiles: string
}

export interface MaterialData {
  rebarConcrete: {
    enabled: boolean
    unitWeight: string
  }
  phcPile: {
    prestress: string
    unitWeight: string
    compressiveStrength: string
    bendingTension: string
    shearTension: string
  }
}

export interface GroundLayer {
  id: number
  depth: string
  name: string
  nValue: string
  unitWeight: string
  frictionAngle: string
  cohesion: string
}

export interface GroundData {
  layers: GroundLayer[]
  waterLevel: string
  improvement: {
    enabled: boolean
    standardNValue: string // 基準N値を追加
    locations: string[] // 改良箇所を追加
    layer: GroundLayer
  }
}

export interface LoadData {
  tankWeight: {
    capacity: string
    weight: string
    v1: string
  }
  fuelWeight: {
    name: string
    capacity: string
    density: string
    v2: string
    v2_detail: string
  }
  seismicLoad: {
    kh: string
    kv: string
    kmh: string
    kmv: string
  }
  slabWeight: {
    unitWeight: string
    v3: string
  }
}

export interface CalculationData {
  structure: StructureData
  material: MaterialData
  ground: GroundData
  load: LoadData
  resultText: string
}
