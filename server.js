const express = require('express');
const app = express();

app.use(express.json());

// 🔥 memoria rápida (evita lag)
let data = {
    players: []
};

// 🌐 HOME
app.get('/', (req, res) => {
    res.send('API MTA ONLINE ✔');
});

// 📡 UPDATE desde MTA
app.get('/update', (req, res) => {

    if (req.query.data) {
        try {
            data = JSON.parse(req.query.data);
        } catch (e) {
            console.log("JSON ERROR");
        }
    }

    res.json({ ok: true });
});

// 📊 STATUS rápido
app.get('/status', (req, res) => {
    res.json({
        players: data.players?.length || 0,
        status: "online"
    });
});

// 🏆 TOP 10 rápido
app.get('/top10', (req, res) => {

    if (!data.players) return res.json([]);

    let top = data.players
        .map(p => ({
            name: p.name,
            money: Number(p.money || 0),
            bank: Number(p.bank || 0),
            total: Number(p.money || 0) + Number(p.bank || 0)
        }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);

    res.json(top);
});

// 🚀 PORT RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API ONLINE ✔");
});
