import { useState, useEffect } from 'react';
import { X, Replace, ReplaceAll } from 'lucide-react';
import { isValidRegex } from '../utils/regexHelper';

/**
 * Find and Replace Panel component
 * Provides UI for finding and replacing text with regex support
 */
const FindReplacePanel = ({ onReplace, onClose }) => {
  // Local state for input fields
  const [findTerm, setFindTerm] = useState('');
  const [replaceTerm, setReplaceTerm] = useState('');
  const [isRegex, setIsRegex] = useState(false);
  const [isCaseSensitive, setIsCaseSensitive] = useState(false);

  // Validation state
  const [hasError, setHasError] = useState(false);

  // Validate regex pattern when it changes
  useEffect(() => {
    if (isRegex && findTerm) {
      setHasError(!isValidRegex(findTerm));
    } else {
      setHasError(false);
    }
  }, [findTerm, isRegex]);

  // Handle replace action
  const handleReplace = (replaceAll = false) => {
    if (!findTerm || hasError) return;

    onReplace(findTerm, replaceTerm, {
      isRegex,
      isCaseSensitive,
      replaceAll,
    });
  };

  // Toggle button style helper
  const getToggleClass = (isActive) => {
    const baseClass = 'px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer select-none';
    if (isActive) {
      return `${baseClass} bg-blue-500 text-white`;
    }
    return `${baseClass} bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600`;
  };

  // Check if replace buttons should be disabled
  const isReplaceDisabled = !findTerm || hasError;

  return (
    <div className="bg-gray-100 dark:bg-gray-850 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center gap-3">
          {/* Find Input */}
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <input
                type="text"
                value={findTerm}
                onChange={(e) => setFindTerm(e.target.value)}
                placeholder="Find..."
                className={`w-full px-3 py-2 bg-white dark:bg-gray-700 border rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  hasError
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
                title={hasError ? 'Invalid regular expression' : ''}
              />
              {hasError && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <span className="text-red-500 text-xs" title="Invalid regex pattern">
                    Invalid regex
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Replace Input */}
          <div className="flex-1 min-w-[200px]">
            <input
              type="text"
              value={replaceTerm}
              onChange={(e) => setReplaceTerm(e.target.value)}
              placeholder="Replace with..."
              className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
          </div>

          {/* Toggle Badges */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsRegex(!isRegex)}
              className={getToggleClass(isRegex)}
              title="Use regular expressions"
            >
              Regex
            </button>
            <button
              onClick={() => setIsCaseSensitive(!isCaseSensitive)}
              className={getToggleClass(isCaseSensitive)}
              title="Match case"
            >
              Match Case
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Replace Single */}
            <button
              onClick={() => handleReplace(false)}
              disabled={isReplaceDisabled}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
              title="Replace first occurrence"
            >
              <Replace className="w-4 h-4" />
              <span className="hidden sm:inline">Replace</span>
            </button>

            {/* Replace All */}
            <button
              onClick={() => handleReplace(true)}
              disabled={isReplaceDisabled}
              className="inline-flex items-center gap-1.5 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors disabled:cursor-not-allowed"
              title="Replace all occurrences"
            >
              <ReplaceAll className="w-4 h-4" />
              <span className="hidden sm:inline">Replace All</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              title="Close find and replace"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindReplacePanel;
