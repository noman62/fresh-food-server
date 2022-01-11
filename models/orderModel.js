const mongoose=require('mongoose');
const orderSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'order is required']
    },
    email:{
        type:String,
        required:[true,'Email is Required']
    },
    userid:{
        type:String,
    },
    orderItems:[],
    shippingAddress:{
        type:Object,
    },
    orderAmount:{
        type:String,
        // required:true,
    },
    isDelivered:{
        type:Boolean,
        default:false,
        // required:true,
    },
    transactionId:{
        type:String,
        // required:true,
    },
},{timestamps:true})
module.exports=mongoose.model('order',orderSchema)