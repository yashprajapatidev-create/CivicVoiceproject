// Utility to load users from localStorage or empty array
function loadUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

// Handle login form submission
document.querySelector('.login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email || !password) {
    alert('Please enter both email and password.');
    return;
  }

  const users = loadUsers();

  // Find user matching email and password
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

  if (user) {
    alert('Login successful!');
    // Save logged in user in sessionStorage for session purposes
    sessionStorage.setItem('loggedInUser', JSON.stringify(user));
    // Redirect to report page
    window.location.href = 'report.html';
  } else {
    alert('Authentication failed: Invalid email or password.');
  }
});
