import { X, BookOpen, Zap, BarChart2, Share2, Info } from 'lucide-react';

const AboutModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-2xl bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
                            <Info className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                            About Word Counter
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-500 dark:text-slate-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar space-y-8">

                    {/* Intro */}
                    <div className="prose dark:prose-invert max-w-none">
                        <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                            Welcome to the ultimate writing companion. This isn't just a character counter; it's a
                            <span className="font-semibold text-indigo-600 dark:text-indigo-400"> zen workspace </span>
                            designed to help you write better, faster, and with more insight.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg mt-1">
                                    <BarChart2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Deep Analytics</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Track words, characters, sentences, and paragraphs in real-time. See reading time and speaking time instantly.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg mt-1">
                                    <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Smart Tools</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Use "Find & Replace" with Regex support, convert text case, and monitor keyword density to optimize your content.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg mt-1">
                                    <BookOpen className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Reading Level</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Understand your audience better with estimated reading times and sentence complexity analysis.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg mt-1">
                                    <Share2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">Social Ready</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                                        Check your text against preset limits for X (Twitter), Instagram, Facebook, and LinkedIn.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* How to Use */}
                    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-100 dark:border-slate-700">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            How to Use
                        </h3>
                        <ul className="space-y-3 text-slate-600 dark:text-slate-300 text-sm">
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-xs font-bold shadow-sm">1</span>
                                Start typing in the main text area or paste your document.
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-xs font-bold shadow-sm">2</span>
                                Watch the stats bar at the top update automatically.
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-xs font-bold shadow-sm">3</span>
                                Set a word goal in the sidebar to track your daily progress.
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="w-6 h-6 flex items-center justify-center bg-white dark:bg-slate-700 rounded-full text-xs font-bold shadow-sm">4</span>
                                Enjoy the fluid background designed to keep you in a flow state.
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer */}
                <div className="p-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200/50 dark:border-slate-700/50 text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        Designed for writers, by writers.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutModal;
