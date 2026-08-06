/**
 * URL and content sanitization utilities for block content.
 * Prevents CSS injection and malicious URL schemes.
 */

const ALLOWED_URL_SCHEMES = ['https:', 'http:', 'mailto:', 'tel:'];
const ALLOWED_RELATIVE_PREFIXES = ['/', '#', '?'];

/**
 * Validates and sanitizes a URL string.
 * Only allows http(s), mailto, tel schemes and relative URLs.
 * Returns empty string for invalid/malicious URLs.
 */
export function sanitizeUrl(url: string | undefined | null): string {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();
  if (!trimmed) return '';

  // Allow relative URLs (starting with /, #, or ?)
  if (ALLOWED_RELATIVE_PREFIXES.some((prefix) => trimmed.startsWith(prefix))) {
    return trimmed;
  }

  // Check for valid URL scheme
  try {
    const parsed = new URL(trimmed);
    if (ALLOWED_URL_SCHEMES.includes(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    // Not a valid absolute URL and not a relative URL
  }

  return '';
}

/**
 * Sanitizes a CSS background image URL.
 * Prevents CSS injection via url() values.
 */
export function sanitizeBackgroundImageUrl(url: string | undefined | null): string {
  const sanitized = sanitizeUrl(url);
  if (!sanitized) return '';

  // Additional CSS-specific checks: reject values containing CSS-dangerous characters
  if (/[;{}()\\]/.test(sanitized) && !sanitized.startsWith('http')) {
    return '';
  }

  return sanitized;
}

/**
 * Validates block content URLs before saving.
 * Returns an array of validation error messages.
 */
export function validateBlockContent(
  blockType: string,
  content: Record<string, unknown>
): string[] {
  const errors: string[] = [];

  const urlFields: Record<string, string[]> = {
    hero: ['backgroundImage', 'buttonLink'],
    image: ['src'],
    cta: ['buttonLink'],
    cards: [],
    gallery: [],
  };

  const fields = urlFields[blockType];
  if (fields) {
    for (const field of fields) {
      const value = content[field] as string | undefined;
      if (value && !sanitizeUrl(value)) {
        errors.push(`Invalid URL in "${field}": only http(s), mailto, tel, or relative URLs are allowed.`);
      }
    }
  }

  // Validate nested URLs in cards
  if (blockType === 'cards' && Array.isArray(content.cards)) {
    for (const card of content.cards as Array<{ link?: string }>) {
      if (card.link && !sanitizeUrl(card.link)) {
        errors.push(`Invalid card link URL: only http(s), mailto, tel, or relative URLs are allowed.`);
      }
    }
  }

  // Validate nested URLs in gallery
  if (blockType === 'gallery' && Array.isArray(content.images)) {
    for (const img of content.images as Array<{ src?: string }>) {
      if (img.src && !sanitizeUrl(img.src)) {
        errors.push(`Invalid gallery image URL: only http(s), mailto, tel, or relative URLs are allowed.`);
      }
    }
  }

  return errors;
}
