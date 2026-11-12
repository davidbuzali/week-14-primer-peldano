export type EvidenceStatus = 'measured' | 'quoted' | 'assumed'

export interface NumericInput {
  value: number
  status: EvidenceStatus
}

export interface PricingScenario {
  schemaVersion: 1
  id: string
  label: string
  createdAt: string
  updatedAt: string
  reviewCount: NumericInput
  currentReviewHoursPerCase: NumericInput
  currentClarificationHours: NumericInput
  employerLoadedHourlyCost: NumericInput
  currentExternalCosts: NumericInput
  pilotPrice: NumericInput
  deliveryHours: NumericInput
  deliveryHourlyCost: NumericInput
  toolsAndAdminCost: NumericInput
  validatedTimeSavedHours: NumericInput
  otherComparableEmployerValue: NumericInput
  note: string
}

export type ThresholdVerdict =
  | 'not-demonstrated'
  | 'mathematical-only'
  | 'supported-by-statuses'

export interface PricingResult {
  currentComparableCost: number
  requiredValueAtTenToOne: number
  providerDeliveryCost: number
  providerContribution: number
  providerContributionMargin: number | null
  comparableEmployerValue: number
  valueToPriceRatio: number | null
  verdict: ThresholdVerdict
  assumedValueInputs: string[]
}
