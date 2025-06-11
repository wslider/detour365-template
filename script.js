// script.js
document.getElementById('episodeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const episodeNumber = document.getElementById('episodeNumber').value;
    const episodeTitle = document.getElementById('episodeTitle').value;
    const passages = document.getElementById('passages').value;
    const dateRecorded = document.getElementById('dateRecorded').value;
    const theme = document.getElementById('theme').value;
    const guest = document.getElementById('guest').value;
    const keyPoints = document.getElementById('keyPoints').value;
    const prayer = document.getElementById('prayer').value;

// Format the date
    const date = new Date(dateRecorded).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Generate the template (plain text for copying)
    const plainTemplate = `
Detour 365 - Episode ${episodeNumber}: ${episodeTitle}
Date Recorded: ${date}
Scripture Passages: ${passages}
${theme ? `Theme: ${theme}` : ''}
${guest ? `Guest Speaker: ${guest}` : ''}
${keyPoints ? `Key Points:\n${keyPoints}` : ''}
${prayer ? `Closing Prayer:\n${prayer}` : ''}
----------------------------------------`;

    // Generate HTML template for display with bold titles
    const htmlTemplate = `
<strong>Detour 365 - Episode ${episodeNumber}: ${episodeTitle}</strong>
<strong>Date Recorded:</strong> ${date}
<strong>Scripture Passages:</strong> ${passages}
${theme ? `<strong>Theme:</strong> ${theme}` : ''}
${guest ? `<strong>Guest Speaker:</strong> ${guest}` : ''}
${keyPoints ? `<strong>Key Points:</strong>\n${keyPoints}` : ''}
${prayer ? `<strong>Closing Prayer:</strong>\n${prayer}` : ''}
<strong>----------------------------------------</strong>`;

    // Display the HTML template
    const outputElement = document.getElementById('templateOutput');
    outputElement.innerHTML = htmlTemplate;

    // Log plain text to console
    console.log(plainTemplate);

    // Show copy button
    const copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'block';

    // Store in localStorage
    localStorage.setItem('lastTemplate', plainTemplate);
});

// Copy to clipboard (plain text for Word compatibility)
document.getElementById('copyButton').addEventListener('click', function() {
    const plainTemplate = localStorage.getItem('lastTemplate') || document.getElementById('templateOutput').textContent;
    navigator.clipboard.writeText(plainTemplate).then(() => {
        alert('Template copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy template. Please select and copy manually.');
    });
});

// Load saved template on page load
window.addEventListener('load', function() {
    const savedTemplate = localStorage.getItem('lastTemplate');
    if (savedTemplate) {
        const htmlTemplate = savedTemplate
            .replace(/^Detour 365 - Episode.*$/m, '<strong>$&</strong>')
            .replace(/^Date Recorded:.*$/m, '<strong>Date Recorded:</strong> $&'.replace('Date Recorded: ', ''))
            .replace(/^Scripture Passages:.*$/m, '<strong>Scripture Passages:</strong> $&'.replace('Scripture Passages: ', ''))
            .replace(/^Theme:.*$/m, '<strong>Theme:</strong> $&'.replace('Theme: ', ''))
            .replace(/^Guest Speaker:.*$/m, '<strong>Guest Speaker:</strong> $&'.replace('Guest Speaker: ', ''))
            .replace(/^Key Points:.*$/m, '<strong>Key Points:</strong>\n$&'.replace('Key Points: ', ''))
            .replace(/^Closing Prayer:.*$/m, '<strong>Closing Prayer:</strong>\n$&'.replace('Closing Prayer: ', ''))
            .replace(/^----------------------------------------$/m, '<strong>----------------------------------------</strong>');
        document.getElementById('templateOutput').innerHTML = htmlTemplate;
        document.getElementById('copyButton').style.display = 'block';
    }
});