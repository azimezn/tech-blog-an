const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const content = document.querySelector('#post-content').value.trim();

  if (title && content) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, content }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

// const updButtonHandler = async (event) => {
//   console.log("--- in updButtonHandler")
//   if (event.target.hasAttribute('data-id')) {
//     const id = event.target.getAttribute('data-id');

//     const response = await fetch(`/api/posts/${id}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });

//     console.log("--- response: ", response)
//     if (response.ok) {
//       document.location.replace(`/postupdate/${id}`);
//     } else {
//       alert('Failed to get post on another page');
//     }
//   }
// };


document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);

document.querySelectorAll('.delete-button').forEach(button => {
  button.addEventListener('click', delButtonHandler);
});

// document.querySelectorAll('.update-button').forEach(button => {
//   button.addEventListener('click', updButtonHandler);
// });
