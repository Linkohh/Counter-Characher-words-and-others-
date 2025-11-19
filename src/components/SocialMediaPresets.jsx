import { useState } from 'react';
import { AtSign, Check, AlertTriangle, X } from 'lucide-react';

/**
 * Social media character limit presets
 * Shows character count with visual indicator for selected platform
 */

// Platform configurations with character limits
const PLATFORMS = [
  { id: 'twitter', name: 'Twitter/X', limit: 280, icon: '𝕏' },
  { id: 'instagram', name: 'Instagram Bio', limit: 150, icon: '📷' },
  { id: 'linkedin', name: 'LinkedIn Post', limit: 3000, icon: '💼' },
  { id: 'meta', name: 'Meta Description', limit: 160, icon: '🔍' },
  { id: 'sms', name: 'SMS', limit: 160, icon: '📱' },
  { id: 'youtube', name: 'YouTube Title', limit: 100, icon: '▶️' },
];

const SocialMediaPresets = ({ characterCount }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('');

  // Get selected platform config
  const platform = PLATFORMS.find(p => p.id === selectedPlatform);

  // Calculate status for the indicator
  const getStatus = () => {
    if (!platform) return null;

    const percentage = (characterCount / platform.limit) * 100;

    if (percentage <= 80) {
      return { color: 'green', icon: Check, label: 'Good' };
    } else if (percentage <= 100) {
      return { color: 'yellow', icon: AlertTriangle, label: 'Near limit' };
    } else {
      return { color: 'red', icon: X, label: 'Over limit' };
    }
  };

  const status = getStatus();

  // Get color classes based on status
  const getColorClasses = () => {
    if (!status) return '';

    switch (status.color) {
      case 'green':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
      case 'yellow':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
      case 'red':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
      default:
        return '';
    }
  };

  // Get progress bar color
  const getProgressColor = () => {
    if (!status) return 'bg-blue-500';

    switch (status.color) {
      case 'green':
        return 'bg-green-500';
      case 'yellow':
        return 'bg-yellow-500';
      case 'red':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-4">
        <AtSign className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Social Media Limits
        </h2>
      </div>

      {/* Platform selector */}
      <select
        value={selectedPlatform}
        onChange={(e) => setSelectedPlatform(e.target.value)}
        className="w-full px-3 py-2 mb-4 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
        aria-label="Select social media platform"
      >
        <option value="">Select platform...</option>
        {PLATFORMS.map((p) => (
          <option key={p.id} value={p.id}>
            {p.icon} {p.name} ({p.limit} chars)
          </option>
        ))}
      </select>

      {/* Character count display */}
      {platform && (
        <div className="space-y-3">
          {/* Count with status */}
          <div className={`flex items-center justify-between p-3 rounded-lg ${getColorClasses()}`}>
            <div className="flex items-center gap-2">
              {status && <status.icon className="w-4 h-4" />}
              <span className="font-medium">{status?.label}</span>
            </div>
            <span className="font-bold text-lg">
              {characterCount.toLocaleString()}/{platform.limit.toLocaleString()}
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressColor()} transition-all duration-300`}
              style={{ width: `${Math.min((characterCount / platform.limit) * 100, 100)}%` }}
            />
          </div>

          {/* Remaining characters */}
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            {characterCount <= platform.limit ? (
              <span>{(platform.limit - characterCount).toLocaleString()} characters remaining</span>
            ) : (
              <span className="text-red-600 dark:text-red-400">
                {(characterCount - platform.limit).toLocaleString()} characters over limit
              </span>
            )}
          </p>
        </div>
      )}

      {/* Empty state */}
      {!platform && (
        <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-4">
          Select a platform to check character limits
        </p>
      )}
    </div>
  );
};

export default SocialMediaPresets;
