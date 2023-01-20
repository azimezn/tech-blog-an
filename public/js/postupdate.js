const updateFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();
  const id = document.URL.split("/");

  if (title && content) {
    const response = await fetch(`/api/posts/${id[id.length - 1]}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      location.reload();
    } else {
      alert('Failed to update post');
    }
  }
};



document
  .querySelector('.update-post-form')
  .addEventListener('submit', updateFormHandler);
