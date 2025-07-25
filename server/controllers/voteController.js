const db = require('../db/db');

// REGISTER
exports.registerUser = (req, res) => {
  const { student_id, password, role } = req.body;
  const sql = 'INSERT INTO users (student_id, password, role) VALUES (?, ?, ?)';
  db.query(sql, [student_id, password, role || 'voter'], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'Username already exists.' });
      }
      return res.status(500).json({ error: 'Database error.' });
    }
    res.json({ message: 'User registered successfully.' });
  });
};

// LOGIN
exports.loginUser = (req, res) => {
  const { student_id, password } = req.body;
  const sql = 'SELECT * FROM users WHERE student_id = ? AND password = ?';
  db.query(sql, [student_id, password], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    const user = results[0];
    res.json({ message: 'Login successful', user });
  });
};

// GET CANDIDATES
exports.getCandidates = (req, res) => {
  db.query('SELECT * FROM candidates', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error.' });
    res.json(results);
  });
};

// CAST VOTE
exports.castVote = (req, res) => {
  const { userId, candidateId } = req.body;

  // Check if user already voted
  db.query('SELECT has_voted FROM users WHERE id = ?', [userId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ error: 'User not found' });
    if (result[0].has_voted) return res.status(400).json({ error: 'User has already voted' });

    // Proceed to insert vote
    const voteSql = 'INSERT INTO votes (user_id, candidate_id) VALUES (?, ?)';
    db.query(voteSql, [userId, candidateId], (err, voteResult) => {
      if (err) return res.status(500).json({ error: 'Vote failed' });

      // Mark user as voted
      db.query('UPDATE users SET has_voted = TRUE WHERE id = ?', [userId]);
      res.json({ message: 'Vote cast successfully.' });
    });
  });
};
