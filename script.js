// Load and display Q&A data from external JSON file
async function loadQAData() {
    try {
        const response = await fetch('qa-data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayQuestions(data);
    } catch (error) {
        console.error('Error loading Q&A data:', error);
        document.getElementById('qa-list').innerHTML = 
            '<div class="error-message"><p>Error loading questions. Please make sure you are running a local server.</p><p>See README.md for instructions.</p></div>';
    }
}

// Format answer text to handle line breaks and paragraphs
function formatAnswer(answer) {
    if (!answer) return '';
    
    // Split by double line breaks (paragraphs) or single line breaks
    const paragraphs = answer.split(/\n\s*\n|\n/).filter(p => p.trim().length > 0);
    
    if (paragraphs.length === 1) {
        // Single paragraph, just return it
        return paragraphs[0].trim();
    } else {
        // Multiple paragraphs, wrap each in <p> tags
        return paragraphs.map(p => `<p>${p.trim()}</p>`).join('');
    }
}

function displayQuestions(qaData) {
    const qaList = document.getElementById('qa-list');
    qaList.innerHTML = '';

    qaData.forEach((item, index) => {
        const qaItem = document.createElement('div');
        qaItem.className = 'qa-item';
        const formattedAnswer = formatAnswer(item.answer);
        qaItem.innerHTML = `
            <div class="question-header" data-index="${index}">
                <div class="question-text">${item.question}</div>
                <button class="toggle-btn" data-index="${index}" aria-label="Toggle answer">
                    <span>▼</span>
                </button>
            </div>
            <div class="answer-container" data-index="${index}">
                <div class="answer-text">${formattedAnswer}</div>
            </div>
        `;
        qaList.appendChild(qaItem);
    });

    // Add event listeners
    setupToggleListeners();
}

function setupToggleListeners() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const questionHeaders = document.querySelectorAll('.question-header');
    let currentlyOpen = null;

    function toggleAnswer(index) {
        const answerContainer = document.querySelector(`.answer-container[data-index="${index}"]`);
        const toggleBtn = document.querySelector(`.toggle-btn[data-index="${index}"]`);

        // If clicking the same question, close it
        if (currentlyOpen === index) {
            answerContainer.classList.remove('active');
            toggleBtn.classList.remove('active');
            currentlyOpen = null;
        } else {
            // Close previously open answer
            if (currentlyOpen !== null) {
                const prevAnswer = document.querySelector(`.answer-container[data-index="${currentlyOpen}"]`);
                const prevToggle = document.querySelector(`.toggle-btn[data-index="${currentlyOpen}"]`);
                if (prevAnswer) {
                    prevAnswer.classList.remove('active');
                }
                if (prevToggle) {
                    prevToggle.classList.remove('active');
                }
            }

            // Open new answer
            answerContainer.classList.add('active');
            toggleBtn.classList.add('active');
            currentlyOpen = index;
        }
    }

    // Add click listeners to toggle buttons
    toggleButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = parseInt(button.getAttribute('data-index'));
            toggleAnswer(index);
        });
    });

    // Add click listeners to question headers (for better UX)
    questionHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            // Don't trigger if clicking the button itself
            if (e.target.closest('.toggle-btn')) return;
            const index = parseInt(header.getAttribute('data-index'));
            toggleAnswer(index);
        });
    });
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', loadQAData);
