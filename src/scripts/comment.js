//commentForm.js

// Define the submitComment function
const submitComment = async (event) => {
  event.preventDefault();
  const commentForm = event.target;
  const formData = new FormData(commentForm);
  try {
    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    });


// Show hidden div to thank user for comment
document.getElementById("thanks-comment").style.display = 'block';
// Optionally, hide the comment form to prevent further submissions
commentForm.style.display = 'none';
} catch (error) {
console.error('Error:', error);
// Show hidden div to alert user of error submitting comment
document.getElementById("problem-comment").style.display = 'block';
}
commentForm.reset(); // Reset the form fields after submission
};


const attachFormSubmitListener = () => {
  const form = document.getElementById("comment-form");
  if (form) {
      form.removeEventListener("submit", submitComment); // Remove any existing listeners to avoid duplicates
      form.addEventListener("submit", submitComment);
  }
};

document.addEventListener("DOMContentLoaded", attachFormSubmitListener);
document.addEventListener("astro:after-swap", attachFormSubmitListener);


