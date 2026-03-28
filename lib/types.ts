export const skinConcernOptions = [
  "acne",
  "pigmentation",
  "wrinkle",
  "scar",
  "redness"
] as const;

export const durationOptions = [
  "less than 1 month",
  "1-6 months",
  "more than 6 months"
] as const;

export const budgetOptions = [
  "below 5000 THB",
  "5000-15000 THB",
  "above 15000 THB"
] as const;

export type SkinConcern = (typeof skinConcernOptions)[number];
export type DurationOption = (typeof durationOptions)[number];
export type BudgetOption = (typeof budgetOptions)[number];

export type PatientInsert = {
  full_name: string;
  age_range: string;
  gender: string;
  country: string;
  skin_concern: SkinConcern;
  duration: DurationOption;
  previous_treatment: string;
  allergy: string;
  medication: string;
  budget_range: BudgetOption;
  photo_url: string;
  photo_quality_score: number;
  photo_status: "usable" | "retake_required";
  readiness_score: number;
  summary: string;
};

export type PatientRecord = PatientInsert & {
  id: string;
  created_at: string;
  photo_feedback: string;
};

export type PhotoQualityAssessment = {
  quality_score: number;
  status: "usable" | "retake_required";
  feedback: string;
};

export type SkinPreAssessment = {
  primary_concern: "acne" | "pigmentation" | "redness" | "scarring" | "anti-aging" | "general skin quality";
  confidence_score: number;
  photo_quality_status: "usable" | "retake_recommended";
  photo_quality_feedback: string;
  recommended_treatments: string[];
  summary: string;
  disclaimer: string;
};
