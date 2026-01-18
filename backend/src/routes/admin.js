import express from "express";
import sql from "../config/db.js";

const router = express.Router();

router.post("/artworks", async (req, res) => {
  const { title, description, category_id, image_url } = req.body;

  try {
    const result = await sql`
      INSERT INTO artworks (title, description, category_id, image_url)
      VALUES (${title}, ${description}, ${category_id}, ${image_url})
      RETURNING *;
    `;
    res.json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to save artwork" });
  }
});

export default router;
