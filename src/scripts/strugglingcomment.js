//strugglingcomment.js

// Define the submitComment function
const submitComment = (event) => {
  event.preventDefault();
  const commentForm = document.getElementById("comment-form");
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
      alert("Thank you for your comment");
      commentForm.reset(); // Reset the form fields after successful submission
    } else {
      throw new Error('Network response was not ok.');
    }
  })
  .catch((error) => {
    alert(error);
  });
};

// Attach the submitComment function to the form's submit event
document.addEventListener("DOMContentLoaded", () => {
  const commentForm = document.getElementById("comment-form");
  if (commentForm) {
    commentForm.addEventListener("submit", submitComment);
  }
});