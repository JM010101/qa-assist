# Q&A Dataset Viewer

A simple, beautiful HTML/JS/CSS project that displays questions and answers from a JSON dataset with toggle functionality.

## Features

- 📋 Displays questions in styled boxes
- 🔄 Toggle buttons to show/hide answers
- 🎯 Accordion-style: only one answer visible at a time
- 📱 Responsive design for mobile devices
- 🎨 Modern gradient UI with smooth animations

## How to Run

**Important:** This project requires a local web server to load the external JSON file due to browser CORS security restrictions.

### Option 1: Python (Recommended - Works on Windows, Mac, Linux)

1. Open a terminal/command prompt in this directory
2. Run one of these commands:

   **Python 3:**
   ```bash
   python -m http.server 8000
   ```

   **Python 2:**
   ```bash
   python -m SimpleHTTPServer 8000
   ```

3. Open your browser and go to: `http://localhost:8000`

### Option 2: Node.js (if you have Node.js installed)

1. Install a simple HTTP server globally:
   ```bash
   npm install -g http-server
   ```

2. Run the server:
   ```bash
   http-server
   ```

3. Open your browser and go to the URL shown (usually `http://localhost:8080`)

### Option 3: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

### Option 4: PHP (if you have PHP installed)

```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## File Structure

```
questions_answers/
├── index.html      # Main HTML file
├── styles.css      # Styling
├── script.js       # JavaScript logic
├── qa-data.json    # Q&A dataset (JSON format)
└── README.md       # This file
```

## Customizing the Data

Edit `qa-data.json` to add your own questions and answers. The format is:

```json
[
  {
    "question": "Your question here?",
    "answer": "Your answer here."
  },
  {
    "question": "Another question?",
    "answer": "Another answer."
  }
]
```

After editing the JSON file, refresh your browser to see the changes.

## Troubleshooting

**CORS Error?** Make sure you're running a local server (see "How to Run" above). Opening `index.html` directly in the browser won't work due to browser security restrictions.

**Questions not loading?** Check that:
- You're accessing via `http://localhost` (not `file://`)
- `qa-data.json` is in the same directory as `index.html`
- The JSON file is valid (check for syntax errors)
