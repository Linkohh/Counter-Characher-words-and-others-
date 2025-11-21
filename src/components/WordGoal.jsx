import { useState } from 'react';
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

const WordGoal = ({ wordCount, savedGoal = 0, onGoalChange }) => {
  const [prevSavedGoal, setPrevSavedGoal] = useState(savedGoal);
  const [inputValue, setInputValue] = useState(savedGoal > 0 ? savedGoal.toString() : '');

  // Sync input value with saved goal (adjust state during render)
  if (savedGoal !== prevSavedGoal) {
    setPrevSavedGoal(savedGoal);
    setInputValue(savedGoal > 0 ? savedGoal.toString() : '');
  }

  // Use savedGoal directly as the goal
  const goal = savedGoal;

  // Calculate progress percentage
  const percentage = goal > 0 ? Math.min((wordCount / goal) * 100, 100) : 0;
  const isComplete = wordCount >= goal && goal > 0;

  // Handle custom input
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 0) {
      onGoalChange(numValue);
    } else if (value === '') {
      onGoalChange(0);
    }
  };

  // Handle preset selection
  const handlePresetClick = (presetValue) => {
    setInputValue(presetValue.toString());
    onGoalChange(presetValue);
  };

  // Get progress bar color based on completion
  const getProgressColor = () => {
    if (isComplete) return 'bg-gradient-to-r from-emerald-400 to-emerald-600';
    if (percentage >= 75) return 'bg-gradient-to-r from-indigo-400 to-purple-600';
    return 'bg-gradient-to-r from-indigo-400 to-indigo-600';
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
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-indigo-500" />
          <h3 className="font-semibold text-slate-900 dark:text-white">Daily Goal</h3>
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Word Goal
        </h2>
      </div>

      {/* Custom goal input */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Target word count
        </label>
        <div className="relative">
          <input
            type="number"
            min="0"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter goal..."
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
            aria-label="Word count goal"
          />
          {goal > 0 && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">
              words
            </div>
          )}
        </div>
      </div>

      {/* Quick presets */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Quick presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handlePresetClick(preset.value)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${goal === preset.value
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                : 'bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Progress display */}
      {goal > 0 ? (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          {/* Progress stats */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Progress</div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round(percentage)}%
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Count</div>
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <span className={isComplete ? 'text-emerald-600 dark:text-emerald-400' : ''}>
                  {wordCount.toLocaleString()}
                </span>
                <span className="text-slate-400 mx-1">/</span>
                {goal.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="h-4 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-1">
            <div
              className={`h-full rounded-full ${getProgressColor()} transition-all duration-500 ease-out shadow-sm`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Status message */}
          <div className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${isComplete
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30'
            : 'bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-700'
            }`}>
            <div className={`p-1.5 rounded-full ${isComplete ? 'bg-emerald-200 dark:bg-emerald-800' : 'bg-slate-200 dark:bg-slate-700'
              }`}>
              {isComplete ? (
                <Trophy className="w-4 h-4" />
              ) : (
                <Zap className="w-4 h-4" />
              )}
            </div>
            <span className="text-sm font-medium">{getStatusText()}</span>
          </div>
        </div>
      ) : (
        <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Set a goal to track your progress
          </p>
        </div>
      )}
    </div>
  );
};

export default WordGoal;
