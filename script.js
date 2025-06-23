document.getElementById('episodeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values for Episode Notes
    const episodeNumber = document.getElementById('episodeNumber').value;
    const title = document.getElementById('title').value;
    const passages = document.getElementById('passages').value;
    const hosts = document.getElementById('hosts').value;
    const recordedLive = new Date(document.getElementById('recordedLive').value).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const bigIdea = document.getElementById('bigIdea').value;
    const context = document.getElementById('context').value;
    const fullText = document.getElementById('fullText').value.replace(/\n/g, '<br>');
    const mainPoint = document.getElementById('mainPoint').value;
    const subPoints = document.getElementById('subPoints').value.replace(/\n/g, '<br>');
    const application = document.getElementById('application').value.replace(/\n/g, '<br>');
    const prayerRequests = document.getElementById('prayerRequests').value.replace(/\n/g, '<br>');

    // Generate Episode Notes template
    const episodeNotesTemplate = `
<strong>Detour 365 Episode Notes</strong>
<strong>Episode #:</strong> ${episodeNumber}
<strong>Title:</strong> ${title}
<strong>Passages:</strong> ${passages}
<strong>Hosts:</strong> ${hosts}
<strong>Recorded Live On:</strong> ${recordedLive}
<strong>Big Idea:</strong> ${bigIdea}
<strong>Context:</strong> ${context}
<strong>Passages (Full Text):</strong> ${fullText}
<strong>Main Point:</strong> ${mainPoint}
<strong>Sub-Points and Notes:</strong><br>${subPoints}
<strong>Applications & Reflection:</strong><br>${application}
<strong>Prayer Requests:</strong><br>${prayerRequests}
<strong>----------------------------------------</strong>`;

    // Log to console for copy-paste
    console.log('=== Detour 365 Episode Notes ===\n' + episodeNotesTemplate.replace(/<br>/g, '\n').replace(/<\/?strong>/g, ''));

    // Display in output
    document.getElementById('templateOutput').innerHTML = episodeNotesTemplate;
    document.getElementById('copyButton').style.display = 'block';
});

document.getElementById('descriptionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values for YouTube & Spotify Description
    const descEpisodeNumber = document.getElementById('descEpisodeNumber').value;
    const descTitle = document.getElementById('descTitle').value;
    const descPassages = document.getElementById('descPassages').value;
    const descHosts = document.getElementById('descHosts').value;
    const descRecordedLive = new Date(document.getElementById('descRecordedLive').value).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
    });
    const descBigIdea = document.getElementById('descBigIdea').value;
    const tags = document.getElementById('tags').value;

    // Generate Description template
    const descriptionTemplate = `
<strong>Detour 365 Episode - YouTube & Spotify Description</strong>
<strong>Episode #:</strong> ${descEpisodeNumber}
<strong>Title:</strong> ${descTitle}
<strong>Passages:</strong> ${descPassages}
<strong>Hosts:</strong> ${descHosts}
<strong>Recorded Live On:</strong> ${descRecordedLive}
<strong>Big Idea:</strong> ${descBigIdea}
<strong># Tags:</strong> ${tags}
<strong>----------------------------------------</strong>`;

    // Log to console for copy-paste
    console.log('=== Detour 365 Episode - YouTube & Spotify Description ===\n' + descriptionTemplate.replace(/<br>/g, '\n').replace(/<\/?strong>/g, ''));

    // Display in output
    document.getElementById('templateOutput').innerHTML = descriptionTemplate;
    document.getElementById('copyButton').style.display = 'block';
});

// Copy to clipboard
document.getElementById('copyButton').addEventListener('click', function() {
    const plainText = document.getElementById('templateOutput').innerText.replace(/\n\s*\n/g, '\n').trim();
    navigator.clipboard.writeText(plainText).then(() => {
        alert('Template copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        alert('Failed to copy template. Please select and copy manually.');
    });
});