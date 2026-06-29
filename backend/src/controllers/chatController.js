const Chat=require("../models/Chat");

const createChat=async(req,res)=>{
    
    try{

        const {receiverId}=req.body;
        
        const senderId=req.user._id;

        if(senderId.toString()===reciverId){
            return res.status(400).json({
                sucess:false,
                message:"Cant send to you"
            });
        }

        const existingChat=await Chat.findOne({

            members:{
                $all:[senderId,reciverId],
            },
        });

        if(existingChat){
            return res.status(400).json({
                success:false,
                message:"chat already exists"
            });
        }

        const chat=await Chat.create({

            members:[
                senderId,
                reciverId,
            ],
        });

        res.status(201).json({
            sucess:true,
           chat
        });
    }catch(err){

        return res.status(500).json({
            sucess:false,
            message:err.message
        });
    }


};

const getMyChats=async (req,res)=>{

   try{

    const userId=req.user._id;

    const chats=await Chat.find({
        members:userId
    }).populate(
        "members",
        "name email"
    );

    res.status(201).json({
        success:true,
        chats,
    });

   }catch(err){
     
     res.status(500).json({
        sucess:false,
        message:"server error"
     });
   }
};

module.exports={
    createChat,
    getMyChats,
}