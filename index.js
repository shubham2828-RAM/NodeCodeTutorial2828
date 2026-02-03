const http = require('http');
const fs = require('fs');
const url = require('url');
const myServer = http.createServer((req, res) => {
    let log ='';
    if (req.url !== '/favicon.ico') {
        log = `${new Date().toISOString()}: New Server Log ${req.url}\n`;
    }
    const myUrl = url.parse(req.url,true);
    console.log(myUrl);
fs.appendFile('./server.log', log, (err,data) => {
console.log("Request received.");
switch(myUrl.pathname) { // or we can use req.url but it contain query also 
    case '/': 
        res.end("Hello from my server!");   
        break;
    case '/home':
        res.writeHead(301, {  
                'Location': 'https://www.google.com'
                });
                res.end();
                break;
    case '/about':
        const username= myUrl.query.testing;
        res.end(`This is the about page for user: ${username}`);
        break;
    default:
        res.end("404 Page not found");
}
}) 
// console.log(req.headers);

});
myServer.listen(8000, () => {
    console.log("Server is running on port 8000");
});