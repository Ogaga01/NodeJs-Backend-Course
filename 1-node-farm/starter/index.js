const fs = require('fs')
const http = require('http')
const url = require('url')

//FILES

// Blocking Synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8')
// console.log(textIn)

// const textOut = `This is what we know about the Avocado: ${textIn}. \nCreated on ${Date.now()}`
// fs.writeFileSync('./txt/output.txt', textOut)
// console.log('File written')

// Non-Blocking Asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
//         console.log(data2);
//         fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
//             console.log(data3);
            
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('Your files have been written')
//             })
//         });
//     });
// })

//SERVER

const server = http.createServer((req, res) => {
    const pathNmae = req.url

    if (pathNmae === '/' || pathNmae=== '/overview') {
        res.end('This is the OVERVIEW')
    } else if (pathNmae === '/product') {
        res.end('This is the PRODUCT')
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html',
            'my-own-header': 'hello world'
        })
        res.end("<h1>page not found</h1>");
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to request on port 8000')
})