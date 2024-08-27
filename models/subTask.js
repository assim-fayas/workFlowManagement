const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  parentTask: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Subtask', subtaskSchema);
