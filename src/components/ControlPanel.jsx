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
    <div className="glass-panel p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <button
          onClick={onCopy}
          className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          title="Copy to clipboard"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
        <button
          onClick={handleClear}
          className="glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-400"
          title="Clear text"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onTextChange(text.toUpperCase(), CASE_TYPES.UPPER)}
          className="glass-button p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          title="UPPERCASE"
        >
          <span className="text-xs font-bold">AA</span>
        </button>
        <button
          onClick={() => onTextChange(text.toLowerCase(), CASE_TYPES.LOWER)}
          className="glass-button p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          title="lowercase"
        >
          <span className="text-xs font-bold">aa</span>
        </button>
        <button
          onClick={() => onTextChange(text, CASE_TYPES.SENTENCE)}
          className="glass-button p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          title="Sentence case"
        >
          <span className="text-xs font-bold">Aa</span>
        </button>

        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />

        <button
          onClick={onToggleFindReplace}
          className={`glass-button flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${showFindReplace
              ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 ring-2 ring-indigo-500/20'
              : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
        >
          <Search className="w-4 h-4" />
          Find & Replace
        </button>

        <div className="relative">
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
    </div >
    </div >
  );
};

export default ControlPanel;
