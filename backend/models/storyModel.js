const mongoose = require("mongoose");
const storySchema = new mongoose.Schema(
  {
    slides: [
      {
        heading: {
          type: String,
          required: [true, "Please enter a heading"],
        },
        description: {
          type: String,
          required: [true, "Please enter a description"],
        },
        imageUrl: {
          type: String,
          required: true,
        },
        category: {
          type: String,
          required: true,
        },
      },
    ],
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        username: String,
      },
    ],
    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        username: String,
      },
    ],
    totalLikes: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

module.exports = mongoose.model("Story", storySchema);
