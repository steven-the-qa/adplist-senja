"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let userId = '';
let adpListResponse = null;
function submitUserId() {
    const userIdInput = document.getElementById('userId');
    userId = userIdInput.value;
    if (userId) {
        const apiKeyModal = document.getElementById('apiKeyModal');
        apiKeyModal.style.display = 'block';
    }
    else {
        alert('Please enter a User ID');
    }
}
function submitApiKey() {
    const apiKeyInput = document.getElementById('apiKey');
    const apiKey = apiKeyInput.value;
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
            const responseElement = document.getElementById('response');
            responseElement.textContent = JSON.stringify(data, null, 2);
            const clearButton = document.getElementById('clearButton');
            clearButton.style.display = 'block';
            const apiKeyModal = document.getElementById('apiKeyModal');
            apiKeyModal.style.display = 'none';
        })
            .catch(error => {
            alert('Error: ' + error.message);
        })
            .finally(() => {
            submitButton.disabled = false;
            submitButton.textContent = 'Submit';
        });
    }
    else {
        alert('Please enter an API Key');
    }
}
function clearResponse() {
    const responseElement = document.getElementById('response');
    responseElement.textContent = '';
    const clearButton = document.getElementById('clearButton');
    clearButton.style.display = 'none';
    const userIdInput = document.getElementById('userId');
    userIdInput.value = '';
    const apiKeyInput = document.getElementById('apiKey');
    apiKeyInput.value = '';
}
document.addEventListener('DOMContentLoaded', () => {
    const userIdForm = document.getElementById('userIdForm');
    const senjaForm = document.getElementById('senjaForm');
    const userIdInput = document.getElementById('userId');
    const submitUserIdButton = document.getElementById('submitUserId');
    const successBanner = document.getElementById('successBanner');
    const errorBanner = document.getElementById('errorBanner');
    submitUserIdButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
        const userId = userIdInput.value.trim();
        if (!userId) {
            alert('Please enter a User ID');
            return;
        }
        submitUserIdButton.disabled = true;
        successBanner.style.display = 'none';
        errorBanner.style.display = 'none';
        try {
            const response = yield fetch('/api/adplist-review', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!response.ok) {
                throw new Error('Failed to fetch ADPList review');
            }
            adpListResponse = yield response.json();
            successBanner.style.display = 'block';
            userIdForm.style.display = 'none';
            senjaForm.style.display = 'block';
        }
        catch (error) {
            console.error('Error:', error);
            errorBanner.style.display = 'block';
        }
        finally {
            submitUserIdButton.disabled = false;
        }
    }));
});
