import express from "express";
import knex from "knex";

const app = new express();

const mySql = knex({
    client: "mysql2",
    connection: {
        host: "localhost",
        user: "root",
        password: "1234",
        database: "biblioteca"
    }
});

async function testaConexaoComBancoDeDados() {
    try {
        await mySql.raw("SELECT 0 AS RESULT");
        console.log("Sucesso ao conectar ao banco de dados!");
    } catch (error) {
        console.log("Erro ao realizar conexão com banco de dados!");
    }
}

testaConexaoComBancoDeDados();

app.use(express.json());

app.listen(8080, () => {
    console.log("O servidor está rodando na porta 8080!");
});

app.get("/listar", async (req, res) => {

    try {
        const livros = await mySql.raw("SELECT * FROM livros");
        res.status(200).send(livros[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao listar os livros!");
    }
});

app.post("/cadastrar", async (req, res) => {
    try {
        const { titulo, autor, editora, qtde, preco } = req.body;
        await mySql.raw(
            `INSERT INTO livros
            (TITULO, AUTOR, EDITORA, QTDE, PRECO)
            VALUES (?, ?, ?, ?, ?)`,
            [titulo, autor, editora, qtde, preco]
        );
        res.status(201).send("Livro cadastrado com sucesso!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao cadastrar o livro!");
    }
});

app.put("/atualizar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, editora, qtde, preco } = req.body;
        await mySql.raw(
            `UPDATE livros
             SET TITULO = ?,
                 AUTOR = ?,
                 EDITORA = ?,
                 QTDE = ?,
                 PRECO = ?
             WHERE ID = ?`,
            [titulo, autor, editora, qtde, preco, id]
        );
        res.status(200).send("Livro atualizado com sucesso!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao atualizar o livro!");
    }

});
app.delete("/deletar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await mySql.raw(
            "DELETE FROM livros WHERE ID = ?",
            [id]
        );
        res.status(200).send("Livro deletado com sucesso!");
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao deletar o livro!");
    }
});

app.get("/listar/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const livros = await mySql.raw(
            "SELECT * FROM livros WHERE ID = ?",
            [id]
        );
        res.status(200).send(livros[0]);
    } catch (error) {
        console.log(error);
        res.status(500).send("Erro ao buscar o livro!");
    }
});