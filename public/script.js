let userId = '';
let adpListReviews = [];

function submitUserId() {
    const userId = document.getElementById('userId').value;
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');

    if (!userId) {
        responseDiv.textContent = 'Please enter a User ID';
        return;
    }

    fetch('/.netlify/functions/fetchReviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    .then(response => response.json())
    .then(data => {
        adpListReviews = data; // Store the reviews for later use
        responseDiv.textContent = JSON.stringify(data, null, 2);
        clearButton.style.display = 'inline';
    })
    .catch(error => {
        responseDiv.textContent = `Error: ${error.message}`;
        clearButton.style.display = 'inline';
    });
}

function submitApiKey() {
    const senjaApiKey = document.getElementById('senjaApiKey').value;
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');

    if (!senjaApiKey) {
        responseDiv.textContent = 'Please enter your Senja API Key';
        return;
    }

    if (adpListReviews.length === 0) {
        responseDiv.textContent = 'Please fetch ADPList reviews first';
        return;
    }

    fetch('/.netlify/functions/createTestimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senjaApiKey, adpListReviews }),
    })
    .then(response => response.json())
    .then(data => {
        responseDiv.textContent = JSON.stringify(data, null, 2);
        clearButton.style.display = 'inline';
    })
    .catch(error => {
        responseDiv.textContent = `Error: ${error.message}`;
        clearButton.style.display = 'inline';
    });
}

function clearResponse() {
    document.getElementById('response').textContent = '';
    document.getElementById('clearButton').style.display = 'none';
}
