const express = require("express");
const fs = require("fs");
const router = express.Router();
const passport = require("../config/passport");

//Streams audio files from a specific directory
router.get("/music/:album/:song", (req, res) => {
  const album = req.params.album;
  const song = req.params.song;

  const filePath = `//MARIBEL-PC/Lo Mejor de Cada Género 128 kbps/${album}/${song}`;
  try {
    const stat = fs.statSync(filePath);
    const total = stat.size;
    if (req.headers.range) {
      const range = req.headers.range;
      const parts = range.replace(/bytes=/, "").split("-");
      const partialstart = parts[0];
      const partialend = parts[1];

      const start = parseInt(partialstart, 10);
      const end = partialend ? parseInt(partialend, 10) : total - 1;
      const chunksize = end - start + 1;
      const readStream = fs.createReadStream(filePath, {
        start: start,
        end: end
      });
      res.writeHead(206, {
        "Content-Range": "bytes " + start + "-" + end + "/" + total,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4"
      });
      readStream.pipe(res);
    } else {
      res.writeHead(200, {
        "Content-Length": total,
        "Content-Type": "audio/mpeg"
      });
      fs.createReadStream(filePath).pipe(res);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "File does not exist" });
  }
});

module.exports = router;
