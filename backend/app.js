
// ADD MONGODB LINK ON LINE 23

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/auth", authRouter);

mongoose
  .connect(
    //   *******        add mongoDB link here       ****************** ,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )

  .then(() => {
    console.log("Connected DB");
    app.listen(8080, () => {
      console.log("port has started on 8080");
    });
  })
  .catch((err) => console.log(err));
