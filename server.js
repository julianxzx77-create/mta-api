const express = require('express');
const app = express();

app.use(express.json());

let data = {
    players: 0,
    maxPlayers: 128,
    status: "offline"
};

// 👇 IMPORTANTE: aceptar GET también (MTA friendly)
app.get('/update', (req, res) => {

    if (req.query.players) {
        data = {
            players: Number(req.query.players),
            maxPlayers: Number(req.query.maxPlayers),
            status: req.query.status || "online"
        };
    }

    res.json({ ok: true });
});

// status para Discord
app.get('/status', (req, res) => {
    res.json(data);
});

// test
app.get('/', (req, res) => {
    res.send('API ONLINE');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("API ONLINE");
});
