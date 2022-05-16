import mongoose from "mongoose";
import { createServer } from "./server";

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await mongoose.connect("mongodb://root:example@localhost:27017");
    console.log("Connected to mongodb");
  } catch (err) {
    console.log(err);
  }

  const server = createServer();

  server.listen(port, () => {
    console.log(`api running on ${port}`);
  });
};

start();
