let isEnabled = true; // default

// Load initial state
chrome.storage.local.get(['enabled'], (result) => {
    isEnabled = result.enabled !== false;
});

// Listen for changes (keeps it in sync with popup)
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        isEnabled = changes.enabled.newValue;
    }
});

function cleanCopiedText(text) {
    if (!text) return '';

    return text
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\u00A0/g, ' ')
        .replace(/[ \t]+/g, ' ')
        .replace(/\n{2,}/g, '\n')
        .split('\n')
        .map(line => line.trim())
        .join('\n')
        .trim();
}

document.addEventListener('copy', function (event) {
    if (!isEnabled) return;

    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const text = selection.toString();
    if (!text) return;

    const cleaned = cleanCopiedText(text);

    // MUST be synchronous
    event.preventDefault();
    event.clipboardData.setData('text/plain', cleaned);

    console.log('Original:', text);
    console.log('Cleaned:', cleaned);
});