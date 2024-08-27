const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['To Do', 'In Progress', 'Done'], default: 'To Do' },
  dueDate: { type: Date },
  assignedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subtask' }],
  dependencies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  versionHistory: [{
    title: String,
    description: String,
    status: String,
    modifiedAt: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);
