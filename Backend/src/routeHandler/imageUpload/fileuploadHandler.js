const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const jwtKey = "my_secret_key"
const upload = require('./multer')
const cloudinary = require('./cloudinaryConfig')
const fs = require('fs');
const formidable = require('formidable');

router.post("/upload-images", async (req, res) => {
    const uploader = async (path) => await cloudinary.uploads(path, 'ImagesCarousel');
    const form = formidable({ multiples: true });
    
    await form.parse(req, async (err, fields, files) => {
        const urls = []
        const newPath = await uploader(files.file.filepath)
        urls.push(newPath)
        fs.unlinkSync(files.file.filepath)

        return res.status(200).json({
            status: true,
            path: newPath,
            message: "Image upload successfully!",
        });
    });
  });

  module.exports = router;