const express = require("express");
const path = require("path");
const hbs = require("hbs");

const app = express();

require("./db/conn");

const Register = require("./models/register");


const PORT = process.env.PORT || 3000

//access public file
const static_path = path.join(__dirname,"../public");

app.use(express.static(static_path));
//access public file


app.use(express.json())

app.use(express.urlencoded({extended:false}));


const templates_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
app.set("view engine","hbs");
app.set("views",templates_path);
hbs.registerPartials(partials_path);


app.get("/", (req,res)=>{
  res.render("index")
});

app.get("/register", (req,res)=>{
    res.render("register")
  });

  
app.get("/login", (req,res)=>{
    res.render("login")
  });

//   create a new user in database
app.post("/register", async (req,res)=>{
    try{
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){
           const registerEmployee = new Register({
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            email : req.body.email,
            gender : req.body.gender,
            phone : req.body.phone, 
            age : req.body.age,
            password : password,
            confirmpassword : cpassword
           })

          const registerd = await registerEmployee.save();
          res.status(201).render("index");


        
        }else{
            res.send("Password is not matching")
        }


    } catch(error){
        res.status(400).send(error);
    }
  });  


//   login check

app.post("/login", async (req,res)=>{
    try{

        const email = req.body.email;
        const password = req.body.password;

     const useremail =  await  Register.findOne({email:email});
     if(useremail.password === password){
        res.status(201).render("index");
     }else{
        res.send("invalid login details")
     }
 

        

    }catch(error){
        res.status(400).send("invalid login details");
    }
  });





app.listen(PORT,()=>{
    console.log(`Server is running at port no ${PORT}`);
})