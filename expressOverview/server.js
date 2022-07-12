const express = require("express");
const adminRouter = require("../module/adminRouter");
const app = express();


app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/about", (req, res) => {
    res.send("about")
})
app.use("/admin", adminRouter);
app.listen(3000, () => {
    console.log("app is listening on 3000");
})