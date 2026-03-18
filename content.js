function cleanCopiedText(text) {
    if (!text) return '';

    return text
        // Remove invisible / non-printable characters (except line breaks and tabs)
        .replace(/[\u200B-\u200D\uFEFF]/g, '')   // zero-width spaces, BOM
        .replace(/\u00A0/g, ' ')                // non-breaking spaces → normal space

        // Normalise whitespace
        .replace(/[ \t]+/g, ' ')                // collapse multiple spaces/tabs
        .replace(/\n{2,}/g, '\n')               // collapse multiple line breaks

        // Trim each line (optional but useful)
        .split('\n')
        .map(line => line.trim())
        .join('\n')

        // Final trim
        .trim();
}

document.addEventListener('copy', function (event) {
    const selection = window.getSelection();
    if (!selection) return;

    const text = selection.toString();
    if (!text) return;

    const cleaned = cleanCopiedText(text);

    // Override clipboard content
    event.preventDefault();
    event.clipboardData.setData('text/plain', cleaned);
});