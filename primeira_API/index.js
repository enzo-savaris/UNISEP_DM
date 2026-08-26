const express = require('express');
const app = new express();

app.use(express.json());

let data = [{
    nome   : "Enzo",
    cpf    : "123.456.789-00",
    status : true
}];

app.get("/listar", (req, res) => {
    return res.send(data);
});

app.post("/cadastrar", (req, res) => {
    const { nome, cpf, status } = req.body;

    // const nome   = req.body.nome;
    // const cpf    = req.body.cpf;
    // const status = req.body.status;

    
    data.push({ id: data.length + 1,
                nome, 
                cpf, 
                status 
            });
    
    return res.send(data);
});

app.listen(8080, () => {
  console.log('Servidor rodando na porta 8080');

});