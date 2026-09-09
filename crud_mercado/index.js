import express from "express";
import knex from "knex";

const app = new express();
const mySql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "mercado"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mySql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conecatar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

app.use(express.json());

app.listen(8080, () => {
    console.log("O sevidor está rodando na porta 8080!");
});

app.get("/listar", async (req, res) => {
    const produtos = await mySql.raw(" SELECT * FROM produto");

    res.send(produtos[0]);
});

app.get("/listar/:id", async (req, res) => {
    const { id } = req.params;
    const produtos = await mySql.raw(" SELECT * FROM produto WHERE IDPRODUTO = ?", [id]);   

    res.send(produtos[0]);
})

app.post("/cadastrar", async (req, res)=> {
    const {nome, preco, qtde } = req.body;
    const produtos = await mySql.raw("INSERT INTO PRODUTO(NOME, PRECO, QTDE) VALUES(?,?,?)", [nome, preco, qtde]);

    var msg = "Produto cadastrado com sucesso!";
    res.send(msg);
    // console.log("Produto cadastrado com sucesso!");
})

app.put("/atualizar/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, preco, qtde } = req.body;
    const produtos = await mySql.raw("UPDATE PRODUTO SET NOME = ?, PRECO = ?, QTDE = ? WHERE IDPRODUTO = ?", [nome, preco, qtde, id]);
    
    var msg = "Produto atualizado com sucesso!";
    res.send(msg);
})
