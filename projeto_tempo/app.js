const express = require('express');
const https = require('https');
const port = 3000;
const app = express();

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {    
    const query = req.body.cityName;
    const apiKey = 'e4fefb9f8b1d882f7ec21b07ff0fdb1a';
    const units = 'metric';
    const lang = 'pt_br';
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}&lang=${lang}`;
    https.get(url, (response) => {
        response.on('data', (data) => {
            const tempoData = JSON.parse(data);
            
            const iconCod = tempoData.weather[0].icon;  
            res.send(`
                <div style="background-color: gray">
                    <h1>Temperatura em ${tempoData.name}: ${tempoData.main.temp}º Celcius</h1>
                    <p>Decrição Tempo: ${tempoData.weather[0].description} </p>
                    <img src=https://openweathermap.org/img/wn/${iconCod}@2x.png />
                    <button type="submit"><a href="/" style="color: red"    >Back</a></button>
                </div>
            `)
        })
    })
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
})  