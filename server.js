const express = require('express');
const app = express();

app.use(express.json());

let data = {
    players: 0,
    maxPlayers: 128,
    status: "offline"
};

app.post('/update', (req, res) => {
    data = req.body;
    res.send({ ok: true });
});

app.get('/status', (req, res) => {
    res.json(data);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("API online");
});
