const express = require('express');
const request = require('request');
const cors = require('cors')

const app = express();
const port = process.env.PORT || 3001;

var whitelist = ['http://localhost:8080', 'http://localhost:8081', 'https://web.bupko.com', 'https://admin.bupko.com', 'https://bupko.com']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

app.use(cors(corsOptionsDelegate))

app.get("/*", (req, res) => {
  const url = `https://bupkov2.herokuapp.com${req.url}`;

  request(url).pipe(res);
})

app.listen(port, () => { console.log(`NO CORS BUPKO API listening at port:${port}`) })
