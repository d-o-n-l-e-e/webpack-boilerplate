const express = require('express')
const axios = require('axios')

module.exports = function() {
  const app = express()

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get('/api/:endpoint', function(req, res, next) {
    if (req.params.endpoint === 'test') {
      axios({
        method:'get',
        url: 'https://jsonplaceholder.typicode.com/posts/1',
        responseType:'json',
        headers: {
          'accept': 'application/json',
        },
      }).then(function(response) {
        res.send(response.data);
      }).catch(function (error) {
        console.log(error);
      });
    } else {
      res.end(req.params.endpoint)
    }

  })

  app.get('/api/:endpoint', function(req, res, next) {
    res.end(req.params.endpoint)
  })

  app.listen(3001)
}