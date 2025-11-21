import { Hash, TrendingUp } from 'lucide-react';
import { calculateDensity } from '../utils/keywordExtractor';

/**
 * Keyword density panel component
 * Shows top 5 most frequent words with their density percentages
 */
const KeywordDensity = ({ keywords, totalWords }) => {
  if (keywords.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
            <Hash className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Keyword Density
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center mb-3">
            <Hash className="w-6 h-6 text-slate-400" />
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Start typing to see keyword analysis
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg text-emerald-600 dark:text-emerald-400">
          <Hash className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Keyword Density
        </h2>
      </div>

      <div className="space-y-4">
        {keywords.map((keyword, index) => {
          const density = calculateDensity(keyword.count, totalWords);
          const percentage = parseFloat(density);

          return (
            <div key={keyword.word} className="group">
              <div className="flex items-center justify-between text-sm mb-1.5">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 w-4">
                    #{index + 1}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {keyword.word}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-500 dark:text-slate-400 text-xs bg-slate-100 dark:bg-slate-700/50 px-2 py-0.5 rounded-full">
                    {keyword.count}×
                  </span>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 min-w-[3rem] text-right">
                    {density}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500 ease-out shadow-sm"
                  style={{ width: `${Math.min(percentage * 10, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Stop words filtered • Top 5 keywords shown</span>
        </div>
      </div>
    </div>
  );
};

export default KeywordDensity;
