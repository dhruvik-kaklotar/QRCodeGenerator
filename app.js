const express = require('express');
const bodyParser = require('body-parser');
const qr = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/generate', (req, res) => {
    const url = req.body.url;
    if (!url) {
        res.send('URL is required');
        return;
    }

    qr.toDataURL(url, (err, src) => {
        if (err) res.send('Error occurred');

        res.render('qr', { src });
    });
});

app.listen(port, () => {
    console.log(`QR Code Generator app listening at http://localhost:${port}`);
});
