const express = require("express");
const multer = require("multer");
const path = require("path");
const fileUpload = "./uploads";
// disk storage

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("destination", file);
    cb(null, fileUpload);
  },
  filename: (req, file, cb) => {
    //   console.log("file name", file);
    const fileExtension = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExtension, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();
    cb(null, fileName + fileExtension);
  },
});
// prepare for file uploading system
const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, { mimetype }, cb) => {
    if (
      mimetype === "image/png" ||
      mimetype === "image/jpg" ||
      mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only jpg, png or jpeg format supported"), true);
    }
  },
});

const app = express();

app.post(
  "/",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  (req, res) => {
    console.log("after multer", req.files.avatar[0].path);
    
      res.download(req.files.avatar[0].path, (err) => {
        if (err) {
          res.send(err);
        }
        // res.send("success");
      })
   
  }
);

// default error handler
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("there was an upload error");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.status(200).send("success");
  }
});

app.listen(3000, () => {
  console.log("app listening on 3000");
});
