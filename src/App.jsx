import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { useTextAnalysis } from './hooks/useTextAnalysis';
import { convertCase } from './utils/caseConverter';
import { performReplace } from './utils/regexHelper';
import StatsDisplay from './components/StatsDisplay';
import ControlPanel from './components/ControlPanel';
import FindReplacePanel from './components/FindReplacePanel';
import TextArea from './components/TextArea';
import KeywordDensity from './components/KeywordDensity';
import SocialMediaPresets from './components/SocialMediaPresets';
import WordGoal from './components/WordGoal';
import ThemeToggle from './components/ThemeToggle';
import Toast from './components/Toast';
import FluidBackground from './components/FluidBackground';

function App() {
  // LocalStorage for text persistence
  const [text, setText] = useLocalStorage('wordCounterText', '');

  // LocalStorage for word goal persistence
  const [wordGoal, setWordGoal] = useLocalStorage('wordCounterGoal', 0);

  // Theme management
  const { isDark, toggleTheme } = useTheme();

  // Text analysis
  const metrics = useTextAnalysis(text);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Find & Replace panel state
  const [showFindReplace, setShowFindReplace] = useState(false);

  // Show toast notification
  const showNotification = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // Handle text change
  const handleTextChange = (newText, caseType = null) => {
    if (caseType) {
      setText(convertCase(newText, caseType));
    } else {
      setText(newText);
    }
  };

  // Handle copy to clipboard
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification('Text copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
      showNotification('Failed to copy text');
    }
  };

  // Handle clear text
  const handleClear = () => {
    setText('');
  };

  // Handle find and replace
  const handleReplace = (find, replace, options) => {
    const { isRegex, isCaseSensitive, replaceAll } = options;
    const { newText, count } = performReplace(
      text,
      find,
      replace,
      isRegex,
      isCaseSensitive,
      replaceAll
    );

    if (count > 0) {
      setText(newText);
      const message = count === 1
        ? 'Replaced 1 occurrence'
        : `Replaced ${count} occurrences`;
      showNotification(message);
    } else {
      showNotification('No matches found');
    }
  };

  // Toggle find and replace panel
  const toggleFindReplace = () => {
    setShowFindReplace(!showFindReplace);
  };

  return (
    <div className="min-h-screen transition-colors flex flex-col">
      <FluidBackground />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                Word Counter
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Professional Analysis Tool
              </p>
            </div>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">

        {/* Stats Display */}
        <div className="mb-8">
          <StatsDisplay metrics={metrics} />
        </div>

        {/* Control Panel & Find/Replace */}
        <div className="mb-6 space-y-4">
          <ControlPanel
            text={text}
            onTextChange={handleTextChange}
            onCopy={handleCopy}
            onClear={handleClear}
            showFindReplace={showFindReplace}
            onToggleFindReplace={toggleFindReplace}
          />

          {/* Find & Replace Panel */}
          {showFindReplace && (
            <FindReplacePanel
              onReplace={handleReplace}
              onClose={() => setShowFindReplace(false)}
            />
          )}
        </div>


        <div className="flex flex-col lg:flex-row gap-8">
          {/* Text Editor */}
          <div className="flex-1 min-w-0">
            <TextArea
              value={text}
              onChange={handleTextChange}
              placeholder="Start typing or paste your text here..."
            />
          </div>

          {/* Sidebar with tools */}
          <div className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Word Goal */}
            <WordGoal
              wordCount={metrics.words}
              savedGoal={wordGoal}
              onGoalChange={setWordGoal}
            />

            {/* Social Media Presets */}
            <SocialMediaPresets characterCount={metrics.characters} />

            {/* Keyword Density */}
            <KeywordDensity keywords={metrics.keywords} totalWords={metrics.words} />
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;
