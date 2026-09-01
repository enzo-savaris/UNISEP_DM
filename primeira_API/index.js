const express = require("express");

const app = new express();

app.use(express.json());

var contador_id = 1;
var data = [{
    id: 1,
    nome: "ENzo Savaris",
    cpf: "46999162280",
    status: true
}];

app.get("/listar", (req, res) => {
    return res.send(data);
});

app.get("/listar/:id", (req, res) => {
    const { id } = req.params;

    const pessoa = data.filter((item) =>{
        return item.id == id;
    })

    if (pessoa.length <= 0 || pessoa == undefined) {
        msg = `Pessoa do código: ${id} não encontrada!`
        return res.status(400).send(msg);
    }
    res.send(pessoa);
});

app.post("/cadastrar", (req, res) => {
   
    const { nome, cpf, status } = req.body;

    if (!cpf) {
        return res.send("O campo CPF é obrigatorio!");
    }

    contador_id++

    data.push({
        id: contador_id,
        nome,
        cpf,
        status
    });

    

    return res.send(data);
});

app.listen(8080, () => {
    console.log("O sevidor está rodando na porta 8080!");
});


//STATUS 500 - ERRO INTERNO, SEM EXPLICAÇÃO, IGUAL ELEITOR DO LULA(NÃO TEM EXPLICAÇÃO, SÓ EXISTE)
//STATUS 400 - ERRO DE REQUISIÇÃO, FALTA ALGUM DADO.
