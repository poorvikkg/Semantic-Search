const express=require("express");

const router=express.Router();

const {authMiddleware}=require("../middleware/authMiddleware");
const {createChat,getMyChat}=require("../controllers/charController");

router.post("/",authMiddleware,createChat);
router.post("/",authMiddleware,getMyChat);

module.exports=router;