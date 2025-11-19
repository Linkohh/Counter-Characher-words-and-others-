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
      lines: 0,
      uniqueWords: 0,
      avgWordLength: 0,
      avgSentenceLength: 0,
      longestWord: '',
      shortestSentence: '',
      longestSentence: '',
    };
  }

  // Character count (with spaces)
  const characters = text.length;

  // Character count (without spaces)
  const charactersNoSpaces = text.replace(/\s/g, '').length;

  // Word count - split by whitespace and filter empty strings
  const wordArray = text.trim().split(/\s+/).filter(word => word.length > 0);
  const words = wordArray.length;

  // Line count - split by newlines
  const lines = text.split('\n').length;

  // Sentence array for detailed analysis
  const sentenceArray = text
    .split(/[.!?]+/)
    .filter(sentence => sentence.trim().length > 0)
    .map(sentence => sentence.trim());
  const sentences = sentenceArray.length;

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

  // Unique words - convert to lowercase for comparison
  const uniqueWordsSet = new Set(
    wordArray.map(word => word.toLowerCase().replace(/[^\w']/g, ''))
  );
  const uniqueWords = uniqueWordsSet.size;

  // Average word length - strip punctuation for accurate calculation
  const cleanWords = wordArray.map(word => word.replace(/[^\w']/g, ''));
  const totalWordLength = cleanWords.reduce((sum, word) => sum + word.length, 0);
  const avgWordLength = words > 0 ? (totalWordLength / words).toFixed(1) : 0;

  // Average sentence length (in words)
  const avgSentenceLength = sentences > 0
    ? Math.round(words / sentences)
    : 0;

  // Longest word
  const longestWord = cleanWords.reduce((longest, word) =>
    word.length > longest.length ? word : longest, ''
  );

  // Longest and shortest sentences
  let longestSentence = '';
  let shortestSentence = sentenceArray[0] || '';

  sentenceArray.forEach(sentence => {
    if (sentence.length > longestSentence.length) {
      longestSentence = sentence;
    }
    if (sentence.length < shortestSentence.length && sentence.length > 0) {
      shortestSentence = sentence;
    }
  });

  return {
    characters,
    charactersNoSpaces,
    words,
    sentences,
    paragraphs,
    pages: pages || 0,
    readingTime: readingTime || 0,
    speakingTime: speakingTime || 0,
    lines,
    uniqueWords,
    avgWordLength: parseFloat(avgWordLength) || 0,
    avgSentenceLength,
    longestWord,
    shortestSentence,
    longestSentence,
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
