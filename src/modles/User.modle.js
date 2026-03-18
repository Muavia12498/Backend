
import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userScheema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avator: {
      type: String,
      required: true, //cloudinary image
    },
    coverImage: {
      type: String, // cloudinary image
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    password: {
      type: String,
      required: [true, "passowrd is required"],
    },

    refreshToken: {
      type: String,
    },
  },

  { timestamps: true },
);

userScheema.pre("save", async function (next){
  if(!this.ismodified("passowrd"))  return next()
    this.password= bcrypt.hash(this.password,10)
    next()
   
})

userScheema.methods.isCorrectPassword= async function (passwrod) {
  return await bcrypt.compare(passwrod, this.passwrod);
}
userScheema.methods.generateAccessToken = function (){
   return  jwt.sign(
    {
        _id: this._id,
        fullName:this.fullName,
        email:this.email,
        userName:this.username
      
    },
     
    process.env.ACCESS_TOKEN_SECRET,
{
   expiresIn:process.env.ACCESS_TOKEN_EXPIRY

}
  )


}
userScheema.methods.generateRefreshToken = function () {
   return jwt.sign(
     {
       _id: this._id,
     },

     process.env.ACCESS_TOKEN_SECRET,
     {
       expiresIn: process.env.REFERESH_TOKEN_EXPIRY
     }
   );


}



 export const User= mongoose.model("User",userScheema)
