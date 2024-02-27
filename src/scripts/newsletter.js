// newsletter.js
    // Defines a function to handle the form submission event
const handleSubmit = (event) => {
    // Prevents the default form submission behavior, which would cause a page reload
    event.preventDefault();

    // Retrieves the form element that triggered the submit event
    const myForm = event.target;

    // Creates a new FormData object, capturing the form's current values
    const formData = new FormData(myForm);

    // Uses the Fetch API to asynchronously submit the form data to the server
    fetch("/", {
        method: "POST", // Specifies the HTTP method to use for the request
        headers: {
            // Sets the Content-Type header to indicate the format of the data being sent
            "Content-Type": "application/x-www-form-urlencoded"
        },
        // Converts the FormData object to a URL-encoded string, suitable for POSTing
        body: new URLSearchParams(formData).toString(),
    })
    .then(response => {
        // Checks if the server responded with a success status code
        if (response.ok) {
            // If the submission was successful, display a success message to the user
            document.getElementById("success-message").style.display = 'block';
            alert("Thank you for subscribing 🥳");

            // Hides the form to prevent further submissions and reduce clutter
            myForm.style.display = 'none';
            document.getElementById("text-subscribe").style.display = 'none';

            // Resets the form fields to their initial values
            myForm.reset();
        } else {
            // If the server response was not successful, throw an error
            throw new Error('Network response was not ok.');
        }
    })
    .catch((error) => {
        // Catches any errors that occurred during the fetch operation or response handling
        alert(error);
    });
};

// Defines a function to attach the submit event listener to the form
const attachFormSubmitListener = () => {
    // Retrieves the form element by its ID
    const form = document.getElementById("newsletter-form");

    // Checks if the form element exists
    if (form) {
        // Removes any existing submit event listeners to avoid duplicate submissions
        form.removeEventListener("submit", handleSubmit);
        // Adds the handleSubmit function as an event listener for the form's submit event
        form.addEventListener("submit", handleSubmit);
    }
};

// Attaches the form submit event listener once the DOM content has fully loaded
document.addEventListener("DOMContentLoaded", attachFormSubmitListener);
// Re-attaches the form submit event listener after any dynamic content swaps, useful in SPA frameworks
document.addEventListener("astro:after-swap", attachFormSubmitListener);
