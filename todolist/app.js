const express = require('express');
const port = 3000;
const date = require(__dirname + '/date.js');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const items = [];
const workItems = [];

app.get('/', (req, res) => {
    const day = date.getDay();

    res.render('list', {
        listTitle: day,
        newListItem: items,
    });
});

app.get('/trabalho', (req, res) => {
    res.render('list', {
        listTitle: 'trabalho',
        newListItem: workItems
    });
});

app.post('/' || '/trabalho', (req, res) => {
    const item = req.body.newItem;

    if(req.body.button == 'trabalho') {
        workItems.push(item);
        res.redirect('/trabalho');
    }else {
        items.push(item);
        res.redirect('/');
    }
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}!`);
});