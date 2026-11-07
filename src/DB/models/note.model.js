import mongoose, { Types } from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return value !== value.toUpperCase()
        },
        message: "Title cannot be all uppercase",
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    autoIndex: true,
    strictQuery: true,
    optimisticConcurrency: true,
  },
);

export const NoteModel =
  mongoose.models.Note || mongoose.model("Note", noteSchema);
