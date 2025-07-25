function login() {
  const schoolId = document.getElementById('schoolid').value;
  const pass = document.getElementById('password').value;

  if (schoolId == "2022-32079" && pass == "batch2025") {

    window.location.href = "../Voter/voter.html"; 
  }
  else if (schoolId == "2025-2026" && pass == "admin2025") {
    window.location.href = "../Admin/admin.html"; 
  } 
  else{
    alert('Invalid School ID or Password. Please try again.');
  }
}

function goToVoter() {
  alert('Redirect to Voter Dashboard (to be implemented)');
}

function goToAdmin() {
  alert('Redirect to Admin Panel (to be implemented)');
}
