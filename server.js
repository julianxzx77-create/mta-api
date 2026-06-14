const express = require('express');
const app = express();

app.use(express.json());

// 🔥 datos del servidor MTA
let data = {
    players: 0,
    maxPlayers: 128,
    status: "offline"
};

// 🌐 HOME (solo prueba)
app.get('/', (req, res) => {
    res.send('API MTA ONLINE ✔');
});

// 📡 UPDATE (MTA envía datos aquí por GET)
app.get('/update', (req, res) => {

    if (req.query.players) {
        data.players = Number(req.query.players);
    }

    if (req.query.maxPlayers) {
        data.maxPlayers = Number(req.query.maxPlayers);
    }

    if (req.query.status) {
        data.status = req.query.status;
    }

    res.json({
        ok: true,
        message: "data updated"
    });
});

// 📊 STATUS (Discord lee aquí)
app.get('/status', (req, res) => {
    res.json(data);
});

// 🚀 PORT (IMPORTANTE PARA RENDER)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("🚀 API MTA ONLINE en puerto", PORT);
});
