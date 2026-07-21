/**
 * Utility to load markdown content dynamically based on slug
 */

/**
 * Replaces {PLACEHOLDER} tokens using JSON data first, then VITE_ env vars.
 */
function interpolate(
  content: string,
  data: Record<string, unknown> = {}
): string {
  return content.replace(/\{([A-Z0-9_]+)\}/g, (match, key) => {
    if (key in data) return String(data[key]);
    const value = import.meta.env[`VITE_${key}`];
    return value !== undefined ? String(value) : match;
  });
}

export interface MarkdownContent {
  content: string;
  title?: string;
  description?: string;
  data?: Record<string, unknown>;
}

/**
 * Loads markdown content from the appropriate content directory.
 * Also attempts to load a companion JSON file (same slug) for template
 * variable substitution and structured data.
 * @param documentSlug - The document slug (filename without .md extension)
 * @param categorySlug - The category slug (parent directory)
 * @param categoryType - Whether this is a 'service' or 'government' document
 * @param lang - The current active language slug ('en' or 'fil')
 */
export async function loadMarkdownContent(
  documentSlug: string,
  categorySlug: string,
  categoryType: 'service' | 'government',
  lang?: string
): Promise<MarkdownContent> {
  try {
    const dir = categoryType === 'government' ? 'government' : 'services';

    // Try to load companion JSON for template data (Filipino first if applicable)
    let data: Record<string, unknown> = {};
    try {
      let jsonModule;
      if (lang === 'fil') {
        try {
          jsonModule = await import(
            `../../content/${dir}/${categorySlug}/${documentSlug}_fil.json`
          );
        } catch {
          jsonModule = await import(
            `../../content/${dir}/${categorySlug}/${documentSlug}.json`
          );
        }
      } else {
        jsonModule = await import(
          `../../content/${dir}/${categorySlug}/${documentSlug}.json`
        );
      }
      data = jsonModule.default;
    } catch {
      // No companion JSON — that's fine
    }

    let module;
    if (lang === 'fil') {
      try {
        module = await import(
          `../../content/${dir}/${categorySlug}/${documentSlug}_fil.md?raw`
        );
      } catch {
        // Fallback to English
        module = await import(
          `../../content/${dir}/${categorySlug}/${documentSlug}.md?raw`
        );
      }
    } else {
      module = await import(
        `../../content/${dir}/${categorySlug}/${documentSlug}.md?raw`
      );
    }
    const content = interpolate(module.default, data);

    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : undefined;

    const descriptionMatch = content.match(/^#\s+.+$\n\n(.+?)(?:\n\n|$)/s);
    const description = descriptionMatch
      ? descriptionMatch[1].replace(/^>\s*/, '').trim()
      : undefined;

    return { content, title, description, data };
  } catch (error) {
    console.error(
      'Failed to load markdown content for document: %s (%s)',
      documentSlug,
      lang || 'en',
      error
    );
    throw new Error('Document not found: ' + documentSlug);
  }
}
