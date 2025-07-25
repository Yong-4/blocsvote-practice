const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('BlocsVote backend is running');
    });

const voteRoutes = require('./routes/voteRoutes');
app.use('/api/votes', voteRoutes);

app.listen(port, () => {
    console.log(`BlocsVote backend is running on port ${port}`);
});