const express =require("express");

const authRoutes=require("./routes/authRoutes");
const chatRoutes=require("./routes/chatRoutes");

const app=express();

app.use(express.json());

//signup wala

app.use("/api/auth",authRoutes);
app.use("/api/chat",chatRoutes);


module.exports=app;