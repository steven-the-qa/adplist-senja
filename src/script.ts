let userId: string | null = null;
let adpListReviews: any[] = [];

async function submitProfileUrl() {
    const profileUrlInput = document.getElementById('profileUrl') as HTMLInputElement;
    const responseDiv = document.getElementById('response') as HTMLDivElement;
    const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
    if (!profileUrlInput.value) {
        if (responseDiv) {
            responseDiv.textContent = 'Please enter your ADPList Mentor Profile URL\n\nExample: https://adplist.org/mentors/steven-boutcher';
        }
        return;
    }

    const userIdResponse = await fetch(`/.netlify/functions/fetchUser?profileUrl=${profileUrlInput.value}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    const userIdData = await userIdResponse.json();
    userId = userIdData.data.legacyId;

    const reviewsResponse = await fetch('/.netlify/functions/fetchReviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }),
    })
    const reviewsData = await reviewsResponse.json();
    adpListReviews = reviewsData; // Store the reviews for later use
    if (responseDiv) {
        responseDiv.textContent = JSON.stringify(reviewsData, null, 2);
    }
        if (clearButton) {
            clearButton.style.display = 'inline';
    }
}

async function submitApiKey() {
    const senjaApiKeyInput = document.getElementById('senjaApiKey') as HTMLInputElement;
    const responseDiv = document.getElementById('response') as HTMLDivElement;
    const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
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

    const testimonialsResponse = await fetch('/.netlify/functions/createTestimonials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ senjaApiKey: senjaApiKeyInput.value, adpListReviews }),
    })
    const testimonialsData = await testimonialsResponse.json();
    if (responseDiv) {
        responseDiv.textContent = JSON.stringify(testimonialsData, null, 2);
        }
        if (clearButton) {
        clearButton.style.display = 'inline';
    }
}
    
function clearResponse() {
    const responseDiv = document.getElementById('response') as HTMLDivElement;
    const clearButton = document.getElementById('clearButton') as HTMLButtonElement;
    if (responseDiv) {
        responseDiv.textContent = '';
    }
    if (clearButton) {
        clearButton.style.display = 'none';
    }
}
