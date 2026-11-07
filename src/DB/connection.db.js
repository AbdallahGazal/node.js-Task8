import mongoose from "mongoose";
import { DB_NAME, DB_URI } from "../config.js";
import { UserModel } from "./models/user.model.js";
import { NoteModel } from "./models/note.model.js";

export const bootstrapDB = async (app, PORT) => {
  try {
    await mongoose.connect(DB_URI + DB_NAME, {
      // serverSelectionTimeoutMS: 5000,
    });
    UserModel.syncIndexes();
    NoteModel.syncIndexes();
    console.log("DB Connected Successfully 🌷");
    app.listen(PORT, () => {
      console.log("Task8 App listening on port " + PORT + "!");
    });
  } catch (error) {
    console.log(error);
    console.log("Failed to Connect on DB ❌");
  }
};
