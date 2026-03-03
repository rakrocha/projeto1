const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve index.html

// Ler dados do arquivo
app.get('/pessoas', (req, res) => {
  fs.readFile('pessoas.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Erro ao ler arquivo');
    const pessoas = data ? JSON.parse(data) : [];
    res.json(pessoas);
  });
});

// Salvar dados no arquivo
app.post('/pessoas', (req, res) => {
  fs.readFile('pessoas.txt', 'utf8', (err, data) => {
    let pessoas = data ? JSON.parse(data) : [];
    pessoas.push(req.body);
    fs.writeFile('pessoas.txt', JSON.stringify(pessoas), (err) => {
      if (err) return res.status(500).send('Erro ao salvar');
      res.json({ sucesso: true });
    });
  });
});

// Editar pessoa
app.put('/pessoas/:index', (req, res) => {
  fs.readFile('pessoas.txt', 'utf8', (err, data) => {
    let pessoas = data ? JSON.parse(data) : [];
    pessoas[req.params.index] = req.body;
    fs.writeFile('pessoas.txt', JSON.stringify(pessoas), (err) => {
      if (err) return res.status(500).send('Erro ao editar');
      res.json({ sucesso: true });
    });
  });
});

// Remover pessoa
app.delete('/pessoas/:index', (req, res) => {
  fs.readFile('pessoas.txt', 'utf8', (err, data) => {
    let pessoas = data ? JSON.parse(data) : [];
    pessoas.splice(req.params.index, 1);
    fs.writeFile('pessoas.txt', JSON.stringify(pessoas), (err) => {
      if (err) return res.status(500).send('Erro ao remover');
      res.json({ sucesso: true });
    });
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));