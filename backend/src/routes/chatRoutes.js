const express=require("express");

const router=express.Router();

const authMiddleware=require("../middleware/authMiddleware");
const {createChat,getMyChats}=require("../controllers/chatController");

router.post("/",authMiddleware,createChat);
router.post("/",authMiddleware,getMyChats);

module.exports=router;