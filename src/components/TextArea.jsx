import { useRef, useEffect } from 'react';

/**
 * Main text input area component
 * Auto-expanding textarea with distraction-free design
 */
const TextArea = ({ value, onChange, placeholder }) => {
  const textareaRef = useRef(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      // Set height to scrollHeight to expand
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="glass-panel rounded-2xl overflow-hidden flex flex-col h-[calc(100vh-24rem)] min-h-[500px] transition-all duration-300 focus-within:ring-2 focus-within:ring-indigo-500/50">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 w-full p-6 bg-transparent resize-none focus:outline-none text-slate-700 dark:text-slate-200 text-lg leading-relaxed placeholder:text-slate-400 dark:placeholder:text-slate-500"
        spellCheck="false"
      />

      {/* Status bar */}
      <div className="px-6 py-3 bg-white/30 dark:bg-slate-800/30 border-t border-white/20 dark:border-slate-700/30 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 backdrop-blur-sm">
        {value.length} chars
      </div>
    </div>
  );
};

export default TextArea;
