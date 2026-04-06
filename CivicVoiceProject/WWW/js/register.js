// Utility function to load users or return empty array if none
function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// Utility function to save users array to localStorage
function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

document.querySelector('.register-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Stop default page reload

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;

  // Simple validation
  if (!name || !email || !password || !confirmPassword) {
    alert('Please complete all fields.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Your passwords do not match.');
    return;
  }

  const users = loadUsers();

  // Prevent duplicate email registration
  if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
    alert('This email is already registered. Please login.');
    return;
  }

  // Add user to array and save in localStorage
  users.push({ name, email, password });
  saveUsers(users);

  alert('Registration successful! You may now log in.');

  // Redirect to login page after registration
  window.location.href = 'login.html';
});
