# Word Counter - Professional Text Analysis Tool

A modern, feature-rich word counter application built with React, Vite, and Tailwind CSS. This tool provides real-time text analysis with comprehensive metrics, keyword density analysis, and powerful text manipulation features.

## Features

### Real-Time Metrics
Primary stats (always visible):
- **Words** - Instant word count as you type
- **Characters** - Total character count
- **Sentences** - Automatic sentence detection
- **Paragraphs** - Paragraph counting
- **Pages** - Estimated pages (500 words per page)
- **Reading Time** - Based on 200 WPM average
- **Speaking Time** - Based on 130 WPM average

Expandable stats (click "More stats"):
- **Lines** - Line count
- **Unique Words** - Vocabulary diversity
- **Avg Word Length** - Average characters per word
- **Avg Sentence Length** - Average words per sentence
- **Longest Word** - Longest word in your text

### Word Goal Tracker
- **Set Custom Goals** - Enter any word count target
- **Quick Presets** - Common targets (250, 500, 1000, 1500, 2500)
- **Visual Progress Bar** - See completion at a glance
- **Goal Persistence** - Target saves automatically
- **Completion Celebration** - Trophy icon when goal reached

### Social Media Limits
- **Platform Presets** - Twitter/X, Instagram, LinkedIn, Meta, SMS, YouTube
- **Character Counter** - Real-time count vs. limit
- **Visual Indicator** - Green/Yellow/Red status
- **Remaining Count** - Shows chars left or over limit

### Deep Analysis
- **Keyword Density** - Shows top 5 most frequent words
- **Stop Word Filtering** - Automatically filters common words like "the", "and", "is"
- **Visual Progress Bars** - See keyword frequency at a glance
- **Percentage Calculations** - Precise density percentages

### Text Manipulation Tools
- **Copy Text** - One-click copy with toast notification
- **Clear Text** - Clear all text with confirmation dialog
- **Case Converter** - Transform text to:
  - UPPER CASE
  - lower case
  - Title Case
  - Sentence case

### Smart Features
- **LocalStorage Auto-Save** - Never lose your work on browser refresh
- **Dark/Light Mode** - Toggle theme or use system preference
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Distraction-Free** - Clean, centered writing area

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Modern icon library

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Counter-Characher-words-and-others-
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Preview Production Build

```bash
npm run preview
```

## Project Structure

```
word-counter-app/
├── src/
│   ├── components/              # React components
│   │   ├── TextArea.jsx         # Main text input
│   │   ├── StatsDisplay.jsx     # Metrics display (expandable)
│   │   ├── ControlPanel.jsx     # Action buttons
│   │   ├── KeywordDensity.jsx   # Keyword analysis
│   │   ├── WordGoal.jsx         # Word goal tracker
│   │   ├── SocialMediaPresets.jsx # Platform limits
│   │   ├── ThemeToggle.jsx      # Theme switcher
│   │   └── Toast.jsx            # Notifications
│   ├── hooks/                   # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useTextAnalysis.js
│   │   └── useTheme.js
│   ├── utils/                   # Utility functions
│   │   ├── textAnalyzer.js
│   │   ├── keywordExtractor.js
│   │   └── caseConverter.js
│   ├── constants/
│   │   └── stopWords.js         # Stop words list
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── public/                      # Static assets
├── dist/                        # Production build
└── package.json
```

## Usage

1. **Start Typing** - The text area expands as you type
2. **View Metrics** - Real-time stats appear in the sticky header
3. **Expand Stats** - Click "More stats" to see additional metrics
4. **Set Word Goal** - Enter target or select a preset in sidebar
5. **Check Social Limits** - Select platform to see character limit
6. **Check Keywords** - Top 5 keywords show in the sidebar
7. **Copy Text** - Click "Copy Text" button for clipboard copy
8. **Change Case** - Select a case type from the dropdown
9. **Clear Text** - Click "Clear Text" (with confirmation)
10. **Toggle Theme** - Click the moon/sun icon to switch themes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Author

Built with Claude Code
