const Chat=require("../models/Chat");
const Message=require("../models/Message");

const sendMessage=async(req,res)=>{

    try{
        
        const {chatId,text}=req.body;

        const sender=req.user._id;
        
        const chat=await Chat.findById(chatId);

        if(!chat){
            return res.status(404).json({
                success:false,
                message:"chat not found"
            });
        }

        //is user the member of chat
        const isMember=chat.members.some(member=> member.toString()===sender.toString());

        if(!isMember){
            return res.status(400).json({
                success:false,
                message:"Sender is not the member of chat"
            });
        }

        const message=await Message.create({
            chatId,
            sender,
            text
        });

        return res.status(201).json({
            success:true,
            message
        });


    }catch(err){

        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

const getMessages=async(req,res)=>{
   try{
    

    const {chatId}=req.params;

    const userId=req.user._id;

    const chat = await Chat.findById(chatId);

    if(!chat){
        return res.status(500).json({
            success:false,
            message:"not converesation happened"
        });
    }

    const isMember=await chat.members.some(
        member=>member.toString()===userId.toString()
    );

    if(!isMember){
        return res.status(400).json({
            success:false,
            message:"No member present"
        });
    }

    const messages=await Message.find({
        chatId
    }).populate(
        "sender","name email"
    ).sort({
        createdAt:1
    });

    return res.status(200).json({
        success:true,
        messages
    });

     
   }catch(err){

    return res.status(500).json({
        success:false,
        message:err.message
    });
   }
}

module.exports={sendMessage,getMessages};