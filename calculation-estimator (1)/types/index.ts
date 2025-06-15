// Type for a single soil layer
export type RyousouLayer = {
  id: number
  start: string
  end: string
  description: string
}

// Add seismicPerformance to FormData
export interface FormData {
  jitsubutsuShubetsuShu: string
  jitsubutsuShubetsuJu: string
  nenryoumei: string
  suuryou: string
  itemLocationResult: import("@/components/steps/Step2ItemLocation").ItemLocationResult | null
  facilityChecks: import("@/components/steps/Step2ItemLocation").FacilityCheck[]
  selectedFacilityName: string | null
  tankShape: string
  tankDiameter: string
  tankHeight: string
  ichiJouhou: string // This will now be input in Step 2
  siteEvaluationResult: import("@/components/steps/Step4SiteEvaluation").SiteEvaluationResult | null
  ryousouLayers: RyousouLayer[]
  environmentalCharacteristics: import("@/app/page").EnvironmentalCharacteristic[]
  importance: string // This will now be input in Step 3
  seismicPerformance: string // New field for seismic performance, input in Step 3
  kisoKeishiki: string
}
