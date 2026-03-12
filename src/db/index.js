 import mongoose from "mongoose";

  import { DB_NAME } from "../constansts.js";

    const dataBaseConnection= async ()=> {
      try {
        const connection = await mongoose.connect(
          `${process.env.MONGOOSE_DB_URL}/${process.env.DB_NAME}`,
        );
        console.log("mongodbconnected", connection.connection.host);
      } catch (error) {
        console.log("an erro occured during connection", error);
        process.exit(1);
      }
    }

     export default  dataBaseConnection