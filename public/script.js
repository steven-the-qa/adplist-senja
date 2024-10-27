"use strict";
let adpListReviews = [];
function submitUserId() {
    const userIdInput = document.getElementById('userId');
    const responseDiv = document.getElementById('response');
    const clearButton = document.getElementById('clearButton');

    if (!userIdInput) {
        console.error('User ID input element not found');
        if (responseDiv) {
            responseDiv.textContent = 'Error: User ID input not found';
        }
        return;
    }

    if (!userIdInput.value) {
        if (responseDiv) {
            responseDiv.textContent = 'Please enter your User ID';
        }
        return;
    }
    fetch('/.netlify/functions/fetchReviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userIdInput.value }),
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
