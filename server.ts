import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import * as compression from 'compression';
import { join } from 'path';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();
const https = require('https');
const fs = require('fs');
app.use(compression());

const PORT = process.env.PORT || 8800;
const DIST_FOLDER = join(process.cwd(), 'www');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// app.set('views', join(DIST_FOLDER, 'app'));
app.set('views', DIST_FOLDER);

app.get('/robots933456.txt', (req, res) => {
    res.type('text/plain');
    res.send("User-agent: *\nDisallow: /");
});
// Server static files from /browser
app.get('*.*', express.static(DIST_FOLDER, {
    maxAge: '1y'
}));
// app.get('*.*', express.static(join(DIST_FOLDER, 'assets'), {
//     maxAge: '1y'
// }));

app.get('*', function(req, res){
    res.render('index.html');
});

const httpOptions = {
    key: fs.readFileSync('./key.key'),
    cert: fs.readFileSync('./cert.crt')
}

app.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
})

// https.createServer(httpOptions, app).
//     listen(PORT, '10.10.0.66', () => {
//         console.log(`Node Express server listening on https://10.10.0.66:${PORT}`);
//     });

