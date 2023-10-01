const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: false
  },
  short: {
    type: String,
    required: true,
    default: shortId.generate
  },
  clicks: {
    type: Number,
    required: true,
    default: 0
  },
  title: {
    type: String,
    required: false
  },
  image: {
    type: String,
    required: false
  }
})
module.exports = mongoose.model('ShortUrl', shortUrlSchema)