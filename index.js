require("dotenv").config();

const express= require("express");
const ejs=require("ejs");
const app= express();
const mongoose = require("mongoose");
const path= require("path");

const methodOverride= require("method-override");

const job= require("./module/jobs.js");
const ad= require("./module/adr.js");
const apply = require("./module/apply.js");


app.set("view engine","ejs");
app.set("views",  path.join(__dirname, "/views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"))


const ATLAS_URL = process.env.ATLAS_URL
async function main(){
  await mongoose.connect(ATLAS_URL);   
}


main().then( ()=>{
  console.log("mongo is working");
})
.catch((err) => console.log(err));



const port=process.env.PORT;



app.listen(port,()=> {
  console.log("listening on port "+port);
});


app.get("/",async (res,req)=>{
  req.render("home.ejs");
});
app.get("/fedback",async (res,req)=>{
  req.render("feedback.ejs");
});
app.get("/login",async (res,req)=>{
  req.render("login.ejs");
});
app.post("/check", async (req,res)=>{
  let {pass,eusername}=req.body;
  var username="project";
  var password=123;
  if(pass==password || eusername==username){
    res.redirect("/administration");
  }});
app.get("/job",async (res,req)=>{
    req.render("job.ejs");
  });
  app.get("/administration",async (res,req)=>{
    let adrs=await ad.find();
    req.render("administration.ejs",{adrs});
  });
  app.get("/d_pharm",async (res,req)=>{
    let jobs=await job.find();
    req.render("d_pharm.ejs",{jobs});
  });
  app.get("/b_pharm",async (res,req)=>{
    let jobs=await job.find();
    req.render("b_pharm.ejs",{jobs});
  });

  app.get("/m_pharm",async (res,req)=>{
    let jobs=await job.find();
    console.log(jobs);
    req.render("m_pharm.ejs",{jobs});
  });

  app.get("/recuiter",async (res,req)=>{
    req.render("recruiter.ejs");
  });
  app.get("/loginapp/:id",async (res,req)=>{
    let { id }= res.params;
    let check= await job.findById(id);
    req.render("loginapp.ejs",{check});
  });
  app.post("/checkapp/:id",async (res,req)=>{
    let { id }= res.params;
    let {email,pass}=res.body;
    let check= await job.findById(id);
    if(check.password==pass || check.email==email){
      let applys= await apply.findByemail(email);
      console.log(applys);
      req.render("application.ejs");
    }
    //req.render("loginapp.ejs");
  });
  app.get("/application/:id",async (res,req)=>{
    let { id }= res.params;
    let apply= await job.findById(id);
    req.render("apply.ejs",{apply});
  });
  app.get("/apply/:id",async (res,req)=>{
    let { id }= res.params;
    let apply= await job.findById(id);
    req.render("apply.ejs",{apply});
  });
  app.post("/apply/:id",async (res,req)=>{
    let { id }= res.params;
    let post= await job.findById(id);
    let {name,email,mobile,edu}=res.body;
    let add = new apply({
      name: name,
      email: email,
      mobile: mobile,
      eduction: edu,
      post: post.name_of_post,
      email_of_r: post.email
    });
    req.redirect("/job")
    await add.save()
    .then(res =>{console.log(res)})
    .catch(err=>{console.log(err)});

  });
  app.post("/add", async (req,res)=>{
    let {email,mobile_no,pass,name,address,Qulification,Salary,time}=req.body;
    let newnote = new job({
        name_of_post: name,
        email: email,
        mobile_number: mobile_no,
        location: address,
        qulification: Qulification,
        salary: Salary,
        time: time,
        password: pass
    });
    res.redirect("/job");
   await newnote.save()
    .then(res =>{console.log("added")})
    .catch(err=>{console.log(err)});
  });
   app.get("/adr/:id/edit", async (req,res)=>{
    let { id }= req.params;
    let oneadr= await ad.findById(id);
    res.render("edit.ejs",{oneadr});
   });
   app.get("/adrlog/:id/edit", async (req,res)=>{
    let { id }= req.params;
    let oneadr= await ad.findById(id);
    res.render("adrlog.ejs",{oneadr});
   });
   app.get("/job/:id/delete", async (req,res)=>{
    let { id }= req.params;
    let jobs=await job.findById(id);
    res.render("pass_check.ejs",{jobs})
   });
   app.delete("/job/:id",async (req,res)=>{
    let { id }= req.params;
    let {pass}= req.body;
    let remove=await job.findById(id);
    if(remove.password==pass){
      await job.findByIdAndDelete(id);
    }
    res.redirect("/job");
  });



  app.delete("/adr/:id",async (req,res)=>{
    console.log("inside delete route")
        let { id }= req.params;
        console.log(id)
         await ad.findByIdAndDelete(id);
         console.log("deleted")
        res.redirect("/administration");
      });








  app.put("/adr/:id",async (req,res)=>{
    let { id }= req.params;
    let {name,recation,note,type}= req.body;
    console.log(note);
    let edit=await ad.findByIdAndUpdate(
      id,
      {name_of_m: name});
      let edit1=await ad.findByIdAndUpdate(
        id,
        {recation:recation});
      let edit2=await ad.findByIdAndUpdate(
          id,
          {note:note});
      let edit3=await ad.findByIdAndUpdate(
          id,
          {type:type});
    console.log(edit);
    res.redirect("/adr");
  });
  app.put("/adrlog/:id",async (req,res)=>{
    let { id }= req.params;
    let {pass}= req.body;
    let check= await ad.findById(id);
    if(pass==check.password){
      res.redirect("/adr/"+id+"/edit");
    }
    else{
      res.redirect("/adr")
    }
  });
  app.get("/checkadr/:id",async (req,res)=>{
    let { id }= req.params;
    let {pass}= req.body;
    let check= await ad.findById(id);
    if(pass==check.password){
      console.log("done");
      res.render("edit.ejs");
    }
    else{
      res.redirect("/adr");
    }
  });



  app.get("/adr",async (req,res)=>{
    let adrs=await ad.find();
    //console.log(adrs);
    res.render("adr.ejs",{adrs});
  });
  app.post("/adr", async (req,res)=>{
    let {name,type,name_of_m,note,reaction,pass}=req.body;
    let newnote = new ad({
        name: name,
        type: type,
        name_of_m: name_of_m,
        recation: reaction,
        note: note,
        password: pass
    });
   await newnote.save()
    .then(res =>{console.log("added done")})
    .catch(err=>{console.log(err)});
    res.redirect("/adr");
  });