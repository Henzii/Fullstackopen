const mongoose = require('mongoose')
const mongoVali = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  favoriteGenre: String
})
schema.plugin(mongoVali)
module.exports = mongoose.model('User', schema)