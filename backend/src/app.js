const express =require("express");

const authRoutes=require("./routes/authRoutes");
const chatRoutes=require("./routes/chatRoutes");
const messageRoutes=require("./routes/messageRoutes");

const app=express();

app.use(express.json());

//signup wala

app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);
app.use("/api/message",messageRoutes);


module.exports=app;