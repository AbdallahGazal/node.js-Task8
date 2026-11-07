import { Router } from "express";
import {
  createNote,
  deleteAllUserNotes,
  deleteNoteById,
  getNoteByContent,
  getNoteById,
  getUserNotesWithUserInfo,
  getUserNotesWithUserInfoAggregate,
  patchAllUserNotesTitle,
  replaceNote,
  retrieveUserNotesPaginated,
  updateNoteAndReturn,
} from "./note.service.js";
import { successResponse } from "../../common/utils/success.response.js";

const router = Router();

router.post("", async (req, res) => {
  const data = await createNote(req.body);
  return successResponse({ res, message: "Note Created.", data });
});
router.put("/replace/:id", async (req, res) => {
  const data = await replaceNote(req.params.id, req.query.userId, req.body);
  return successResponse({ res, message: "Note Replaced.", data });
});
router.patch("/all", async (req, res) => {
  const data = await patchAllUserNotesTitle(req.query.userId, req.query.title);
  return successResponse({ res, message: "All notes updated.", data });
});
router.patch("/:id", async (req, res) => {
  const data = await updateNoteAndReturn(
    req.params.id,
    req.query.userId,
    req.body,
  );
  return successResponse({ res, message: "Note updated.", data });
});
router.delete("", async (req, res) => {
  const data = await deleteAllUserNotes(req.query.userId);
  return successResponse({ res, message: "Notes deleted.", data });
});
router.delete("/:id", async (req, res) => {
  const data = await deleteNoteById(req.params.id, req.query.userId);
  return successResponse({ res, message: "Note deleted.", data });
});
router.get("/paginate-sort", async (req, res) => {
  const data = await retrieveUserNotesPaginated(
    req.query.userId,
    req.query.page,
    req.query.limit,
  );
  return successResponse({ res, data });
});
router.get("/note-by-content", async (req, res) => {
  const data = await getNoteByContent(req.query.userId, req.query.content);
  return successResponse({ res, data });
});
router.get("/note-with-user", async (req, res) => {
  const data = await getUserNotesWithUserInfo(req.query.userId);
  return successResponse({ res, data });
});
router.get("/aggregate", async (req, res) => {
  const data = await getUserNotesWithUserInfoAggregate(req.query.userId, req.query.title);
  return successResponse({ res, data });
});
router.get("/:id", async (req, res) => {
  const data = await getNoteById(req.params.id, req.query.userId);
  return successResponse({ res, data });
});

export default router;
