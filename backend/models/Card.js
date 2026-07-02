const mongoose = require('mongoose');
const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A card must have a description/title'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true
  },
  label: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', CardSchema);