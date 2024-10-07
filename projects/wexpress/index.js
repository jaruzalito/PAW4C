const express = require('express')
const fs = require('fs')
const path = require('path')
const mime = require('mime-types')

const app = express()
const PORT=3000

app.use(express.json())

app.get('/',(req,res)=>{
    res.type('text/plain; charset=utf-8')
    res.send('Strona glowna \n\n\n\n strona główna - / lub puste\n JSON - /json \n html wew - /html \n html zew - /htmlfile')

})

app.get('/html',(req,res)=>{
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head> 
    </head>
    <body>  
        <h1>Wewnatrz html</h1>
    </body>
    </html>
    `
    res.type('html').send(html)
})

app.get('/json', (req,res)=>{
    res.json({
        message:'Dokument json'
    })
})
app.get('/htmlfile',(req,res)=>{
    const fpath = path.join(__dirname, 'index.html')
    fs.readFile(fpath,'utf8',(err,data)=>{
        if(err){
            res.status(500).type('text/plain; charset=utf-8').send('Błąd serwera')
        }else{
            res.type('html').send(data)
        }
    })
})

app.get('/get_params',(req,res)=>{
    console.log(req.query)
    const paramsArray = Object.entries(req.query)
    const timestamp = Date.now()
    const fileName = `params_${timestamp}.json`

    fs.writeFile(file,JSON.stringify(paramsArray),(err)=>{})
})