const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    _id: "649ea7f4852ab11d32727080",
  };

  next();
});

app.use("/", require("./routes/users"));
app.use("/", require("./routes/cards"));

// eslint-disable-next-line no-undef
mongoose.connect("mongodb://localhost:27017/mestodb");

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
