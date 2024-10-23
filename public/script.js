let userId = '';

function submitUserId() {
    userId = document.getElementById('userId').value;
    if (userId) {
        document.getElementById('apiKeyModal').style.display = 'block';
    } else {
        alert('Please enter a User ID');
    }
}

function submitApiKey() {
    const apiKey = document.getElementById('apiKey').value;
    if (apiKey) {
        const submitButton = document.querySelector('.modal-content button');
        submitButton.disabled = true;
        submitButton.textContent = 'Loading...';

        fetch('/api/review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, apiKey }),
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').textContent = JSON.stringify(data, null, 2);
            document.getElementById('clearButton').style.display = 'block';
            document.getElementById('apiKeyModal').style.display = 'none';
        })
        .catch(error => {
            alert('Error: ' + error.message);
        })
        .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
    } else {
        alert('Please enter an API Key');
    }
}

function clearResponse() {
    document.getElementById('response').textContent = '';
    document.getElementById('clearButton').style.display = 'none';
    document.getElementById('userId').value = '';
    document.getElementById('apiKey').value = '';
}
