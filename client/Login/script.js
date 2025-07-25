function login() {
  const schoolId = document.getElementById('schoolid').value.trim();
  const pass = document.getElementById('password').value.trim();

  fetch('http://localhost:3000/api/votes/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      student_id: schoolId,
      password: pass
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.user) {
      // Save user ID to localStorage for later use
      localStorage.setItem('userId', data.user.id);

      // Redirect based on role
      if (data.user.role === 'admin') {
        window.location.href = "../Admin/admin.html";
      } else {
        window.location.href = "../Voter/voter.html";
      }
    } else {
      alert(data.error || 'Login failed.');
    }
  })
  .catch(() => alert('Server error. Please try again later.'));
}

function goToVoter() {
  alert('Redirect to Voter Dashboard (to be implemented)');
}

function goToAdmin() {
  alert('Redirect to Admin Panel (to be implemented)');
}
