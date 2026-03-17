import dataBaseConnection from "./db/index.js";
import  dotenv from "dotenv"
import app from "./app.js";


 dotenv.config({path:"./.env"})
dataBaseConnection()
.then(()=>{
     app.listen(`${process.env.PORT}|| 5000 `, () => {
         console.log(`app is running on http://localhost:${process.env.PORT} `)
     });
     app.on('error', (err)=>{
        console.log(err)
     })
  
})
.catch((error)=>{
      console.log(error)
})