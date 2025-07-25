// Assume you have the user ID available (e.g., from login/session)
const userId = localStorage.getItem('userId');

function loadCandidates() {
  fetch('http://localhost:3000/api/votes/candidates')
    .then(res => res.json())
    .then(candidates => {
      // Group candidates by position
      const grouped = {};
      candidates.forEach(candidate => {
        if (!grouped[candidate.position]) grouped[candidate.position] = [];
        grouped[candidate.position].push(candidate);
      });

      renderPosition('President', grouped['President'] || [], 'presidentCandidates');
      renderPosition('Vice-President', grouped['Vice-President'] || [], 'vpCandidates');
      // Add more positions as needed

      // Add the single Cast Vote button if not already present
      if (!document.getElementById('globalCastBtn')) {
        const btn = document.createElement('button');
        btn.id = 'globalCastBtn';
        btn.className = 'cast-vote-btn';
        btn.textContent = 'Cast Vote';
        btn.onclick = castAllVotes;
        document.querySelector('.positions-list').appendChild(btn);
      }
    })
    .catch(() => {
      document.getElementById('presidentCandidates').innerHTML = '<p style="color:red;">Failed to load candidates.</p>';
      document.getElementById('vpCandidates').innerHTML = '';
    });
}

function renderPosition(position, candidates, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  if (!candidates.length) {
    container.innerHTML = '<p>No candidates.</p>';
    return;
  }

  // Candidate list
  const list = document.createElement('div');
  list.className = 'candidate-radio-list';

  candidates.forEach(candidate => {
    const label = document.createElement('label');
    label.className = 'candidate-radio-item';
    label.innerHTML = `
      <input type="radio" name="vote-${position}" value="${candidate.id}">
      <span class="candidate-name">${candidate.name}</span>
      <span class="candidate-pos">(${candidate.position})</span>
    `;
    list.appendChild(label);
  });

  container.appendChild(list);
}

// This function is called when the single "Cast Vote" button is pressed
function castAllVotes() {
  const positions = ['President', 'Vice-President']; // Add more as needed
  const votes = [];

  for (const pos of positions) {
    const selected = document.querySelector(`input[name="vote-${pos}"]:checked`);
    if (!selected) {
      alert(`Please select a candidate for ${pos}.`);
      return;
    }
    votes.push({ position: pos, candidateId: selected.value });
  }

  // Disable all radios and the button
  document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
  const btn = document.getElementById('globalCastBtn');
  btn.disabled = true;
  btn.textContent = "Casting...";

  // Send all votes to backend (one request per vote)
  Promise.all(
    votes.map(vote =>
      fetch('http://localhost:3000/api/votes/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId,
          candidateId: vote.candidateId
        })
      }).then(res => res.json())
    )
  ).then(results => {
    // Check if all votes succeeded
    if (results.every(r => r.message)) {
      btn.textContent = "Vote Casted";
      btn.style.background = "#388e3c";
      btn.style.color = "#fff";
      btn.disabled = true;
      // Optionally, highlight voted candidates
      positions.forEach(pos => {
        const selected = document.querySelector(`input[name="vote-${pos}"]:checked`);
        if (selected) selected.parentElement.style.background = "#e8f5e9";
      });
    } else {
      btn.textContent = "Cast Vote";
      btn.disabled = false;
      document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = false);
      alert("Voting failed: " + (results.find(r => r.error)?.error || "Unknown error"));
    }
  }).catch(() => {
    btn.textContent = "Cast Vote";
    btn.disabled = false;
    document.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = false);
    alert("Server error. Please try again.");
  });
}

function logout() {
  localStorage.removeItem('userId');
  window.location.href = "../Login/index.html";
}

loadCandidates();