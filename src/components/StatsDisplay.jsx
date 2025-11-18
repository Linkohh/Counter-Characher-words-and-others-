import { formatTime } from '../utils/textAnalyzer';
import {
  FileText,
  Type,
  AlignLeft,
  List,
  File,
  Clock,
  Mic
} from 'lucide-react';

/**
 * Sticky stats bar component
 * Displays all text metrics in a clean, organized layout
 */
const StatsDisplay = ({ metrics }) => {
  const stats = [
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

  return (
    <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex items-center gap-2 ${
                  stat.primary
                    ? 'col-span-1'
                    : 'col-span-1'
                }`}
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
                  <div className={`font-semibold truncate ${
                    stat.primary
                      ? 'text-lg text-gray-900 dark:text-white'
                      : 'text-base text-gray-700 dark:text-gray-300'
                  }`}>
                    {stat.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatsDisplay;
