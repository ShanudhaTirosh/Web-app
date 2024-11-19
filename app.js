document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const resultArea = document.getElementById('resultArea');
    const copyBtn = document.getElementById('copyBtn');
    const apiKeyInput = document.getElementById('apiKeyInput');
    const promptInput = document.getElementById('promptInput');
    const aiModelSelect = document.getElementById('aiModelSelect');
    const languageSelect = document.getElementById('languageSelect');
    const projectTypeSelect = document.getElementById('projectTypeSelect');
    const frameworkSelect = document.getElementById('frameworkSelect');
    const fileUpload = document.getElementById('fileUpload');

    // Clipboard functionality
    const clipboard = new ClipboardJS(copyBtn, {
        target: () => resultArea
    });

    clipboard.on('success', (e) => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy Code';
        }, 2000);
    });

    clipboard.on('error', (e) => {
        console.error('Clipboard copy failed', e);
    });

    generateBtn.addEventListener('click', async () => {
        const apiKey = apiKeyInput.value;
        const prompt = promptInput.value;
        const aiModel = aiModelSelect.value;
        const language = languageSelect.value;
        const projectType = projectTypeSelect.value;
        const framework = frameworkSelect.value;

        if (!apiKey || !prompt) {
            alert('Please enter API key and prompt');
            return;
        }

        try {
            const generatedCode = await generateCodeTemplate(
                language, 
                projectType, 
                framework, 
                prompt
            );

            resultArea.textContent = generatedCode;
            hljs.highlightElement(resultArea);
        } catch (error) {
            resultArea.textContent = `Error: ${error.message}`;
        }
    });
});

// Comprehensive Code Generation Templates
function generateCodeTemplate(language, projectType, framework, prompt) {
    const codeTemplates = {
        html: {
            'web-app': (framework, prompt) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${prompt} Web App</title>
    ${getFrameworkCSS(framework)}
</head>
<body>
    <div class="container">
        <h1>${prompt} Application</h1>
        <!-- Main content goes here -->
    </div>
    ${getFrameworkJS(framework)}
</body>
</html>
            `,
            'landing-page': (framework, prompt) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${prompt} Landing Page</title>
    ${getFrameworkCSS(framework)}
    <style>
        .hero {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="hero-content text-center">
            <h1>${prompt} - Coming Soon</h1>
            <p>Revolutionary solution for your needs</p>
        </div>
    </section>
    ${getFrameworkJS(framework)}
</body>
</html>
            `
        },
        css: {
            'web-app': (framework) => `
/* Base Styles */
body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Responsive Layout */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
}
             `,
            'landing-page': () => `
/* Landing Page Styles */
.hero {
    background: linear-gradient(to right, #6a11cb, #2575fc);
    color: white;
    padding: 50px 0;
    text-align: center;
}
            `
        },
        js: {
            'web-app': () => `
document.addEventListener('DOMContentLoaded', () => {
    console.log('Web App Loaded');
});
            `,
            'landing-page': () => `
document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page Loaded');
});
            `
        },
        arduino: () => `
void setup() {
    Serial.begin(9600);
}

void loop() {
    Serial.println("${prompt}");
    delay(1000);
}
        `
    };

    return codeTemplates[language][projectType](framework, prompt);
}

function getFrameworkCSS(framework) {
    switch (framework) {
        case 'tailwind':
            return '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
        case 'bootstrap':
            return '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">';
        case 'bulma':
            return '<link href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css" rel="stylesheet">';
        default:
            return '';
    }
}

function getFrameworkJS(framework) {
    switch (framework) {
        case 'bootstrap':
            return '<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script><script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.2/dist/js/bootstrap.bundle.min.js"></script>';
        default:
            return '';
    }
}