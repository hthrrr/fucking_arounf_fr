const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    isUrgent: {
        type: Boolean,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Task = mongoose.model('Task', taskSchema)

module.exports = Task
