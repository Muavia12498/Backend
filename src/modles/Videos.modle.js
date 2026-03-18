import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
 const videoScheema = new Schema(
   {
     videoFile: {
       type: String, // cloudinary Image
       required: true,
     },
     thumbnailImage: {
       type: String, // cloudinary Image
       required: true,
     },
     titile: {
       type: String, 
       required: true,
     },
     description: {
       ype: String,
       required: true,
     },
     duration:{
          type:Number,
         required:true
     },
     views:{
          type:Number,
          default:0,
     },
     isPublished:{
          type:Boolean,
          default:true,
     },
     owner:{
          type:mongoose.Schema.Types.ObjectId,
          ref: "User"
     }
   },
   {
     timestamps: true,
   },
 );

  videoScheema.plugin(mongooseAggregatePaginate)

   export   const Video= mongoose.model("Video",videoScheema)