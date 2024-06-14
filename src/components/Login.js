document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const loginForm = e.target;
  const username = loginForm.querySelector('input[name="username"]').value;
  const password = loginForm.querySelector('input[name="password"]').value;

  const loginData = {
    username: username,
    password: password,
  };

  try {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });

    const result = await response.json();

    if (result.success) {
      if (result.role === 'admin') {
        window.location.href = '/admin.html';
      } else {
        window.location.href = '/user.html';
      }
    } else {
      alert('Invalid credentials');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  }
});

