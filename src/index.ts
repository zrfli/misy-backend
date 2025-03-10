import "module-alias/register";
import express from "express";
import cors from "cors"
import { getUserFromToken  } from '@/middlewares/authMiddleware';
import { Role } from "@/lib/Roles";
import { getAllLessons } from "./controllers/lesson.controller";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/lessons', async (req, res) => {
  const user = getUserFromToken(req);

  if (!user?.userId) return res.status(403).json({ message: 'Access denied. Invalid token.' });
  if (![Role.STUDENT, Role.INSTRUCTOR].includes(user?.role)) return res.status(403).json({ message: 'You do not have permission to access lessons.' });

  const lessons = await getAllLessons({ userId: user.userId });

  if (!lessons || lessons.length === 0) return res.status(200).json({ status: 'success', message: 'No lessons found.' });

  return res.status(200).json({ status: 'success', userId: user.userId, data: lessons });
});


app.get("/", (_req, res) => { res.json({ message: "Hello <3" }).status(200); });

app.listen(PORT, () => {
  console.log(`🚀 Sunucu ${PORT} portunda çalışıyor...`);
});
