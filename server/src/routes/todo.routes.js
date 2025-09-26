import { Router } from "express";
import * as ctl from "../controllers/todo.controller.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const r = Router();

r.get("/", asyncHandler(ctl.list));
r.get("/stats", asyncHandler(ctl.stats));
r.post("/", asyncHandler(ctl.create));
r.put("/:id", asyncHandler(ctl.update));
r.delete("/:id", asyncHandler(ctl.remove));

export default r;
