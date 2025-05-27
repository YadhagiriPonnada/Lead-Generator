document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('leadForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const submitLoader = document.getElementById('submitLoader');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = form.querySelector('.submit-btn');

    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        }
        nameError.style.display = 'none';
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            emailError.style.display = 'block';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    }

    function showMessage(type, message) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll message into view
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function setLoading(isLoading) {
        submitBtn.disabled = isLoading;
        submitLoader.style.display = isLoading ? 'block' : 'none';
        submitBtn.querySelector('.btn-text').style.opacity = isLoading ? '0' : '1';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();

        if (!isNameValid || !isEmailValid) {
            return;
        }

        // Prepare form data
        const formData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            company: document.getElementById('company').value.trim(),
            message: document.getElementById('message').value.trim()
        };

        try {
            setLoading(true);
            const response = await fetch('https://yadhagiri.app.n8n.cloud/webhook/lead', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': window.location.origin
                },
                mode: 'cors',
                credentials: 'omit',
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.text();
                console.error('Server response:', errorData);
                throw new Error(`Server error: ${response.status}`);
            }

            // Clear form
            form.reset();
            showMessage('success', '✅ Message has been sent. Please check your mail and also check your spam folder.');
            
            // Reset any previous error styling
            nameError.style.display = 'none';
            emailError.style.display = 'none';
        } catch (error) {
            console.error('Submission error:', error);
            showMessage('error', '❌ Failed to send your message. Please try again. If the problem persists, please check your connection.');
            
            // Log detailed error for debugging
            if (error.message.includes('Failed to fetch') || error.message.includes('Network')) {
                console.error('Network error - Please check your internet connection');
            }
        } finally {
            setLoading(false);
        }
    });
}); 