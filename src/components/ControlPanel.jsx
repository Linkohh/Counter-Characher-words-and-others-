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
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
        {/* Copy Button */}
        <button
          onClick={onCopy}
          disabled={!text}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
          title="Copy text to clipboard"
        >
          <Copy className="w-4 h-4" />
          <span className="hidden sm:inline">Copy Text</span>
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClear}
          disabled={!text}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors disabled:cursor-not-allowed"
          title="Clear all text"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Clear Text</span>
        </button>

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
        <div className="flex items-center gap-2 ml-auto">
          <Type className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          <select
            value={caseType}
            onChange={handleCaseChange}
            disabled={!text}
            className="px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 dark:disabled:bg-gray-800 disabled:cursor-not-allowed transition-colors"
          >
            <option value="">Case Converter</option>
            <option value={CASE_TYPES.UPPER}>UPPER CASE</option>
            <option value={CASE_TYPES.LOWER}>lower case</option>
            <option value={CASE_TYPES.TITLE}>Title Case</option>
            <option value={CASE_TYPES.SENTENCE}>Sentence case</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
