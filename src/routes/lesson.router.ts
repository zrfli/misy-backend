import { Router } from "express";

import { getAllLessons } from "@/controllers/lesson.controller";

const lessonRouter = Router();

lessonRouter.get("/", getAllLessons);
//authorRouter.get("/:id", getAuthorById);
//authorRouter.post("/", createAuthor);
//authorRouter.put("/:id", updateAuthor);
//authorRouter.delete("/:id", deleteAuthor);

export default lessonRouter;
