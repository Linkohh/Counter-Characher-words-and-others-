import { STOP_WORDS } from '../constants/stopWords';

/**
 * Extracts top keywords from text, filtering out stop words
 * @param {string} text - The text to analyze
 * @param {number} topN - Number of top keywords to return (default: 5)
 * @returns {Array} Array of objects with word and count properties
 */
export const extractKeywords = (text, topN = 5) => {
  if (!text || text.trim().length === 0) {
    return [];
  }

  // Convert to lowercase and extract words
  const words = text
    .toLowerCase()
    .replace(/[^\w\s']/g, '') // Remove punctuation but keep apostrophes
    .split(/\s+/)
    .filter(word => word.length > 0);

  // Count word frequency, filtering out stop words
  const wordFrequency = {};

  words.forEach(word => {
    // Skip stop words and single characters
    if (STOP_WORDS.has(word) || word.length <= 1) {
      return;
    }

    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });

  // Convert to array and sort by frequency
  const sortedWords = Object.entries(wordFrequency)
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count);

  // Return top N keywords
  return sortedWords.slice(0, topN);
};

/**
 * Calculates keyword density percentage
 * @param {number} keywordCount - Number of times keyword appears
 * @param {number} totalWords - Total word count in text
 * @returns {string} Percentage with 2 decimal places
 */
export const calculateDensity = (keywordCount, totalWords) => {
  if (totalWords === 0) return '0.00';
  return ((keywordCount / totalWords) * 100).toFixed(2);
};
