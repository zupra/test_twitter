const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      Twitter = require('twitter'),
      //path = require('path'),
      port = 3000;


const client = new Twitter({
  consumer_key: '5CX7UgOdZZXPVJ33I4ygcwBGf',
  consumer_secret: 'GOqqnYn93V9wF6ltUdol37At5CtQxikNnoqaNKNLdGdWpqSXw2',
  access_token_key: '980555717940797451-kp6UxkVRhQvaOKLlSjpIz3WIHA6Zw0Y',
  access_token_secret: 'nd6rfA50FFf30hDNG2UqBqFkWFEU0fNAidqBAsgIQa5im'
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//static
app.use('/dist', express.static('dist'));

app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})


app.get('/', (req, res) => res.sendfile('index.html',{ root : __dirname}) );


app.get('/search/:hashtag', (req, res) => {
  client.get('search/tweets', { q: req.params.hashtag, count: 20 }, (error,tweets,response) => {
    if (error) console.error(error)
    res.json(tweets)
  })
});


app.listen(port, () => console.log( 'Server started at http://localhost:', port ) );


