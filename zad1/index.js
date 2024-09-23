const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime-types')

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end('Strona główna \n\n\n\n strona główna - / lub puste\n JSON - /json \n html wew - /html \n html zew - /htmlfile');
    }
    else if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        const jsonResponse = {
            message: "dokument json",
        };
        res.end(JSON.stringify(jsonResponse));
    }
    else if (req.url === '/html') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>fortnite</title>
            </head>
            <body>
                <h1>html wewnątrz</h1>
            </body>
            </html>
        `;
        res.end(html);
    }
    else if (req.url === '/htmlfile') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
                res.end('Błąd serwera');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(data);
            }
        });
    }
    else if (url.parse(req.url).pathname === '/get_params') {
        const urlparse = url.parse(req.url, true);
        console.log(urlparse.query);

        const paramsArray =Object.entries(urlparse.query);

        const timestamp = Date.now();

        const fileName = `params_${timestamp}.json`;
        fs.writeFile(fileName, JSON.stringify(paramsArray), err => {
            if (err) {
                console.error(err);
            } else {
                console.log(`Parameters written to file: ${fileName}`);
            }
        });
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        const jsonResponse = {
            ok: 'ok'
        };
        res.end(JSON.stringify(jsonResponse));
    }
    else  {
        // fs.readFile(`${__dirname}/assets/${req.url}`,(err, data) => {
        //     if (err) {
        //         console.error(err);
        //         res.setHeader('Content-Type', 'application/json; charset=utf-8');
        //         res.statusCode = 404;
        //         res.write(JSON.stringify({error: 404}));
        //         res.end();
        //     }else{
        //         let type = mime.getTy
        //     }
        // })
    }
});
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer na http://localhost:${PORT}`);
});
