import mongoose from "mongoose";

export const connecDB = async ()=>{
    try {
      mongoose.connect(process.env.MONGO_URL)
      console.log("db connect")
    } catch (error) {
        console.log("db error")
    }
}