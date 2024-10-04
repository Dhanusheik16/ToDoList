require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = 3001;
const taskmodel = require("./model/task");
const usermodel = require("./model/user");

app.use(express.json());
app.use(cors());

async function connect() {
  try {
    let connection = await mongoose.connect(
      "mongodb+srv://dhanushek_16:DhanuApache310@cluster0.ki58l0c.mongodb.net/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(
      "---> connected",
      connection.connection.host,
      process.env.SECRET_KEY
    );
  } catch (error) {
    console.log(error.message);
  }
}
connect();

app.post("/task", async (req, res) => {
  try {
    let body = req.body;

    let data = new taskmodel({ ...body, completed: false });

    let result = await data.save();
    console.log(result, data, "no data3");
    res.send({ data: result, message: "successfully saved" }).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.get("/gettask", async (req, res) => {
  try {
    let taskres = await taskmodel.find().sort({ data: -1 });
    res
      .send({ data: taskres, message: "successfully data retrived" })
      .status(200);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message }).status(500);
  }
});

app.delete("/taskdelete/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let result = await taskmodel.findByIdAndDelete(id);

    res.send({ data: result, message: "successfully deleted" }).status(200);
  } catch (error) {
    res.send({ message: error.message }).status(500);
  }
});

app.post("/taskupdate", async (req, res) => {
  try {
    let body = req.body;

    let result = await taskmodel.updateOne(body);
    console.log(result);

    res.send({ data: result, message: "Successfully edit" }).status(200);
  } catch (error) {
    console.log(error);
    res.send({ message: error.message }).status(500);
  }
});

app.post("/signup", async (req, res) => {
  try {
    let body = req.body;

    let data = new usermodel({
      ...body,
      userId: new Date().getTime().toString(),
    });
    console.log(data, "DATAA");

    let result = await data.save();
    console.log(result, data, "no data3");
    res.send({ data: result, message: "successfully saved" }).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    let body = req.body;
    let userData = await usermodel.findOne({ email: body.email });
    if (userData && userData.password === body.password) {
      console.log(process.env.ACCESS_TOKEN_SECRET, "ACCESSTOKEN SECRET");

      const accessToken = jwt.sign(
        { email: userData.email },
        process.env.ACCESS_TOKEN_SECRET
      );
      const result = await usermodel.updateOne({
        ...userData,
        token: accessToken,
      });
      res
        .send({
          data: {
            token: accessToken,
            email: userData.email,
            userId: userData.userId,
          },
          message: "Login Successfull",
        })
        .status(200);
    } else {
      res.send({ data: null, message: "Invalid User ID/Password" }).status(403);
    }

    // let data = new usermodel({
    //   ...body,
    //   userId: new Date().getTime().toString(),
    // });
    // console.log(data, "DATAA");

    // let result = await data.save();
    // console.log(result, data, "no data3");
    res.send({ data: {}, message: "successfully saved" }).status(200);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => console.log("Running on" + port));
