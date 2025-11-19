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
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl opacity-0 group-focus-within:opacity-20 transition duration-500 blur"></div>
      <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[60vh] p-8 text-lg leading-relaxed bg-transparent border-none focus:ring-0 resize-none text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
          spellCheck="true"
          autoFocus
        />

        {/* Character count indicator at bottom right */}
        <div className="absolute bottom-4 right-4 text-xs font-medium text-slate-400 dark:text-slate-500 pointer-events-none bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded-md">
          {value.length} chars
        </div>
      </div>
    </div>
  );
};

export default TextArea;
