const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("server ok");
});

app.listen(port, () => {
  console.log(`Serving listening at http://localhost:${port}`);
});
