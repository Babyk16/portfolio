import express from "express";
import sql from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await sql`
    SELECT artworks.*, categories.name AS category
    FROM artworks
    LEFT JOIN categories ON artworks.category_id = categories.id
    ORDER BY created_at DESC;
  `;
  res.json(result);
});

export default router;
