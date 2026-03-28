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

export type LeadIntelligence = {
  lead_score: number;
  priority_label: "low" | "medium" | "high";
  conversion_summary: string;
  staff_summary: string;
  follow_up_reasons: string[];
};

export const leadStatusOptions = ["new", "contacted", "qualified", "closed"] as const;

export type LeadStatus = (typeof leadStatusOptions)[number];

export type InternationalLeadRecord = {
  id: string;
  created_at: string;
  full_name: string;
  country: string;
  concern: string;
  preferred_travel_month: string;
  budget_range: string;
  email: string;
  whatsapp: string;
  preferred_city: string;
  notes: string;
  photo_url: string;
  ai_primary_concern: string;
  ai_confidence_score: number;
  ai_photo_quality_status: string;
  ai_photo_quality_feedback: string;
  ai_recommended_treatments: string;
  ai_summary: string;
  ai_disclaimer: string;
  ai_lead_score: number;
  ai_priority_label: "low" | "medium" | "high";
  ai_conversion_summary: string;
  ai_staff_summary: string;
  ai_follow_up_reasons: string;
  lead_status: LeadStatus;
  staff_notes: string;
  assigned_to: string;
  next_action_at: string | null;
  contacted_at: string | null;
};
