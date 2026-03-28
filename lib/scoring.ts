import type { PatientInsert, PhotoQualityAssessment, SkinConcern } from "@/lib/types";

type FormDraft = Omit<PatientInsert, "photo_quality_score" | "photo_status" | "readiness_score" | "summary" | "photo_url">;

const optionalFields: Array<keyof Pick<FormDraft, "previous_treatment" | "allergy" | "medication">> = [
  "previous_treatment",
  "allergy",
  "medication"
];

export function calculateFormCompleteness(formData: FormDraft) {
  const requiredValues = [
    formData.full_name,
    formData.age_range,
    formData.gender,
    formData.country,
    formData.skin_concern,
    formData.duration,
    formData.budget_range
  ];

  const requiredScore =
    requiredValues.filter((value) => value && value.toString().trim().length > 0).length / requiredValues.length;

  const optionalScore =
    optionalFields.filter((field) => formData[field].trim().length > 0).length / optionalFields.length;

  return Math.round((requiredScore * 0.8 + optionalScore * 0.2) * 100);
}

export function calculateReadinessScore(formCompleteness: number, photoQualityScore: number) {
  return Math.round(formCompleteness * 0.6 + photoQualityScore * 0.4);
}

export function inferSeverity(concern: SkinConcern, photo: PhotoQualityAssessment) {
  if (photo.status === "retake_required") {
    return "Pending clearer photo";
  }

  if (concern === "acne" || concern === "redness") {
    return photo.quality_score >= 85 ? "Moderate" : "Preliminary review needed";
  }

  if (concern === "scar" || concern === "wrinkle") {
    return photo.quality_score >= 85 ? "Mild to moderate" : "Preliminary review needed";
  }

  return photo.quality_score >= 85 ? "Moderate" : "Preliminary review needed";
}
