# Word Counter - Professional Text Analysis Tool

A modern, feature-rich word counter application built with React, Vite, and Tailwind CSS. This tool provides real-time text analysis with comprehensive metrics, keyword density analysis, and powerful text manipulation features.

## Features

### Real-Time Metrics
- **Words** - Instant word count as you type
- **Characters** - Total character count (with and without spaces)
- **Sentences** - Automatic sentence detection
- **Paragraphs** - Paragraph counting
- **Pages** - Estimated pages (500 words per page)
- **Reading Time** - Based on 200 WPM average
- **Speaking Time** - Based on 130 WPM average

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
│   ├── components/          # React components
│   │   ├── TextArea.jsx     # Main text input
│   │   ├── StatsDisplay.jsx # Metrics display
│   │   ├── ControlPanel.jsx # Action buttons
│   │   ├── KeywordDensity.jsx # Keyword analysis
│   │   ├── ThemeToggle.jsx  # Theme switcher
│   │   └── Toast.jsx        # Notifications
│   ├── hooks/               # Custom React hooks
│   │   ├── useLocalStorage.js
│   │   ├── useTextAnalysis.js
│   │   └── useTheme.js
│   ├── utils/               # Utility functions
│   │   ├── textAnalyzer.js
│   │   ├── keywordExtractor.js
│   │   └── caseConverter.js
│   ├── constants/
│   │   └── stopWords.js     # Stop words list
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── dist/                    # Production build
└── package.json
```

## Usage

1. **Start Typing** - The text area expands as you type
2. **View Metrics** - Real-time stats appear in the sticky header
3. **Check Keywords** - Top 5 keywords show in the right sidebar
4. **Copy Text** - Click "Copy Text" button for clipboard copy
5. **Change Case** - Select a case type from the dropdown
6. **Clear Text** - Click "Clear Text" (with confirmation)
7. **Toggle Theme** - Click the moon/sun icon to switch themes

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Author

Built with Claude Code
