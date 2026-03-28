import OpenAI from "openai";
import { getServerEnv } from "@/lib/env";
import type { LeadIntelligence, PhotoQualityAssessment, SkinPreAssessment } from "@/lib/types";

const PHOTO_QUALITY_SYSTEM_PROMPT = `You are a clinical photo quality evaluator.

Evaluate the uploaded skin photo.

Check:

- blur
- lighting
- visibility
- angle

Return JSON only.

Format:

{
  "quality_score": number,
  "status": "usable" or "retake_required",
  "feedback": "short message"
}`;

export async function evaluatePhotoQuality(imageBase64: string, mimeType: string): Promise<PhotoQualityAssessment> {
  const env = getServerEnv();

  if (env.aiMode === "mock") {
    return {
      quality_score: 84,
      status: "usable",
      feedback: "Mock mode: photo is clear enough for a preliminary review, with minor lighting improvement recommended."
    };
  }

  const openai = new OpenAI({ apiKey: env.openAiApiKey });

  const response = await openai.responses.create({
    model: env.openAiModel,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: PHOTO_QUALITY_SYSTEM_PROMPT }]
      },
      {
        role: "user",
        content: [
          { type: "input_text", text: "Evaluate this uploaded clinical intake photo for readiness." },
          {
            type: "input_image",
            image_url: `data:${mimeType};base64,${imageBase64}`,
            detail: "auto"
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "photo_quality_assessment",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            quality_score: { type: "number" },
            status: { type: "string", enum: ["usable", "retake_required"] },
            feedback: { type: "string" }
          },
          required: ["quality_score", "status", "feedback"]
        }
      }
    }
  });

  const output = response.output_text;

  if (!output) {
    throw new Error("OpenAI did not return a photo quality assessment.");
  }

  const parsed = JSON.parse(output) as PhotoQualityAssessment;

  return {
    quality_score: Math.max(0, Math.min(100, Math.round(parsed.quality_score))),
    status: parsed.status,
    feedback: parsed.feedback
  };
}

const SKIN_PREASSESSMENT_SYSTEM_PROMPT = `You are an AI assistant for an international skincare medical tourism website.

Your role is to provide a preliminary skin concern pre-screening from a patient photo and match the case to likely treatment categories.

This is not a medical diagnosis.

Evaluate:
- likely primary concern
- whether the uploaded photo is usable for preliminary review
- short photo quality feedback
- 2 to 4 recommended treatment categories
- a short patient-friendly summary

Return JSON only.`;

const LEAD_INTELLIGENCE_SYSTEM_PROMPT = `You are an operations AI assistant for an international skincare medical tourism business.

Your task is to score how promising a new lead is for fast follow-up and give the staff a concise action summary.

Consider:
- clarity of concern
- travel readiness
- budget readiness
- whether contact info is usable
- whether photo-based AI outputs strengthen confidence

Return JSON only.`;

export async function evaluateSkinPreAssessment(imageBase64: string, mimeType: string): Promise<SkinPreAssessment> {
  const env = getServerEnv();

  if (env.aiMode === "mock") {
    return getMockSkinPreAssessment();
  }

  const openai = new OpenAI({ apiKey: env.openAiApiKey });

  const response = await openai.responses.create({
    model: env.openAiModel,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: SKIN_PREASSESSMENT_SYSTEM_PROMPT }]
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: "Review this skin photo for a preliminary concern pre-screening and treatment matching recommendation for a Thailand medical tourism website."
          },
          {
            type: "input_image",
            image_url: `data:${mimeType};base64,${imageBase64}`,
            detail: "auto"
          }
        ]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "skin_pre_assessment",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            primary_concern: {
              type: "string",
              enum: ["acne", "pigmentation", "redness", "scarring", "anti-aging", "general skin quality"]
            },
            confidence_score: { type: "number" },
            photo_quality_status: { type: "string", enum: ["usable", "retake_recommended"] },
            photo_quality_feedback: { type: "string" },
            recommended_treatments: {
              type: "array",
              items: { type: "string" },
              minItems: 2,
              maxItems: 4
            },
            summary: { type: "string" },
            disclaimer: { type: "string" }
          },
          required: [
            "primary_concern",
            "confidence_score",
            "photo_quality_status",
            "photo_quality_feedback",
            "recommended_treatments",
            "summary",
            "disclaimer"
          ]
        }
      }
    }
  });

  const output = response.output_text;

  if (!output) {
    throw new Error("OpenAI did not return a skin pre-assessment.");
  }

  const parsed = JSON.parse(output) as SkinPreAssessment;

  return {
    primary_concern: parsed.primary_concern,
    confidence_score: Math.max(0, Math.min(100, Math.round(parsed.confidence_score))),
    photo_quality_status: parsed.photo_quality_status,
    photo_quality_feedback: parsed.photo_quality_feedback,
    recommended_treatments: parsed.recommended_treatments,
    summary: parsed.summary,
    disclaimer: parsed.disclaimer
  };
}

