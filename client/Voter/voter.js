const studentName = "Juan Dela Cruz";
const positions = [
  {
    id: "presidentCandidates",
    candidates: [
      { name: "Maria Santos", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      { name: "Jose Ramos", avatar: "https://randomuser.me/api/portraits/men/32.jpg" }
    ]
  },
  {
    id: "vpCandidates",
    candidates: [
      { name: "Ana Lopez", avatar: "https://randomuser.me/api/portraits/women/65.jpg" },
      { name: "Mark Reyes", avatar: "https://randomuser.me/api/portraits/men/41.jpg" }
    ]
  }
];

// Render student name
document.addEventListener("DOMContentLoaded", function() {
  document.getElementById('studentName').textContent = studentName;

  // Render candidates for each position
  positions.forEach(pos => {
    const container = document.getElementById(pos.id);
    pos.candidates.forEach((cand, idx) => {
      const card = document.createElement('div');
      card.className = 'candidate-card';
      card.innerHTML = `
        <img src="${cand.avatar}" alt="${cand.name}" class="candidate-avatar" />
        <div class="candidate-info">
          <div class="candidate-name">${cand.name}</div>
          <div class="vote-status" style="display:none;">You have voted</div>
        </div>
        <button class="vote-btn">Vote</button>
      `;
      // Voting logic
      const voteBtn = card.querySelector('.vote-btn');
      const status = card.querySelector('.vote-status');
      voteBtn.addEventListener('click', function() {
        // Disable all vote buttons in this position
        Array.from(container.querySelectorAll('.vote-btn')).forEach(btn => btn.disabled = true);
        // Show status only for this candidate
        status.style.display = 'block';
      });
      container.appendChild(card);
    });
  });
});

function logout() {
  window.location.href = "../Login/index.html";

}