import mongoose from 'mongoose'
import User from './user.model.js'

const mailSchema = mongoose.Schema({
    senderId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
         required : true,
    },
    receiverId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"User",
         required : true,
    },
    subject :{
        type: String,
    },
    message :{
        type: String,
    },
    isRead:{
        type:Boolean,
    }

})


const Mail = mongoose.model('Mail', mailSchema)


export default Mail