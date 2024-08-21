const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
require('dotenv').config({ path: '.env' })

async function connectToMongoDB() {
  const uri = process.env.MONGODB_URI;
  return mongoose.connect(uri);
}

module.exports = {
  connectToMongoDB,
};
