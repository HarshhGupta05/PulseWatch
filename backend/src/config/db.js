// backend/src/config/db.js

import mongoose from 'mongoose'

// This function connects to MongoDB Atlas using the URI in your .env file
// It is called once at startup in server.js before anything else runs
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    // conn.connection.host tells you which Atlas cluster you connected to
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    // If the connection fails, print the error and kill the process
    // There is no point running the server without a database
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB