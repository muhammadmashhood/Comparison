
export interface PriceData {
  propertyName: string;
  roomType: string;
  pricePerWeek: number;
  isIconInc: boolean;
  amenities: string[];
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface AnalysisResult {
  summary: string;
  comparisonData: PriceData[];
  sources: GroundingSource[];
}
