const express = require('express');
const port = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    let num1 = req.body.num1;
    let num2 = req.body.num2;
    let result;
    try {
        result = eval(`${num1} + ${num2}`);
    }catch{
        result = 0;
        alert('Deu ruim!'); 
    }

    res.send(`O resultado da Soma é: ${result}`);
});

app.get('/imcCalculator', (req, res) => {
    res.sendFile(__dirname + '/imcCalculator.html');
});

app.post('/imcCalculator.html', (req, res) => {
    let peso = parseFloat(req.body.peso);
    let altura = parseFloat(req.body.altura);

    let imc = peso / (altura * altura);

    res.send('IMC: ' + imc.toFixed(2));
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
});