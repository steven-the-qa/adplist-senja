"use strict";
let userId = null;
let adpListReviews = [];
function submitProfileUrl() {
    const profileUrlInput = document.getElementById('profileUrl');
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');
    if (!profileUrlInput.value) {
        if (responseDiv) {
            responseDiv.textContent = 'Please enter your ADPList Mentor Profile URL\n\nExample: https://adplist.org/mentors/steven-boutcher';
        }
        return;
    }
    fetch(`/.netlify/functions/fetchUser?profileUrl=${profileUrlInput.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
        console.log(data.data.legacyId);
        userId = data.data.legacyId;
    });
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
        if (responseDiv) {
            responseDiv.textContent = JSON.stringify(data, null, 2);
        }
        if (clearButton) {
            clearButton.style.display = 'inline';
        }
    })
        .catch(error => {
        if (responseDiv) {
            responseDiv.textContent = `Error: script.js: ${error.message}`;
        }
        if (clearButton) {
            clearButton.style.display = 'inline';
        }
    });
}
function submitApiKey() {
    const senjaApiKeyInput = document.getElementById('senjaApiKey');
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');
    if (!senjaApiKeyInput.value) {
        if (responseDiv) {
            responseDiv.textContent = 'Please enter your Senja API Key';
        }
        return;
    }
    if (adpListReviews.length === 0) {
        if (responseDiv) {
            responseDiv.textContent = 'Please fetch ADPList reviews first';
        }
        return;
    }
    fetch('/.netlify/functions/createTestimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senjaApiKey: senjaApiKeyInput.value, adpListReviews }),
    })
        .then(response => response.json())
        .then(data => {
        if (responseDiv) {
            responseDiv.textContent = JSON.stringify(data, null, 2);
        }
        if (clearButton) {
            clearButton.style.display = 'inline';
        }
    })
        .catch(error => {
        if (responseDiv) {
            responseDiv.textContent = `Error: ${error.message}`;
        }
        if (clearButton) {
            clearButton.style.display = 'inline';
        }
    });
}
function clearResponse() {
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');
    if (responseDiv) {
        responseDiv.textContent = '';
    }
    if (clearButton) {
        clearButton.style.display = 'none';
    }
}
