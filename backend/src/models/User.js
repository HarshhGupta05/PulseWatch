import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {type : String, required : true, unique : true, lowercase : true, trim : true},
    password : {type : String, required : true}   
},{
    timestamps : true
})

export default mongoose.model('User', userSchema);


// // backend/src/models/User.js

// import mongoose from 'mongoose'

// // This schema defines what a user document looks like in MongoDB
// const userSchema = new mongoose.Schema(
//   {
//     // email must be unique — two users cannot share the same email
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,   // always stores as lowercase so Test@test.com === test@test.com
//       trim: true,        // removes accidental spaces before/after
//     },

//     // This stores the HASHED password, never the plain text one
//     // bcrypt handles the hashing in authController.js
//     password: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     // timestamps: true automatically adds createdAt and updatedAt to every document
//     timestamps: true,
//   }
// )

// // 'User' becomes the 'users' collection in MongoDB (Mongoose lowercases + pluralises)
// export default mongoose.model('User', userSchema)