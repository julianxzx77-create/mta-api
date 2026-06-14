const express = require('express');
const app = express();

app.use(express.json());

// 🔥 DATA GLOBAL
let data = {
    players: []
};

// 🌐 HOME
app.get('/', (req, res) => {
    res.send('API MTA ONLINE ✔');
});

// 📡 UPDATE DESDE MTA
app.get('/update', (req, res) => {

    if (req.query.data) {
        try {
            data = JSON.parse(req.query.data);
        } catch (e) {
            console.log("Error JSON");
        }
    }

    res.json({ ok: true });
});

// 📊 STATUS
app.get('/status', (req, res) => {

    let totalPlayers = data.players.length || 0;

    res.json({
        players: totalPlayers,
        status: "online"
    });
});

// 🏆 TOP 10 MILLONARIOS
app.get('/top10', (req, res) => {

    let list = (data.players || []).map(p => {

        let cash = Number(p.money || 0);
        let bank = Number(p.bank || 0);

        return {
            name: p.name,
            cash,
            bank,
            total: cash + bank
        };
    });

    list.sort((a, b) => b.total - a.total);

    res.json(list.slice(0, 10));
});

// 🚀 PORT RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("API ONLINE ✔");
});
