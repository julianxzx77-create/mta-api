app.get('/status', (req, res) => {
    res.json({
        players: data.players?.length || 0,
        status: "online",
        ip: data.ip || "No disponible"
    });
});
