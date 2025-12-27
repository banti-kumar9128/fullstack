import mongoose from "mongoose"

const userschema = new mongoose.Schema({
        name:{type:"string",required:true,},
        email:{type:"string",required:true,unique:true},
        number:{type:"number",required:true,},
        password:{type:"string",required:true,},

},{timestamps:true})

export const User = mongoose.model("User",userschema)