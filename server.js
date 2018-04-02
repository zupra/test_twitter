const express = require('express')
const bodyParser = require('body-parser')
const Twitter = require('twitter')
const app = express()


const client = new Twitter({
  consumer_key: '5CX7UgOdZZXPVJ33I4ygcwBGf',
  consumer_secret: 'GOqqnYn93V9wF6ltUdol37At5CtQxikNnoqaNKNLdGdWpqSXw2',
  access_token_key: '980555717940797451-kp6UxkVRhQvaOKLlSjpIz3WIHA6Zw0Y',
  access_token_secret: 'nd6rfA50FFf30hDNG2UqBqFkWFEU0fNAidqBAsgIQa5im'
})


app.set('port', process.env.PORT || 3000)


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



app.get('/', (req, res) => res.send('Hello World!'))

app.get('/search/:hashtag', function(req, res) {
  client.get('search/tweets', { q: req.params.hashtag, count: 25 }, function(
    error,
    tweets,
    response
  ) {
    if (error) console.error(error)
    res.json(tweets)
  })
})


app.listen(3000, (err) => {
  if (err) {
    return console.log('err', err)
  }
  console.log( 'Server started at http://localhost:', app.get('port') )
})


