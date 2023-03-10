const commentFormHandler = async (event) => {
  event.preventDefault();

  const body = document.querySelector('.form-input').value.trim();
  const postID = document.querySelector('.form-input').id;

  if (body) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ body, postID }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace(`/post/${postID}`);
    } else {
      alert(response.statusText);
    }
  }
};


document
  .querySelector('.comment-form')
  .addEventListener('submit', commentFormHandler);