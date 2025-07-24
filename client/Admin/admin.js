let candidates = [
  { name: "Maria Santos", position: "President", votes: 12 },
  { name: "Jose Ramos", position: "President", votes: 8 },
  { name: "Ana Lopez", position: "Vice-President", votes: 15 },
  { name: "Mark Reyes", position: "Vice-President", votes: 10 }
];

function renderCandidates() {
  const tbody = document.getElementById('resultsBody');
  tbody.innerHTML = '';
  let totalVotes = 0;

  candidates.forEach((cand, idx) => {
    totalVotes += cand.votes;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cand.name}</td>
      <td>${cand.position}</td>
      <td>${cand.votes}</td>
      <td>
        <button class="action-btn edit" title="Edit" onclick="editCandidate(${idx})">
          <i class="fas fa-edit"></i>
        </button>
        <button class="action-btn delete" title="Delete" onclick="deleteCandidate(${idx})">
          <i class="fas fa-trash-alt"></i>
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById('totalVotes').textContent = totalVotes;
}

document.getElementById('candidateForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('candidateName').value.trim();
  const position = document.getElementById('candidatePosition').value.trim();
  if (name && position) {
    candidates.push({ name, position, votes: 0 });
    renderCandidates();
    this.reset();
  }
});

function deleteCandidate(idx) {
  if (confirm("Are you sure you want to delete this candidate?")) {
    candidates.splice(idx, 1);
    renderCandidates();
  }
}

function editCandidate(idx) {
  const cand = candidates[idx];
  const newName = prompt("Edit Candidate Name:", cand.name);
  const newPosition = prompt("Edit Position:", cand.position);
  if (newName && newPosition) {
    candidates[idx].name = newName.trim();
    candidates[idx].position = newPosition.trim();
    renderCandidates();
  }
}

function logout() {
  window.location.href = "../Login/index.html";
}

// Initial render
document.addEventListener('DOMContentLoaded', renderCandidates);