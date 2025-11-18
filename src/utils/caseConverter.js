/**
 * Converts text to UPPER CASE
 * @param {string} text - The text to convert
 * @returns {string} Uppercased text
 */
export const toUpperCase = (text) => {
  return text.toUpperCase();
};

/**
 * Converts text to lower case
 * @param {string} text - The text to convert
 * @returns {string} Lowercased text
 */
export const toLowerCase = (text) => {
  return text.toLowerCase();
};

/**
 * Converts text to Title Case
 * Each word starts with a capital letter
 * @param {string} text - The text to convert
 * @returns {string} Title cased text
 */
export const toTitleCase = (text) => {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => {
      if (word.length === 0) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
};

/**
 * Converts text to Sentence case
 * First letter of each sentence is capitalized
 * @param {string} text - The text to convert
 * @returns {string} Sentence cased text
 */
export const toSentenceCase = (text) => {
  // First, lowercase everything
  let result = text.toLowerCase();

  // Capitalize first character
  result = result.charAt(0).toUpperCase() + result.slice(1);

  // Capitalize after sentence-ending punctuation (. ! ?)
  result = result.replace(/([.!?]\s+)([a-z])/g, (match, punctuation, letter) => {
    return punctuation + letter.toUpperCase();
  });

  // Capitalize 'i' when it's a standalone word
  result = result.replace(/\bi\b/g, 'I');

  return result;
};

/**
 * Case conversion types
 */
export const CASE_TYPES = {
  UPPER: 'upper',
  LOWER: 'lower',
  TITLE: 'title',
  SENTENCE: 'sentence',
};

/**
 * Converts text based on the specified case type
 * @param {string} text - The text to convert
 * @param {string} caseType - The type of case conversion
 * @returns {string} Converted text
 */
export const convertCase = (text, caseType) => {
  switch (caseType) {
    case CASE_TYPES.UPPER:
      return toUpperCase(text);
    case CASE_TYPES.LOWER:
      return toLowerCase(text);
    case CASE_TYPES.TITLE:
      return toTitleCase(text);
    case CASE_TYPES.SENTENCE:
      return toSentenceCase(text);
    default:
      return text;
  }
};
