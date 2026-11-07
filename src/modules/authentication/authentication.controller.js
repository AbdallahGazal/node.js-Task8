import { Router } from "express";
import { login, signup } from "./authentication.service.js";
import { successResponse } from "../../common/utils/success.response.js";
const router = Router();

router.post("/signup", async (req, res, next) => {
  const data = await signup(req.body);
  return successResponse({
    res,
    status: 201,
    data,
    message: "Done-Signup",
    status: 201,
  });
});

router.post("/login", async (req, res, next) => {
  const data = await login(req.body);
  return successResponse({ res, data, message: "Done-Login", status: 200 });
});

export default router;
