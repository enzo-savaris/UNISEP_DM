const express = require('express');

const app = express();

app.get("/", (req, res) => {
    res.send('BOA NOITE BRUNO! 🚛');
});

app.listen(8080, (error) => {
    if (error !== undefined) {
        console.error('Erro ao iniciar o servidor na porta 8080:', error);
    } else {
        console.log('🚛 O servidor está rodando na porta 8080');
    }
});