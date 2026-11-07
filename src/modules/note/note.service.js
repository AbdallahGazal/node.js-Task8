import mongoose, { Schema } from "mongoose";
import {
  countDocuments,
  createOne,
  deleteMany,
  deleteOne,
  find,
  findById,
  findOne,
  findOneAndReplace,
  findOneAndUpdate,
  UpdateMany,
} from "../../common/repository/db.repository.js";
import { NoteModel, UserModel } from "../../DB/models/index.js";

export const createNote = async (inputs) => {
  if (
    !inputs.userId ||
    !(await findById({
      model: UserModel,
      id: inputs.userId,
      projection: { _id: 1 },
    }))
  ) {
    throw new Error("Invalid user id.", { cause: { status: 409 } });
  }
  return await createOne({ model: NoteModel, data: inputs });
};
export const updateNoteAndReturn = async (noteId, userId, inputs) => {
  const note = await findById({
    model: NoteModel,
    id: noteId,
    projection: { userId: 1 },
  });

  if (!note) {
    throw new Error("Note not Found.", { cause: { status: 400 } });
  }
  if (note.userId != userId) {
    throw new Error("You are not authorized.", { cause: { status: 401 } });
  }
  inputs.userId = undefined;
  return findOneAndUpdate({
    model: NoteModel,
    filter: { _id: noteId },
    update: { $set: inputs, $inc: { __v: 1 } },
    options: {
      returnDocument: "after",
      runValidators: true,
    },
  });
};
export const replaceNote = async (noteId, userId, inputs) => {
  const note = await findById({
    model: NoteModel,
    id: noteId,
    projection: { userId: 1 },
  });

  if (!note) {
    throw new Error("Note not Found.", { cause: { status: 400 } });
  }
  if (note.userId != userId) {
    throw new Error("You are not authorized.", { cause: { status: 401 } });
  }
  inputs.userId = userId;
  return findOneAndReplace({
    model: NoteModel,
    filter: { _id: noteId },
    replacement: inputs,
    options: {
      returnDocument: "after",
      runValidators: true,
    },
  });
};

export const patchAllUserNotesTitle = async (userId, newTitle) => {
  const data = await UpdateMany({
    model: NoteModel,
    update: { $set: { title: newTitle }, $inc: { __v: 1 } },
    filter: { userId },
    options: {
      runValidators: true,
    },
  });
  if (!data.matchedCount)
    throw new Error("No notes found.", { cause: { status: 409 } });

  return data;
};

export const deleteNoteById = async (noteId, userId) => {
  const note = await findOne({
    model: NoteModel,
    filter: { _id: noteId },
  });
  if (!note) throw new Error("Note not found", { cause: { status: 404 } });
  if (note.userId != userId)
    throw new Error("You are not authorized", { cause: { status: 401 } });
  await deleteOne({ model: NoteModel, filter: { _id: noteId } });
  return note;
};
export const deleteAllUserNotes = async (userId) => {
  return await deleteMany({ model: NoteModel, filter: { userId } });
};
export const retrieveUserNotesPaginated = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const count = await countDocuments({ model: NoteModel, filter: { userId } });
  const data = await find({
    model: NoteModel,
    filter: { userId },
    options: {
      sort: {
        createdAt: -1,
      },
      skip,
      limit,
    },
  });
  return { page: parseInt(page), limit: parseInt(limit), count, data };
};

export const getNoteById = async (noteId, userId) => {
  const note = await findById({ model: NoteModel, id: noteId });
  if (!note) throw new Error("Note not found.", { cause: { status: 404 } });

  if (note.userId != userId)
    throw new Error("You are not authorized.", { cause: { status: 401 } });
  return note;
};
export const getNoteByContent = async (userId, content) => {
  const note = await find({ model: NoteModel, filter: { content, userId } });
  if (!note.length)
    throw new Error("Note not found.", { cause: { status: 404 } });

  return note;
};

export const getUserNotesWithUserInfo = async (userId) => {
  return NoteModel.find({ userId }, { title: 1, createdAt: 1 }).populate(
    "userId",
    { email: 1, _id: 0 },
    UserModel,
  );
};

export const getUserNotesWithUserInfoAggregate = async (userId, title) => {
  console.log(title);
  const match = { userId: new mongoose.Types.ObjectId(userId) };
  if (title) match.title = title;
  const data = await NoteModel.aggregate([
    {
      $match: match,
    },
    {
      $project: {
        _id: 0,
        updatedAt: 0,
        content: 0,
        __v: 0,
      },
    },
    {
      $lookup: {
        localField: "userId",
        from: "users",
        foreignField: "_id",
        as: "user",
        pipeline: [{ $project: { _id: 0, name: 1, email: 1 } }],
      },
    },
  ]);
  return data;
};
