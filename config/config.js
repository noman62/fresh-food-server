const { bgRed } = require('colors')
const mongoose=require('mongoose')
require('colors')

const connectDB=async()=>{
    try{
        const url=process.env.MONGO_URL;
        const conn=await mongoose.connect(url);
        console.log("db connected successfully");
    }catch(err){
        console.log(`error :${err.message}`);
    }
}

module.exports=connectDB;
