import { useState, useEffect } from 'react';
import { Target, Trophy, Zap } from 'lucide-react';

/**
 * Word goal component with progress bar
 * Allows users to set word count targets and track progress
 */

// Common word count presets for quick selection
const PRESETS = [
  { label: '250', value: 250, description: 'Short post' },
  { label: '500', value: 500, description: 'Blog intro' },
  { label: '1000', value: 1000, description: 'Article' },
  { label: '1500', value: 1500, description: 'Long article' },
  { label: '2500', value: 2500, description: 'Essay' },
];

const WordGoal = ({ wordCount, savedGoal, onGoalChange }) => {
  const [goal, setGoal] = useState(savedGoal || 0);
  const [inputValue, setInputValue] = useState(savedGoal?.toString() || '');

  // Sync with saved goal
  useEffect(() => {
    if (savedGoal !== undefined) {
      setGoal(savedGoal);
      setInputValue(savedGoal > 0 ? savedGoal.toString() : '');
    }
  }, [savedGoal]);

  // Calculate progress percentage
  const percentage = goal > 0 ? Math.min((wordCount / goal) * 100, 100) : 0;
  const isComplete = wordCount >= goal && goal > 0;

  // Handle custom input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      setGoal(numValue);
      onGoalChange(numValue);
    } else if (value === '') {
      setGoal(0);
      onGoalChange(0);
    }
  };

  // Handle preset selection
  const handlePresetClick = (presetValue) => {
    setGoal(presetValue);
    setInputValue(presetValue.toString());
    onGoalChange(presetValue);
  };

  // Get progress bar color based on completion
  const getProgressColor = () => {
    if (isComplete) return 'bg-green-500';
    if (percentage >= 75) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-blue-400';
    return 'bg-blue-300';
  };

  // Get status text
  const getStatusText = () => {
    if (goal === 0) return null;

    if (isComplete) {
      const over = wordCount - goal;
      return over > 0
        ? `Goal reached! +${over.toLocaleString()} words`
        : 'Goal reached!';
    }

    const remaining = goal - wordCount;
    return `${remaining.toLocaleString()} words to go`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <Target className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Word Goal
        </h2>
      </div>

      {/* Custom goal input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target word count
        </label>
        <input
          type="number"
          min="0"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter goal..."
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          aria-label="Word count goal"
        />
      </div>

      {/* Quick presets */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick presets:</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                goal === preset.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress display */}
      {goal > 0 && (
        <div className="space-y-3">
          {/* Progress bar */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-500 ease-out`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Progress stats */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {wordCount.toLocaleString()} / {goal.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-gray-900 dark:text-white">
              {Math.round(percentage)}%
            </span>
          </div>

          {/* Status message */}
          <div className={`flex items-center justify-center gap-2 p-2 rounded-lg ${
            isComplete
              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
              : 'bg-gray-100 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400'
          }`}>
            {isComplete ? (
              <Trophy className="w-4 h-4" />
            ) : (
              <Zap className="w-4 h-4" />
            )}
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
        </div>
      )}

      {/* Empty state */}
      {goal === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
          Set a word count goal to track your progress
        </p>
      )}
    </div>
  );
};

export default WordGoal;
