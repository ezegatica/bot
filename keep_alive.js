var http = require('http');

http.createServer(function (req, res) {
  res.write("{\"message\": \"hola!\"}");
  // res.redirect('http://example.com')
  res.end();
}).listen(8080); 