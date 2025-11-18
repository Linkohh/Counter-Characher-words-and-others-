import { Hash, TrendingUp } from 'lucide-react';
import { calculateDensity } from '../utils/keywordExtractor';

/**
 * Keyword density panel component
 * Shows top 5 most frequent words with their density percentages
 */
const KeywordDensity = ({ keywords, totalWords }) => {
  if (keywords.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Hash className="w-5 h-5 text-blue-500 dark:text-blue-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Keyword Density
          </h2>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">
          Start typing to see keyword analysis
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Hash className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Keyword Density
        </h2>
      </div>

      <div className="space-y-3">
        {keywords.map((keyword, index) => {
          const density = calculateDensity(keyword.count, totalWords);
          const percentage = parseFloat(density);

          return (
            <div key={keyword.word} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400 w-5">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {keyword.word}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-gray-300">
                    {keyword.count}×
                  </span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 min-w-[3.5rem] text-right">
                    {density}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transition-all duration-300"
                  style={{ width: `${Math.min(percentage * 10, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span>Stop words filtered • Top 5 keywords shown</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordDensity;
