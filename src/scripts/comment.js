//commentForm.js

// Define the submitComment function
const submitComment = (event) => {
  // Prevent the default form submit action to handle with JavaScript
  event.preventDefault();
  
  // Get the form that triggered the event
  const commentForm = event.target;
  
  // Create a new FormData object, which is a way to encapsulate form data to send to the server
  const formData = new FormData(commentForm);
  
  fetch("/", {
      method: "POST", // Specify the method to be POST
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
      //document.getElementById("success-message").style.display = 'block';
      alert("Thank you for your comment😀");

      // Hides the form to prevent further submissions and reduce clutter
      commentForm.style.display = 'none';

      // Resets the form fields to their initial values
      commentForm.reset();
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

// Define a function to attach the submit event listener to the form
const attachFormSubmitListener = () => {
  // Get the form element by its ID
  const form = document.getElementById("comment-form");
  
  // If the form exists, attach the submitComment function as an event listener
  if (form) {
      // Remove any existing submit event listeners to avoid duplicate submissions
      form.removeEventListener("submit", submitComment);
      
      // Add a new submit event listener to handle form submissions
      form.addEventListener("submit", submitComment);
  }
};

// Attach the form submit event listener when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", attachFormSubmitListener);

// Reattach the form submit event listener after any dynamic content swaps
document.addEventListener("astro:after-swap", attachFormSubmitListener);