//strugglingcomment.js

// Define the submitComment function
const submitComment = (event) => {
  event.preventDefault();
  const commentForm = event.target;
  const formData = new FormData(commentForm);
  fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams(formData).toString(),
  })
  .then(response => {
    if (response.ok) {
        //show hidden div to thank user for struggling comment
        document.getElementById("thanks-comment").style.display = 'block';
        // Optionally, hide the comment form to prevent further submissions
          commentForm.style.display = 'none';
    } else {
        //show hidden div to alert user of error submitting comment
        document.getElementById("problem-comment").style.display = 'block';
        
    }
    commentForm.reset(); // Reset the form fields after submission
})
.catch((error) => {
  console.error('Error:', error);
  // Show hidden div to alert user of error submitting comment
  document.getElementById("problem-comment").style.display = 'block';
});

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


