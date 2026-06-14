const express = require('express');
const app = express();

app.use(express.json());

// 🔥 DATA GLOBAL
let data = {
    players: [],
    ip: "No disponible",
    status: "offline"
};

// 🌐 HOME
app.get('/', (req, res) => {
    res.send('API MTA ONLINE ✔');
});

// 📡 UPDATE (MTA envía datos)
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

// 📊 STATUS
app.get('/status', (req, res) => {
    res.json({
        players: data.players?.length || 0,
        status: data.status || "offline",
        ip: data.ip || "No disponible"
    });
});

// 🏆 TOP 10
app.get('/top10', (req, res) => {

    let top = (data.players || [])
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

// 🚀 PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API ONLINE ✔");
});
