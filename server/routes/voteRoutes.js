const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

router.get('/test', (req, res) => res.send('Vote route is working'));

router.post('/register', voteController.registerUser);
router.post('/login', voteController.loginUser);
router.get('/candidates', voteController.getCandidates);
router.post('/vote', voteController.castVote);

module.exports = router;