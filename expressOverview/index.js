const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.listen(3000, () => {
  console.log("app is listening on 3000");
});
// express.json() for post method when something sent data in the body
app.use(express.json());
app.use(cookieParser());
// for template engin
app.set("views engine", "ejs");
app.all("/", (req, res) => {
  res.send("hello express js");
});
app.get("/about", (req, res) => {
  res.format({
    "text/plain": () => {
      res.send("hello text plain")
    },
    "text/html": () => {
      res.send("hello text html")
    },
    "application/json": () => {
      res.json({value: "hello application/json"})
    },
    default: () => {
      res.status(406).send("not acceptable")
    }
})

});

const adminRoute = express.Router();
adminRoute.get("/dashboard", (req, res) => {
  console.log("base url", req.baseUrl);
  console.log(" url", req.url);
  console.log(" hey cookie", req.cookies);
  console.log("original url", req.originalUrl);
  res.send("from dash board");
});

app.use("/admin", adminRoute);
