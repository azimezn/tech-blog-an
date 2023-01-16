const commentFormHandler = async (event) => {
  event.preventDefault();

  const comment = document.querySelector('#comment-content').value.trim();

  if (comment) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body: comment }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/api/posts/${postID}`);
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);