const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
  },
  priority: {
    required: true,
    type: String,
  },
  checked: {
    required: true,
    type: Boolean,
  },
  due: {
    required: false,
    type: Number,
  },
  created: {
    required: true,
    type: Number,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
