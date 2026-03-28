export type Locale = "en" | "th";

export type LocalizedText = {
  en: string;
  th: string;
};

export function localized(en: string, th: string): LocalizedText {
  return { en, th };
}

export function getLocalizedText(locale: Locale, value: LocalizedText | string) {
  if (typeof value === "string") {
    return value;
  }

  return value[locale];
}
