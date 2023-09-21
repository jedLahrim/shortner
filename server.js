const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://dbJolixUserName:dbPassword@localhost:27017', {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(()=>{
  console.log(`db connected successfully`)
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

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

app.listen(process.env.PORT || 3000,()=>{
  console.log(`server running on port 3000`)
});