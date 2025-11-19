import { useState } from 'react';
import { formatTime } from '../utils/textAnalyzer';
import {
  FileText,
  Type,
  AlignLeft,
  List,
  File,
  Clock,
  Mic,
  ChevronDown,
  ChevronUp,
  Hash,
  Ruler,
  BarChart3,
  Sparkles
} from 'lucide-react';

/**
 * Sticky stats bar component
 * Displays all text metrics in a clean, organized layout
 * With expandable additional metrics section
 */
const StatsDisplay = ({ metrics }) => {
  const [showMore, setShowMore] = useState(false);

  // Primary stats - always visible
  const primaryStats = [
    {
      label: 'Words',
      value: metrics.words.toLocaleString(),
      icon: FileText,
      primary: true,
    },
    {
      label: 'Characters',
      value: metrics.characters.toLocaleString(),
      icon: Type,
      primary: true,
    },
    {
      label: 'Sentences',
      value: metrics.sentences.toLocaleString(),
      icon: AlignLeft,
    },
    {
      label: 'Paragraphs',
      value: metrics.paragraphs.toLocaleString(),
      icon: List,
    },
    {
      label: 'Pages',
      value: metrics.pages.toLocaleString(),
      icon: File,
    },
    {
      label: 'Reading Time',
      value: formatTime(metrics.readingTime),
      icon: Clock,
    },
    {
      label: 'Speaking Time',
      value: formatTime(metrics.speakingTime),
      icon: Mic,
    },
  ];

  // Secondary stats - shown when expanded
  const secondaryStats = [
    {
      label: 'Lines',
      value: metrics.lines.toLocaleString(),
      icon: List,
    },
    {
      label: 'Unique Words',
      value: metrics.uniqueWords.toLocaleString(),
      icon: Sparkles,
    },
    {
      label: 'Avg Word Length',
      value: metrics.avgWordLength > 0 ? `${metrics.avgWordLength} chars` : '0',
      icon: Ruler,
    },
    {
      label: 'Avg Sentence',
      value: metrics.avgSentenceLength > 0 ? `${metrics.avgSentenceLength} words` : '0',
      icon: BarChart3,
    },
    {
      label: 'Longest Word',
      value: metrics.longestWord || '-',
      icon: Hash,
      truncate: true,
    },
  ];

  // Render a single stat item
  const renderStat = (stat) => {
    const Icon = stat.icon;
    return (
      <div
        key={stat.label}
        className="flex items-center gap-2"
      >
        <Icon className={`w-4 h-4 flex-shrink-0 ${
          stat.primary
            ? 'text-blue-500 dark:text-blue-400'
            : 'text-gray-500 dark:text-gray-400'
        }`} />
        <div className="min-w-0">
          <div className={`text-xs text-gray-500 dark:text-gray-400 mb-0.5 ${
            stat.primary ? 'font-medium' : ''
          }`}>
            {stat.label}
          </div>
          <div className={`font-semibold ${stat.truncate ? 'truncate max-w-[100px]' : ''} ${
            stat.primary
              ? 'text-lg text-gray-900 dark:text-white'
              : 'text-base text-gray-700 dark:text-gray-300'
          }`} title={stat.truncate ? stat.value : undefined}>
            {stat.value}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Primary stats - always visible */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {primaryStats.map(renderStat)}
        </div>

        {/* Secondary stats - expandable */}
        {showMore && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            {secondaryStats.map(renderStat)}
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex items-center justify-center gap-1 w-full mt-3 py-1 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          aria-expanded={showMore}
          aria-label={showMore ? 'Show less statistics' : 'Show more statistics'}
        >
          {showMore ? (
            <>
              <ChevronUp className="w-4 h-4" />
              <span>Less stats</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              <span>More stats</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StatsDisplay;
