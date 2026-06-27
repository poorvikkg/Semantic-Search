const express =require("express");

const authRoutes=require("./routes/authRoutes");

const app=express();

app.use(express.json());

//signup wala

app.use("/api/auth",authRoutes);

module.exports=app;