import { useState } from 'react';
import { Copy, Trash2, Type, Search } from 'lucide-react';
import { CASE_TYPES } from '../utils/caseConverter';

/**
 * Control panel component
 * Contains buttons for text manipulation (copy, clear, case conversion, find & replace)
 */
const ControlPanel = ({ text, onTextChange, onCopy, onClear, showFindReplace, onToggleFindReplace }) => {
  const [caseType, setCaseType] = useState('');

  const handleCaseChange = (e) => {
    const selectedCase = e.target.value;
    setCaseType(selectedCase);

    if (selectedCase && text) {
      onTextChange(text, selectedCase);
    }
  };

  const handleClear = () => {
    // Show confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to clear all text? This action cannot be undone.'
    );

    if (confirmed) {
      onClear();
      setCaseType(''); // Reset case selector
    }
  };

  return (
    <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 rounded-2xl p-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Copy Button */}
          <button
            onClick={onCopy}
            disabled={!text}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 rounded-xl font-medium transition-all shadow-sm disabled:shadow-none hover:shadow-md hover:shadow-indigo-500/20 disabled:cursor-not-allowed active:scale-95"
            title="Copy text to clipboard"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Copy</span>
          </button>

          {/* Clear Button */}
          <button
            onClick={handleClear}
            disabled={!text}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 hover:border-red-200 dark:hover:border-red-900 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400 disabled:bg-slate-100 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:border-slate-200 dark:disabled:border-slate-700 rounded-xl font-medium transition-all disabled:cursor-not-allowed active:scale-95"
            title="Clear all text"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>

        {/* Find & Replace Button */}
        <button
          onClick={onToggleFindReplace}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            showFindReplace
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-purple-500 hover:bg-purple-600 text-white'
          }`}
          title="Find and replace text"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Find & Replace</span>
        </button>

        {/* Case Converter Dropdown */}
        <div className="flex items-center gap-2">
          <div className="relative group">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-indigo-500 transition-colors pointer-events-none" />
            <select
              value={caseType}
              onChange={handleCaseChange}
              disabled={!text}
              className="pl-9 pr-8 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:bg-slate-50 dark:disabled:bg-slate-800 disabled:text-slate-400 disabled:cursor-not-allowed transition-all appearance-none cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-700"
            >
              <option value="">Convert Case</option>
              <option value={CASE_TYPES.UPPER}>UPPER CASE</option>
              <option value={CASE_TYPES.LOWER}>lower case</option>
              <option value={CASE_TYPES.TITLE}>Title Case</option>
              <option value={CASE_TYPES.SENTENCE}>Sentence case</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