function getMockSkinPreAssessment(): SkinPreAssessment {
  const mockProfiles: SkinPreAssessment[] = [
    {
      primary_concern: "acne",
      confidence_score: 88,
      photo_quality_status: "usable",
      photo_quality_feedback: "Mock mode: the uploaded photo is clear enough for a preliminary acne-related review.",
      recommended_treatments: ["Acne Treatment", "Laser Skin Rejuvenation", "Acne Clear Starter"],
      summary: "Mock AI suggests the photo is most consistent with an acne-focused concern and recommends starting with an online consultation plus a dermatologist-led acne plan.",
      disclaimer: "Mock AI result for demo purposes only. This is preliminary guidance and not a medical diagnosis."
    },
    {
      primary_concern: "pigmentation",
      confidence_score: 85,
      photo_quality_status: "usable",
      photo_quality_feedback: "Mock mode: lighting and angle are acceptable for a pigmentation-focused preliminary review.",
      recommended_treatments: ["Pigmentation & Melasma", "Laser Skin Rejuvenation", "Brightening & Pigmentation Plan"],
      summary: "Mock AI suggests a pigmentation-related concern and recommends comparing brightening pathways with a travel-timed consultation.",
      disclaimer: "Mock AI result for demo purposes only. This is preliminary guidance and not a medical diagnosis."
    },
    {
      primary_concern: "anti-aging",
      confidence_score: 81,
      photo_quality_status: "retake_recommended",
      photo_quality_feedback: "Mock mode: the photo is usable for demo output, but a brighter and more front-facing image would improve review quality.",
      recommended_treatments: ["Anti-Aging & Rejuvenation", "Skin Rejuvenation Facial Programs", "Anti-Aging Weekend Program"],
      summary: "Mock AI suggests an anti-aging or rejuvenation-focused concern and recommends a consultation to match goals with downtime and trip length.",
      disclaimer: "Mock AI result for demo purposes only. This is preliminary guidance and not a medical diagnosis."
    }
  ];

  const index = Math.floor(Math.random() * mockProfiles.length);
  return mockProfiles[index];
}

export async function evaluateLeadIntelligence(input: {
  full_name: string;
  country: string;
  concern: string;
  preferred_travel_month: string;
  budget_range: string;
  email: string;
  whatsapp: string;
  preferred_city: string;
  notes: string;
  ai_primary_concern?: string;
  ai_confidence_score?: number;
  ai_photo_quality_status?: string;
  ai_recommended_treatments?: string[];
  ai_summary?: string;
}): Promise<LeadIntelligence> {
  const env = getServerEnv();

  if (env.aiMode === "mock") {
    return getMockLeadIntelligence(input);
  }

  const openai = new OpenAI({ apiKey: env.openAiApiKey });

  const response = await openai.responses.create({
    model: env.openAiModel,
    input: [
      {
        role: "system",
        content: [{ type: "input_text", text: LEAD_INTELLIGENCE_SYSTEM_PROMPT }]
      },
      {
        role: "user",
        content: [{ type: "input_text", text: JSON.stringify(input) }]
      }
    ],
    text: {
      format: {
        type: "json_schema",
        name: "lead_intelligence",
        schema: {
          type: "object",
          additionalProperties: false,
          properties: {
            lead_score: { type: "number" },
            priority_label: { type: "string", enum: ["low", "medium", "high"] },
            conversion_summary: { type: "string" },
            staff_summary: { type: "string" },
            follow_up_reasons: {
              type: "array",
              items: { type: "string" },
              minItems: 2,
              maxItems: 4
            }
          },
          required: ["lead_score", "priority_label", "conversion_summary", "staff_summary", "follow_up_reasons"]
        }
      }
    }
  });

  const output = response.output_text;

  if (!output) {
    throw new Error("OpenAI did not return lead intelligence.");
  }

  const parsed = JSON.parse(output) as LeadIntelligence;

  return {
    lead_score: Math.max(0, Math.min(100, Math.round(parsed.lead_score))),
    priority_label: parsed.priority_label,
    conversion_summary: parsed.conversion_summary,
    staff_summary: parsed.staff_summary,
    follow_up_reasons: parsed.follow_up_reasons
  };
}

function getMockLeadIntelligence(input: {
  concern: string;
  preferred_travel_month: string;
  budget_range: string;
  whatsapp: string;
  notes: string;
  ai_confidence_score?: number;
  ai_photo_quality_status?: string;
}): LeadIntelligence {
  let score = 52;

  if (input.preferred_travel_month && input.preferred_travel_month !== "Not decided yet") {
    score += 12;
  }

  if (input.whatsapp) {
    score += 8;
  }

  if (input.notes.length > 20) {
    score += 8;
  }

  if (input.budget_range.includes("Above") || input.budget_range.includes("40,000")) {
    score += 10;
  }

  if ((input.ai_confidence_score ?? 0) >= 80) {
    score += 8;
  }

  if (input.ai_photo_quality_status === "usable") {
    score += 6;
  }

  const boundedScore = Math.max(0, Math.min(100, score));
  const priorityLabel = boundedScore >= 75 ? "high" : boundedScore >= 55 ? "medium" : "low";

  return {
    lead_score: boundedScore,
    priority_label: priorityLabel,
    conversion_summary:
      priorityLabel === "high"
        ? "Mock AI sees this as a conversion-ready lead with clear intent, reachable contact details, and enough planning detail to prioritize fast outreach."
        : priorityLabel === "medium"
          ? "Mock AI sees moderate buying intent. The lead looks workable, but the team should confirm timing, budget, and treatment expectations quickly."
          : "Mock AI sees a lower-confidence lead. More qualification is needed before investing high-touch follow-up time.",
    staff_summary: `Follow up on the ${input.concern.toLowerCase()} concern, confirm travel timing around ${input.preferred_travel_month.toLowerCase()}, and qualify the stated budget before proposing the next step.`,
    follow_up_reasons: [
      input.whatsapp ? "Direct contact channel is available for faster outreach." : "No fast messaging channel was provided yet.",
      input.notes.length > 20 ? "The lead shared extra context that can help tailor the first reply." : "The team should gather more context during the first follow-up.",
      (input.ai_confidence_score ?? 0) >= 80
        ? "AI pre-screening confidence is strong enough to support a tailored next step."
        : "AI confidence is limited, so manual qualification matters more."
    ]
  };
}
