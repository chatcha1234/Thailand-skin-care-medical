import OpenAI from "openai";
import { getServerEnv } from "@/lib/env";
import type { PhotoQualityAssessment, SkinPreAssessment } from "@/lib/types";

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

export async function evaluateSkinPreAssessment(imageBase64: string, mimeType: string): Promise<SkinPreAssessment> {
  const env = getServerEnv();
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
