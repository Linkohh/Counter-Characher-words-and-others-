import { useMemo } from 'react';
import { analyzeText } from '../utils/textAnalyzer';
import { extractKeywords } from '../utils/keywordExtractor';

/**
 * Custom hook for analyzing text and extracting metrics
 * Uses memoization to prevent unnecessary recalculations
 * @param {string} text - The text to analyze
 * @returns {Object} Object containing all text metrics and keywords
 */
export const useTextAnalysis = (text) => {
  // Memoize text analysis to prevent recalculation on every render
  const metrics = useMemo(() => {
    return analyzeText(text);
  }, [text]);

  // Memoize keyword extraction
  const keywords = useMemo(() => {
    return extractKeywords(text, 5);
  }, [text]);

  return {
    ...metrics,
    keywords,
  };
};
