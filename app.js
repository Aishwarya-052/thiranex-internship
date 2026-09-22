document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio JavaScript loaded successfully.");

    // Handle Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop page refresh

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            // Display confirmation feedback (or handle an API post request)
            alert(`Thank you, ${name}! Your message has been simulated successfully.`);
            
            // Clear input fields
            contactForm.reset();
        });
    }
});
            if (response.status === 404) {
                throw new Error('City not found. Check spelling!');
            } else {
                throw new Error('Network issue encountered.');
            }
        }

        const data = await response.json();
        renderWeather(data);

    } catch (error) {
        errorDisplay.textContent = error.message;
        errorDisplay.style.display = 'block';
    }
}

function renderWeather(data) {
    cityNameEl.textContent = data.name;
    tempEl.textContent = Math.round(data.main.temp);
    humidityEl.textContent = data.main.humidity;
    windEl.textContent = data.wind.speed;

    weatherDisplay.classList.add('active');
}
