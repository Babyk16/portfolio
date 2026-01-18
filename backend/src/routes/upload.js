import express from "express";
import cloudinary from "../config/cloudinary.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
      { folder: "artworks" }
    );

    res.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (err) {
    res.status(500).json({ error: "Cloudinary upload failed" });
  }
});

export default router;
