/**
 * Analyzes text and returns comprehensive metrics
 * @param {string} text - The text to analyze
 * @returns {Object} Object containing all text metrics
 */
export const analyzeText = (text) => {
  if (!text || text.trim().length === 0) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      pages: 0,
      readingTime: 0,
      speakingTime: 0,
    };
  }

  // Character count (with spaces)
  const characters = text.length;

  // Character count (without spaces)
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Word count - split by whitespace and filter empty strings
  const wordArray = text.trim().split(/\s+/).filter(word => word.length > 0);
  const words = wordArray.length;

  // Sentence count - split by sentence-ending punctuation
  // Matches ., !, ? followed by space or end of string
  const sentences = text
    .split(/[.!?]+/)
    .filter(sentence => sentence.trim().length > 0)
    .length;

  // Paragraph count - split by double line breaks
  const paragraphs = text
    .split(/\n\s*\n/)
    .filter(para => para.trim().length > 0)
    .length;

  // Pages (500 words per page)
  const pages = Math.ceil(words / 500);

  // Reading time (200 WPM - average reading speed)
  const readingTime = Math.ceil(words / 200);

  // Speaking time (130 WPM - average speaking speed)
  const speakingTime = Math.ceil(words / 130);

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    pages: pages || 0,
    readingTime: readingTime || 0,
    speakingTime: speakingTime || 0,
  };
};

/**
 * Formats time in minutes to a readable string
 * @param {number} minutes - Time in minutes
 * @returns {string} Formatted time string
 */
export const formatTime = (minutes) => {
  if (minutes === 0) return '0 min';
  if (minutes < 1) return '< 1 min';
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};
