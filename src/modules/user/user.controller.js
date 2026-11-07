import { Router } from "express";
import { successResponse } from "../../common/utils/success.response.js";
import { deleteUser, findUser, updateUser } from "./user.service.js";

const router = Router();

router.patch("/update/:id", async (req, res, next) => {
  const data = await updateUser(req.params.id, req.body);
  return successResponse({ res, data });
});
router.delete("/:id", async (req, res, next) => {
  const data = await deleteUser(req.params.id);
  return successResponse({ res, data });
});
router.get("/:id", async (req, res, next) => {
  const data = await findUser(req.params.id);
  return successResponse({ res, data });
});
export default router;
