const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    itemQuantity: {
        type: Number,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
