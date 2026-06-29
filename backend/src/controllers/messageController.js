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

module.exports={sendMessage};