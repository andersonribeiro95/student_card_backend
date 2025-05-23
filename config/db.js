// config/db.js
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log("MongoDB conectado");
  } catch (err) {
    console.error(`Erro ao conectar ao MongoDB: ${err.message}`);
    console.error(`URI do MongoDB: ${process.env.MONGO_URI}`);
    process.exit(1);
  }
};

module.exports = connectDB;