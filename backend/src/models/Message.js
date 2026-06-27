const mongoose=require("mongoose");

const messageSchema=new mongoose.Schema({

    chatId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required:true,
    },

    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    text:{
        type:String,
        required:true,
        trim:true,

    },

    tags:[
        {
            type:String,
        },
    ],
    //this ai gives

    summary:{
        type: String,
        default:"",
    },
    
    //ai will give this

    category:{
        type:String,
        default:"",
    },

    sentiment:{
        type:String,
        enum:["positive","negative","neutral",""],
        default:"",
    },

    //priorirty to message higher priority top it comes
    priority:{
        type:String,
        enum:["low","medium","high",""],
        default:""
    },
    

    //vector serach embeddings
    embedding:{
        type:[Number],
        default:[],
    },
},
{
    timestamps: true,
}
);

const Message=mongoose.model("Message",messageSchema);

module.exports=Message;