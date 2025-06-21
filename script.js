// script.js
document.getElementById('episodeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const episodeNumber = document.getElementById('episodeNumber').value;
    const episodeTitle = document.getElementById('episodeTitle').value;
    const passages = document.getElementById('passages').value;
    const dateRecorded = document.getElementById('dateRecorded').value;
    const series = document.getElementById('series').value;
    const theme = document.getElementById('theme').value;
    const hosts = document.getElementById('hosts').value;
    // add in scriptures 
    const scriptures = document.getElementById('scriptures').value;

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
${series ? `Series: ${series}` : ''}
${theme ? `Theme: ${theme}` : ''}
${hosts ? `Hosts: ${hosts}` : ''}
${scriptures ? `Scriptures: ${scriptures}` : ''}
${keyPoints ? `Key Points:\n${keyPoints}` : ''}
${prayer ? `Closing Prayer:\n${prayer}` : ''}
----------------------------------------`;

    // Generate HTML template for display with bold titles
    const htmlTemplate = `
<strong>Detour 365 - Episode ${episodeNumber}: ${episodeTitle}</strong>
<strong>Date Recorded:</strong> ${date}
<strong>Scripture Passages:</strong> ${passages}
${series ? `<strong>Series:</strong> ${series}` : ''}
${theme ? `<strong>Theme:</strong> ${theme}` : ''}
${hosts ? `<strong>Hosts:</strong> ${hosts}` : ''}
${scriptures ? `<strong>Scriptures:</strong> ${scriptures}` : ''}
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
            .replace(/^Series:.*$/m, '<strong>Series:</strong> $&'.replace('Series: ', ''))
            .replace(/^Theme:.*$/m, '<strong>Theme:</strong> $&'.replace('Theme: ', ''))
            .replace(/^Hosts:.*$/m, '<strong>Hosts:</strong> $&'.replace('Hosts: ', ''))
            .replace(/^Scriptures:.*$/m, '<strong>Scriptures:</strong> $&'.replace('Scriptures: ', ''))
            .replace(/^Key Points:.*$/m, '<strong>Key Points:</strong>\n$&'.replace('Key Points: ', ''))
            .replace(/^Closing Prayer:.*$/m, '<strong>Closing Prayer:</strong>\n$&'.replace('Closing Prayer: ', ''))
            .replace(/^----------------------------------------$/m, '<strong>----------------------------------------</strong>');
        document.getElementById('templateOutput').innerHTML = htmlTemplate;
        document.getElementById('copyButton').style.display = 'block';
    }
});