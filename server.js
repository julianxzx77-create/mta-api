const express = require('express');
const app = express();

app.use(express.json());

let data = {
    players: 0,
    maxPlayers: 128,
    status: "offline"
};

app.get('/', (req, res) => {
    res.send('API ONLINE ✔');
});

app.get('/status', (req, res) => {
    res.json(data);
});

app.post('/update', (req, res) => {
    data = req.body;
    res.json({ ok: true });
});

// 🔥 IMPORTANTE PARA RENDER
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
    console.log("API ONLINE EN PUERTO", PORT);
});
