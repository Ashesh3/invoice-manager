const express = require('express');
const fs = require('fs');

var app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set('json spaces', 2);


app.get('/', function (req, res) {
    res.end(fs.readFileSync('./docs/index.html'));
});

app.use('/invoice/', require('./routes/invoice'));


const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Listening on port ${PORT}`)
)