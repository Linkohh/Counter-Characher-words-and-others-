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
        className={`group relative p-4 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${stat.primary
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50'
          }`}
      >
        <div className="flex items-start justify-between mb-2">
          <div className={`p-2 rounded-lg ${stat.primary
              ? 'bg-white/20'
              : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors'
            }`}>
            <Icon className="w-5 h-5" />
          </div>
        </div>

        <div className="space-y-1">
          <div className={`text-sm font-medium ${stat.primary ? 'text-indigo-100' : 'text-slate-500 dark:text-slate-400'
            }`}>
            {stat.label}
          </div>
          <div className={`text-2xl font-bold tracking-tight ${stat.primary ? 'text-white' : 'text-slate-900 dark:text-white'
            }`} title={stat.truncate ? stat.value : undefined}>
            {stat.truncate && stat.value.length > 12 ? `${stat.value.substring(0, 12)}...` : stat.value}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Primary stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {primaryStats.map(renderStat)}
      </div>

      {/* Secondary stats - expandable */}
      <div className={`grid grid-cols-2 md:grid-cols-5 gap-4 transition-all duration-500 ease-in-out overflow-hidden ${showMore ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0'
        }`}>
        {secondaryStats.map(renderStat)}
      </div>

      {/* Toggle button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowMore(!showMore)}
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all shadow-sm hover:shadow-md"
        >
          {showMore ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </>
          ) : (
            <>
              <span>Show More Stats</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default StatsDisplay;
