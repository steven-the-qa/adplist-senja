let userId: string = '';
let adpListResponse: any[] = [];

function submitUserId(): void {
    const userIdInput = document.getElementById('userId') as HTMLInputElement;
    userId = userIdInput.value;
    if (userId) {
        const apiKeyModal = document.getElementById('apiKeyModal') as HTMLDivElement;
        apiKeyModal.style.display = 'block';
    } else {
        alert('Please enter a User ID');
    }
}

function submitApiKey(): void {
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
    const apiKey = apiKeyInput.value;
    if (apiKey) {
        const submitButton = document.querySelector('.modal-content button') as HTMLButtonElement;
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
            const responseElement = document.getElementById('response') as HTMLDivElement;
            responseElement.textContent = JSON.stringify(data, null, 2);
            const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
            clearButton.style.display = 'block';
            const apiKeyModal = document.getElementById('apiKeyModal') as HTMLDivElement;
            apiKeyModal.style.display = 'none';
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

function clearResponse(): void {
    const responseElement = document.getElementById('response') as HTMLDivElement;
    responseElement.textContent = '';
    const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
    clearButton.style.display = 'none';
    const userIdInput = document.getElementById('userId') as HTMLInputElement;
    userIdInput.value = '';
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
    apiKeyInput.value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const userIdForm = document.getElementById('userIdForm') as HTMLDivElement;
    const senjaForm = document.getElementById('senjaForm') as HTMLDivElement;
    const userIdInput = document.getElementById('userId') as HTMLInputElement;
    const submitUserIdButton = document.getElementById('submitUserId') as HTMLButtonElement;
    const senjaApiKeyInput = document.getElementById('senjaApiKey') as HTMLInputElement;
    const submitSenjaApiKeyButton = document.getElementById('submitSenjaApiKey') as HTMLButtonElement;
    const successBanner = document.getElementById('successBanner') as HTMLDivElement;
    const errorBanner = document.getElementById('errorBanner') as HTMLDivElement;

    submitUserIdButton.addEventListener('click', async () => {
        const userId = userIdInput.value.trim();
        if (!userId) {
            alert('Please enter a User ID');
            return;
        }

        submitUserIdButton.disabled = true;
        successBanner.style.display = 'none';
        errorBanner.style.display = 'none';

        try {
            const response = await fetch('/api/adplist-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch ADPList reviews');
            }

            adpListResponse = await response.json();
            successBanner.textContent = `Successfully fetched ${adpListResponse.length} reviews`;
            successBanner.style.display = 'block';
            userIdForm.style.display = 'none';
            senjaForm.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            errorBanner.style.display = 'block';
        } finally {
            submitUserIdButton.disabled = false;
        }
    });

    submitSenjaApiKeyButton.addEventListener('click', async () => {
        const senjaApiKey = senjaApiKeyInput.value.trim();
        if (!senjaApiKey) {
            alert('Please enter a Senja API Key');
            return;
        }

        submitSenjaApiKeyButton.disabled = true;
        successBanner.style.display = 'none';
        errorBanner.style.display = 'none';

        try {
            const response = await fetch('/api/senja-testimonial', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    senjaApiKey,
                    adpListReviews: adpListResponse
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to create Senja testimonials');
            }

            const results = await response.json();
            successBanner.textContent = `Successfully created ${results.length} testimonials`;
            successBanner.style.display = 'block';
        } catch (error) {
            console.error('Error:', error);
            errorBanner.textContent = 'Failed to create testimonials. Please try again.';
            errorBanner.style.display = 'block';
        } finally {
            submitSenjaApiKeyButton.disabled = false;
        }
    });
});
