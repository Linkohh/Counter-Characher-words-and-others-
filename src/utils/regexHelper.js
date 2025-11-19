/**
 * Regex helper utilities for Find & Replace functionality
 * Provides safe regex creation and text replacement operations
 */

/**
 * Safely creates a RegExp object with error handling
 * @param {string} pattern - The regex pattern string
 * @param {string} flags - Regex flags (e.g., 'gi', 'g', 'i')
 * @returns {RegExp|null} - Returns the RegExp object or null if invalid
 */
export const safeCreateRegex = (pattern, flags = '') => {
  if (!pattern) return null;

  try {
    return new RegExp(pattern, flags);
  } catch (error) {
    // Pattern is invalid (e.g., unclosed bracket, invalid escape)
    return null;
  }
};

/**
 * Escapes special regex characters in a string to treat it as literal
 * @param {string} str - The string to escape
 * @returns {string} - Escaped string safe for use in RegExp
 */
const escapeRegexChars = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Performs find and replace operation on text
 * @param {string} text - The source text to modify
 * @param {string} find - The search pattern/string
 * @param {string} replace - The replacement string
 * @param {boolean} isRegex - Whether to treat find as a regex pattern
 * @param {boolean} isCaseSensitive - Whether the search should be case-sensitive
 * @param {boolean} replaceAll - Whether to replace all occurrences or just the first
 * @returns {{ newText: string, count: number }} - Result with new text and replacement count
 */
export const performReplace = (text, find, replace, isRegex, isCaseSensitive, replaceAll) => {
  if (!find || !text) {
    return { newText: text, count: 0 };
  }

  // Build flags
  let flags = '';
  if (!isCaseSensitive) {
    flags += 'i';
  }
  if (replaceAll) {
    flags += 'g';
  }

  // Create the regex pattern
  let pattern;
  if (isRegex) {
    // User wants to use regex - create it directly
    pattern = safeCreateRegex(find, flags);
    if (!pattern) {
      // Invalid regex pattern
      return { newText: text, count: 0 };
    }
  } else {
    // Escape special characters for literal matching
    const escapedFind = escapeRegexChars(find);
    pattern = safeCreateRegex(escapedFind, flags);
    if (!pattern) {
      return { newText: text, count: 0 };
    }
  }

  // Count matches before replacement
  const matches = text.match(new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g'));
  const totalMatches = matches ? matches.length : 0;

  // Perform replacement
  const newText = text.replace(pattern, replace);

  // Calculate actual replacements made
  let count;
  if (replaceAll) {
    count = totalMatches;
  } else {
    // For single replace, count is 1 if there was at least one match
    count = totalMatches > 0 ? 1 : 0;
  }

  return { newText, count };
};

/**
 * Validates if a regex pattern is valid
 * @param {string} pattern - The regex pattern to validate
 * @returns {boolean} - True if valid, false otherwise
 */
export const isValidRegex = (pattern) => {
  return safeCreateRegex(pattern) !== null;
};
