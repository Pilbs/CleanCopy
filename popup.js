const toggle = document.getElementById('toggle');
const status = document.getElementById('status');

// Load saved state
chrome.storage.local.get(['enabled'], (result) => {
    const isEnabled = result.enabled !== false; // default = true
    toggle.checked = isEnabled;
    status.textContent = isEnabled ? 'Enabled' : 'Disabled';
});

// Save state on change
toggle.addEventListener('change', () => {
    const isEnabled = toggle.checked;

    chrome.storage.local.set({ enabled: isEnabled });

    status.textContent = isEnabled ? 'Enabled' : 'Disabled';
});