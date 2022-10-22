const mongoose = require("mongoose");

const sliderSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Number,
    required: true,
  },
  updatedAt: {
    type: Number,
  }
});

module.exports = sliderSchema;
