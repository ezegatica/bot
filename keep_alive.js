var http = require('http');

http.createServer(function (req, res) {
  res.write("que miras");
  res.end();
}).listen(8080); 