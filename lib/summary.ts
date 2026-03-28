import { inferSeverity } from "@/lib/scoring";
import type { PatientInsert, PhotoQualityAssessment } from "@/lib/types";

export function buildClinicalSummary(
  patient: Omit<PatientInsert, "summary">,
  photoAssessment: PhotoQualityAssessment
) {
  const severity = inferSeverity(patient.skin_concern, photoAssessment);
  const previousTreatment = patient.previous_treatment.trim() || "None reported";
  const allergy = patient.allergy.trim() || "None reported";
  const medication = patient.medication.trim() || "None reported";
  const nextStep =
    photoAssessment.status === "usable"
      ? "Dermatology consultation"
      : "Patient should retake the photo before clinician review";

  return [
    "Patient Summary",
    "",
    `Name: ${patient.full_name}`,
    `Age Range: ${patient.age_range}`,
    `Gender: ${patient.gender}`,
    `Country: ${patient.country}`,
    `Concern: ${patient.skin_concern}`,
    `Duration: ${patient.duration}`,
    `Previous Treatment: ${previousTreatment}`,
    `Allergy: ${allergy}`,
    `Medication: ${medication}`,
    `Budget Range: ${patient.budget_range}`,
    `Severity: ${severity}`,
    `Next Step: ${nextStep}`
  ].join("\n");
}
