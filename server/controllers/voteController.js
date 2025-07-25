exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  // Dummy logic
  res.json({ message: `User ${username} registered.` });
};

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  // Dummy logic
  res.json({ message: `User ${username} logged in.` });
};

exports.getCandidates = (req, res) => {
  res.json([
    { id: 1, name: 'Jerson', position: 'President' },
    { id: 2, name: 'Justine', position: 'Vice-President' },
  ]);
};

exports.castVote = (req, res) => {
  const { userId, candidateId } = req.body;
  res.json({ message: `Vote cast by user ${userId} for candidate ${candidateId}` });
};
