const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const path = require("path");
const app = express()
const port = 3000
//

app.set('view engine', 'ejs')
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.get('/', async (req, res) => {
  res.render('index', { shortUrl: null })
})

app.post('/shortUrl', async (req, res) => {
 const shortUrl =  await ShortUrl.create({ full: req.body.fullUrl,
    title:'hello from server',
    image:'https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg' })
  res.render('index', { shortUrl: shortUrl.short })
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)
  shortUrl.title = `hello from server`
  shortUrl.image = `https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg`
  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})

mongoose.connect('mongodb+srv://jolix1234:jedaziza1235@cluster66.bojvzew.mongodb.net', {
    useNewUrlParser: true
    ,useUnifiedTopology: true } ).then(()=>{
    console.log(`db connected successfully`)
    app.listen(port,()=>{
        console.log(`server running on port 3000`)
    });
}) .catch(err => console.error('Could not connect to MongoDB', err));