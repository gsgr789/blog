// newsletter.js
    const handleSubmit = (event) => {
        event.preventDefault();
        const myForm = event.target;
        const formData = new FormData(myForm);
        fetch("/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams(formData).toString(),
        })
        .then(response => {
            if (response.ok) {
                //show hidden div so user can send struggling comment
                document.getElementById("success-message").style.display = 'block';
                alert("Thank you for your submission");

      // Hide the first email form after submitting, so when user sees comment box is hidden and not cluttered; by setting its display style to 'none'
      myForm.style.display = 'none';

                myForm.reset(); // Reset the form fields after successful submission
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .catch((error) => {
            alert(error);
        });
    };
    
    const attachFormSubmitListener = () => {
        const form = document.getElementById("newsletter-form");
        if (form) {
            form.removeEventListener("submit", handleSubmit); // Remove any existing listeners to avoid duplicates
            form.addEventListener("submit", handleSubmit);
        }
    };
    
    document.addEventListener("DOMContentLoaded", attachFormSubmitListener);
    document.addEventListener("astro:after-swap", attachFormSubmitListener);
    