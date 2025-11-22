import { useState } from 'react';
import { AtSign, Check, AlertTriangle, X, Share2 } from 'lucide-react';

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

  // Get progress bar color
  const getProgressColor = () => {
    if (!status) return 'bg-indigo-500';

    switch (status.color) {
      case 'green':
        return 'bg-emerald-500';
      case 'yellow':
        return 'bg-amber-500';
      case 'red':
        return 'bg-rose-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg text-pink-600 dark:text-pink-400">
          <Share2 className="w-5 h-5" />
        </div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Social Media Limits
        </h2>
      </div>

      {/* Platform selector */}
      <div className="mb-6">
        <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
          Select Platform
        </label>
        <div className="relative">
          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
            aria-label="Select social media platform"
          >
            <option value="">Choose a platform...</option>
            {PLATFORMS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.icon} {p.name} ({p.limit} chars)
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Character count display */}
      {platform ? (
        <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
          {/* Count with status */}
          <div className={`flex items-center justify-between p-4 rounded-xl transition-colors ${status?.color === 'green' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' :
            status?.color === 'yellow' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30' :
              'bg-rose-50 dark:bg-rose-900/20 text-rose-700 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30'
            }`}>
            <div className="flex items-center gap-2">
              {status && <status.icon className="w-5 h-5" />}
              <span className="font-medium">{status?.label}</span>
            </div>
            <span className="font-bold text-xl tracking-tight">
              {characterCount.toLocaleString()}
              <span className="text-sm font-normal opacity-70 ml-1">/{platform.limit.toLocaleString()}</span>
            </span>
          </div>

          {/* Progress bar */}
          <div className="h-3 bg-slate-100 dark:bg-slate-700/50 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full ${getProgressColor()} transition-all duration-500 ease-out shadow-sm`}
              style={{ width: `${Math.min((characterCount / platform.limit) * 100, 100)}%` }}
            />
          </div>

          {/* Remaining characters */}
          <p className="text-sm text-center font-medium">
            {characterCount <= platform.limit ? (
              <span className="text-slate-600 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-bold">{(platform.limit - characterCount).toLocaleString()}</span> characters remaining
              </span>
            ) : (
              <span className="text-rose-600 dark:text-rose-400">
                <span className="font-bold">{(characterCount - platform.limit).toLocaleString()}</span> characters over limit
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="pt-6 border-t border-slate-100 dark:border-slate-700/50 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Select a platform to check character limits
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialMediaPresets;
