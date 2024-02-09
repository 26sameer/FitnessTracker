const mongoose = require('mongoose')

const Schema = mongoose.Schema

const goalSchema = new Schema(
  {
    username: { type: String, required: true },
    goalName: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
)

const Goal = mongoose.model('Goal', goalSchema)

module.exports = Goal
