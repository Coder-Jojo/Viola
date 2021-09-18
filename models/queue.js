const mongoose = require("mongoose");

const QueueSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    owner: {
      type: String,
    },
    size: {
      type: Number,
    },
    access: {
      type: String,
    },
    urls: {
      type: Array,
    },
    titles: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Queue", QueueSchema);
