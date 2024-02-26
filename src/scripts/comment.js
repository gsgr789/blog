//commentForm.js

// Define the submitComment function
const submitComment = async (event) => {
  // Prevent the default form submit action to handle with JavaScript
  event.preventDefault();
  
  // Get the form that triggered the event
  const commentForm = event.target;
  
  // Create a new FormData object, which is a way to encapsulate form data to send to the server
  const formData = new FormData(commentForm);
  
  // Try to send the form data using the Fetch API
  try {
    // Send a POST request to the server root ("/") with the form data
    await fetch("/", {
      method: "POST", // Specify the method to be POST
      headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Set the content type header for the request
      body: new URLSearchParams(formData).toString(), // Convert the FormData object to a URL-encoded string
    });

    // If the request is successful, un-hide the hidden div to display a thank you message
    document.getElementById("thanks-comment").style.display = 'block';
    
    // Optionally, hide the comment form to prevent further submissions
    commentForm.style.display = 'none';
  } catch (error) {
    // If the request fails, log the error to the console
    console.error('Error:', error);
    
    // Display an error message to the user by un-hide the hidden div
    document.getElementById("problem-comment").style.display = 'block';
  }
  
  // Reset the form fields after submission, regardless of success or failure
  commentForm.reset();
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