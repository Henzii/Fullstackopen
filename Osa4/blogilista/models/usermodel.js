

const mongoose = require('mongoose')
const uniVali = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
    user: {
        type: String,
        unique: true,
        required: true,
        minlength: 3
    },
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ],
    passwordHash: String,
})
userSchema.plugin(uniVali)
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})
const User = mongoose.model('user', userSchema)
module.exports = User
