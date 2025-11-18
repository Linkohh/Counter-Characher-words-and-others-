import { useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { useTextAnalysis } from './hooks/useTextAnalysis';
import { convertCase } from './utils/caseConverter';
import StatsDisplay from './components/StatsDisplay';
import ControlPanel from './components/ControlPanel';
import TextArea from './components/TextArea';
import KeywordDensity from './components/KeywordDensity';
import ThemeToggle from './components/ThemeToggle';
import Toast from './components/Toast';

function App() {
  // LocalStorage for text persistence
  const [text, setText] = useLocalStorage('wordCounterText', '');

  // Theme management
  const { isDark, toggleTheme } = useTheme();

  // Text analysis
  const metrics = useTextAnalysis(text);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors flex flex-col">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Word Counter
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Professional text analysis & word counting tool
            </p>
          </div>
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>
      </header>

      {/* Stats Display */}
      <StatsDisplay metrics={metrics} />

      {/* Control Panel */}
      <ControlPanel
        text={text}
        onTextChange={handleTextChange}
        onCopy={handleCopy}
        onClear={handleClear}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-6 p-4 lg:p-6">
        {/* Text Editor */}
        <div className="flex-1 min-w-0">
          <TextArea
            value={text}
            onChange={handleTextChange}
            placeholder="Start typing or paste your text here..."
          />
        </div>

        {/* Keyword Density Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <div className="sticky top-24">
            <KeywordDensity keywords={metrics.keywords} totalWords={metrics.words} />
          </div>
        </div>
      </div>

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
