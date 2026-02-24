const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/aiDB");

const User = mongoose.model("User", { username: String });
const Team = mongoose.model("Team", { name: String, role: String, desc: String });
const Resource = mongoose.model("Resource", { title: String, desc: String });
const Project = mongoose.model("Project", { title: String, desc: String });

app.post("/login", async (req,res)=>{
    await new User({username:req.body.username}).save();
    res.send("Saved");
});

app.post("/host", async (req,res)=>{
    if(req.body.password==="CUTOUT"){
        const users = await User.find();
        res.json(users);
    } else res.send("Wrong Password");
});

app.post("/clear", async (req,res)=>{
    if(req.body.password==="CUTOUT"){
        await User.deleteMany({});
        res.send("Cleared");
    }
});

app.post("/team", async (req,res)=>{
    await new Team(req.body).save();
    res.send("Added");
});

app.post("/resource", async (req,res)=>{
    await new Resource(req.body).save();
    res.send("Added");
});

app.post("/project", async (req,res)=>{
    await new Project(req.body).save();
    res.send("Added");
});

app.get("/team", async (req,res)=> res.json(await Team.find()));
app.get("/resource", async (req,res)=> res.json(await Resource.find()));
app.get("/project", async (req,res)=> res.json(await Project.find()));

app.listen(3000, ()=>console.log("Server running on port 3000"));